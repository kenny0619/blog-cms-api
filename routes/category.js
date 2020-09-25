const passport = require("passport");
const config = require("../config/settings");
require("../config/passport")(passport);
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Category = require("../models/Category");

// Add route to get list of category
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res
) {
  const token = getToken(req.headers);
  if (token) {
    Category.find(function (err, categories) {
      if (err) return next(err);
      res.json(categories);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

// Add route to get single category by id
router.get("/:id", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  const token = getToken(req.headers);
  if (token) {
    Category.findById(req.params.id, function (err, category) {
      if (err) return next(err);
      res.json(category);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

// Add a route to post a category.

router.post("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  const token = getToken(req.headers);
  if (token) {
    Category.create(req.body, function (err, category) {
      if (err) return next(err);
      res.json(category);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

// Add a route to put a category by ID.

router.put("/:id", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  const token = getToken(req.headers);
  if (token) {
    Category.findByIdAndUpdate(req.params.id, req.body, function (
      err,
      category
    ) {
      if (err) return next(err);
      res.json(category);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

// Add a route to delete a category by ID.

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const token = getToken(req.headers);
    if (token) {
      Category.findByIdAndRemove(req.params.id, req.body, function (
        err,
        category
      ) {
        if (err) return next(err);
        res.json(category);
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

// Add a function to get and extract the token from the request headers.

getToken = function (headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
