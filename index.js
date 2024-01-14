const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
app.use(cors());
app.use(express.json());

app.use("/users", require("./Routes/Users"));
app.use("/posts", require("./Routes/Posts"));

const Connection = async () => {
  try {
    mongoose.connect(process.env.ConnectionString, {
      connectTimeoutMS: 50000,
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
app.get("/", (req, res) => {
  res.send("app launched");
});

Connection()
  .then(() => {
    app.listen(process.env.port || 5000, (req, res) => {
      console.log("app launched on port 5000");
      console.log("Connected to mongoDB");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
