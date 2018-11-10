"use strict";

var express = require("express");
var cors = require("cors");

// require and use "multer"...
var multer = require("multer");
var app = express();
var upload = multer({ dest: "uploads/" });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  async (req, res, next) => {
    var filename = req.file;
    res.json({name: filename.originalname, type: filename.mimetype, size: filename.size});
  }
);

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
