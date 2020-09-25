const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Post = require("../models/Post");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/category", (req, res, next) => {
  Category.find((err, categories) => {
    if (err) return next(err);
    res.json(categories);
  });
});

router.get("/post", (req, res, next) => {
  Post.find((err, posts) => {
    if (err) return next(err);
    res.json(posts);
  });
});

router.get("/bycategory/:id", (req, res, next) => {
  Post.find({ category: req.params.id }, (err, posts) => {
    if (err) return next(err);
    res.json(posts);
  });
});

router.get("/post/:id", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
