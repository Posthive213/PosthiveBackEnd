const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  verification: {
    type: Boolean,
    require: true,
    default: false,
  },
  intrestes: {
    type: Array,
    require: "true",
    default: ["programming", "Javascript", "React", "Human Life", "Politics"],
  },
  followers: {
    type: Array,
    follower: {
      type: Object,
      followername: {
        type: String,
      },
      followerImg: {
        type: String,
      },
      followerId: {
        type: String,
        require: true,
      },
    },
  },
  following: {
    type: Array,
    follow: {
      type: Object,
      followingname: {
        type: String,
      },
      followingImg: {
        type: String,
      },
      date: {
        type: String,
        default: Date.now(),
      },
      followingId: {
        type: String,
        require: true,
      },
    },
  },
  profileImg: {
    type: String,
    require: true,
    default:
      "https://hillcrestnc.com/wp-content/uploads/2019/03/profileimg-350x350.png",
  },
  bio: {
    type: String,
    default: "A Passionate writer, sharing and reading stories.",
  },
});

const Model = mongoose.model("Users", User);
Model.createIndexes();
module.exports = Model;
