//dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars")
const logger = require("morgan");

//Port set up
const PORT = process.env.PORT || 3000;

//express and router
const app = express();
const router = express.Router();

require("./routes/routes")(router);
require("./scripts/scrape");
//conncetion for handlebars to express
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars")

//public folder static directory
app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(router);

// Connect to Mongo DB
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true }, function () {
  console.log("mongo connected")
});

//sets up for deployment or local host
const db = process.env.MONGODB_URI || "mongodb://localhost/mainHeadlines";

//mongoose connection to databse
mongoose.connect(db, function (error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Mongoose Connection Successful!");
  }
});

//listen on port
app.listen(PORT, function () {
  console.log("Listening on Port: " + PORT + "!");
});