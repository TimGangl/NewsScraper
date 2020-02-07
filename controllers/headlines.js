var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlinesSchema = new Schema({
  headline: {
    type: String,
    require: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  date: String,
  saved: {
    Boolean,
    default: false
  }
});