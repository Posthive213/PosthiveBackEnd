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
  comments: {
    type: Array,
    require: false,
    default: [
      {
        username: "Ali",
        commenterImg:
          "https://lh3.googleusercontent.com/a/ACg8ocIVpf8lAiaFTUcs19TBgsxrknusfceRj_ykTEs8M47i=s96-c",
        date: Date.now(),
        commentcontent: "Nice blog!!",
      },
      {
        username: "Ali2",
        commenterImg:
          "https://lh3.googleusercontent.com/a/ACg8ocIVpf8lAiaFTUcs19TBgsxrknusfceRj_ykTEs8M47i=s96-c",
        date: Date.now(),
        commentcontent: "Exceptional information , Thanks!",
      },
    ],
    comment: {
      type: Object,
      username: {
        type: String,
      },
      commenterImg: {
        type: String,
      },
      date: {
        type: String,
        default: Date.now(),
      },
      commentcontent: {
        type: String,
      },
      commentorId: {
        type: String,
        require: true,
      },
    },
  },
});

const model = mongoose.model("Posts", postSchema);
model.createIndexes();

module.exports = model;
