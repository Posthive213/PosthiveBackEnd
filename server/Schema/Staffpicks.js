const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  content: {
    type: String,
    default: "Powered by Posthive",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    require: true,
    default: "Unkonwn",
  },
  profileImg: {
    type: String,
    require: true,
  },
  genre: {
    type: Array,
    require: true,
  },
  Thumbnail: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  subtitle: {
    type: String,
    require: true,
  },
});

const model = mongoose.model("staffPicks", postSchema);
model.createIndexes();

module.exports = model;
