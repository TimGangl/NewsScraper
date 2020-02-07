//dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars")

//Port set up
const PORT = process.env.PORT || 3000;

//express and router
const app = express();
const router = express.Router();

require("./routes/routes")(router);

//conncetion for handlebars to express
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars")

//public folder static directory
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({
  extended: false
}));
app.use(router);

//sets up for deployment or local host
const db = process.env.MONGODB_URI || "mongodb://localhost/onionHeadlines";

//mongoose connection to databse
mongoose.connect(db, function (error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("mongoose connection is successful");
  }
});

//listen on port
app.listen(PORT, function () {
  console.log("Listening on Port: " + PORT);
});