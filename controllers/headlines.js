const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const headlinesSchema = new Schema({
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

const Headline = mongoose.model("Headlines", headlinesSchema);
module.exports = Headline;