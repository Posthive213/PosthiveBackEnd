const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  readingList: {
    type: Array,
    read: {
      type: Object,
      postId: {
        type: String,
      },
      posterId: {
        type: String,
      },
      posterImg: {
        type: String,
      },
      posttitle: {
        type: String,
      },
      posterName: {
        type: String,
      },
      date: {
        type: String,
      },
      postThumbnail: {
        type: String,
      },
      postSubtitle: {
        type: String,
      },
    },
  },
});

const model = mongoose.model("readinglists", Schema);

module.exports = model;
