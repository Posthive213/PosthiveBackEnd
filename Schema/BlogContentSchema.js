const mongoose = require("mongoose");

const blogContent = new mongoose.Schema({
  content: {
    type: String,
  },
});

const model = mongoose.model("blogContent", blogContent);
model.createIndexes();

module.exports = model;
