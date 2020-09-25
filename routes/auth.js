// const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../config/settings");
require("../config/passport")(passport);
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");

//create a router to register the new user using just username and password
router.post("/register", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // save the user
    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, msg: "Username already exists." });
      }
      res.json({ success: true, msg: "Successful created new user." });
    });
  }
});

// Create a router for login or sign-in using username and password.
router.post("/login", (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, (isMatch) => {
          if (isMatch) {
            // if user is found and password is right create a token
            const token = jwt.sign(user.toJSON(), config.secret);
            // return the information including token as JSON
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      }
    }
  );
});

// create a router for logout
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.logout();
    res.json({ success: true });
  }
);

// Add a Reset Password route

module.exports = router;
