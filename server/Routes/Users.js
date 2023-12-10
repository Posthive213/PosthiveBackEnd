const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const path = require("path");
const getUserId = require("../Middlewares/userAuthentication");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

router.post(
  "/signup",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body(
      "password",
      "Enter password of atleast 5 characters mixed with special letters"
    ).isLength({ min: 5 }),
    body("email", "Enter valid Email").isEmail(),
  ],
  async (req, res) => {
    const Results = await validationResult(req);
    if (!Results.isEmpty()) {
      return res.send(Results);
    }
    const presentEmail = await User.findOne({ email: req.body.email });

    if (presentEmail) {
      return res
        .status(400)
        .send({ errors: "User already exsist with this email" });
    }

    const genSalts = await bcrypt.genSalt(10);
    const SecuredPassowrd = await bcrypt.hash(req.body.password, genSalts);
    const user = await User.create({
      name: req.body.name,
      password: SecuredPassowrd,
      email: req.body.email,
      verification: req.body.verification,
      intrestes: req.body.intrestes,
      profileImg: req.body.profileImg,
    });
    if (!user.verification) {
      const otp = (Math.random() * 9000 + 1000).toFixed(0);
      res.status(200).send({ otp: otp });
    } else {
      const Authtoken = jwt.sign(user.id, process.env.Secret);
      res.status(200).send({ authtoken: Authtoken });
    }
  }
);

router.post(
  "/signin",
  [body("password").isLength({ min: 3 }), body("email").isEmail()],
  async (req, res) => {
    const Results = await validationResult(req);

    if (!Results.isEmpty()) {
      return res.send(Results);
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ errors: "Enter valid email" });
    }

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordCheck) {
      return res.status(400).send({ errors: "Enter valid password" });
    }

    if (!user.verification) {
      const otp = (Math.random() * 9000 + 1000).toFixed(0);
      return res.status(200).send({ otp: otp });
    }
    const Authtoken = jwt.sign(user.id, process.env.Secret);
    res.status(200).send({ authtoken: Authtoken });
  }
);

router.post("/verified", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { verification: true } }
    );
    const Authtoken = await jwt.sign(user.id, process.env.Secret);
    if (Authtoken) {
      res.send({ authtoken: Authtoken });
    } else {
      res.status(400).send("invalid email");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/getUserData", getUserId, async (req, res) => {
  const userid = req.id;
  const user = await User.findOne({ _id: userid }).select("-password");
  res.send({ user: user });
});

router.get("/getotherUserData/:id", getUserId, async (req, res) => {
  const userid = req.params.id;
  const user = await User.findOne({ _id: userid }).select("-password");
  res.send({ user: user });
});

module.exports = router;
