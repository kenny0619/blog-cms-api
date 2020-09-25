const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const auth = require("./routes/auth");
const category = require("./routes/category");
const post = require("./routes/post");

mongoose
  .connect(
    "mongodb+srv://ibukunoluwa:J37XqVAVWWW6T9R@blog-cms.xyenv.mongodb.net/test?retryWrites=true&w=majority",
    {
      promiseLibrary: require("bluebird"),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

const app = express();
app.use(passport.initialize());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/auth", auth);
app.use("/api/category", category);
app.use("/api/post", post);

module.exports = app;
