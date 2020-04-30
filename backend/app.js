const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect(
    'mongodb://localhost/mean'
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.error("Connection failed!", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Allow image folder to be accessible
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Make express know that we are using the routes
app.use("/api/posts", postsRoutes);

module.exports = app;
