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
  },
  following: {
    type: Array,
  },
  profileImg: {
    type: String,
    require: true,
    default:
      "https://hillcrestnc.com/wp-content/uploads/2019/03/profileimg-350x350.png",
  },
});

const Model = mongoose.model("Users", User);
Model.createIndexes();
module.exports = Model;
