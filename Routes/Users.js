const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../Schema/UserSchema");
const post = require("../Schema/PostSchema");
const readingList = require("../Schema/ReadingList");
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

router.get("/getuserstofollow", getUserId, async (req, res) => {
  const userid = req.id;
  console.log(userid);
  const userstofollow = await User.find({
    $nor: [{ "followers.followerId": userid }, { _id: userid }],
  }).limit(3);

  res.status(200).send({ userstofollow: userstofollow });
});

router.get("/getotherUserData/:id", async (req, res) => {
  const userid = req.params.id;
  const user = await User.findOne({ _id: userid }).select("-password");
  res.send({ user: user });
});

router.post("/changeProfileImg", getUserId, async (req, res) => {
  const userid = req.id;
  if (req.body.newImg) {
    try {
      const imgChanged = await User.findOneAndUpdate(
        { _id: userid },
        { $set: { profileImg: req.body.newImg } }
      );
      const allposts = await post.updateMany(
        { id: userid },
        { $set: { profileImg: req.body.newImg } }
      );
      const updated = await post.updateMany(
        { comments: { $elemMatch: { commentorId: userid } } },
        { $set: { "comments.$[elem].commenterImg": req.body.newImg } },
        { arrayFilters: [{ "elem.commentorId": userid }] }
      );
      const ch = await readingList.updateMany(
        { userid: userid },
        { $set: { "readingList.read.posterImg": req.body.newImg } }
      );

      res.status(200).send({ success: "success" });
    } catch (error) {
      return res.status(400).send("Bad request");
    }
  } else {
    return res.status(400).send("Bad request");
  }
});
router.post("/changeIntrests", getUserId, async (req, res) => {
  const userId = req.id;
  const intrestChanged = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { intrestes: req.body.intrestes } }
  )
    .then(() => {
      res.status(200).send({ success: "success" });
    })
    .catch(() => {
      res.status(400).send("Bad request");
    });
});

router.post("/addfollower", getUserId, async (req, res) => {
  const userid = req.id;
  const newfollower = {
    followername: req.body.followername,
    followerImg: req.body.followerImg,
    followerId: userid,
  };
  const user = await User.findOneAndUpdate(
    { _id: req.body.followingId },
    { $push: { followers: newfollower } }
  )
    .then((use) => {
      res.status(200).send("success");
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).send("Bad rquest");
    });
});

router.post("/addfollowing", getUserId, async (req, res) => {
  const userid = req.id;
  const newfollowing = {
    followingname: req.body.followingname,
    followingImg: req.body.followingImg,
    followingId: req.body.followingId,
  };
  const user = await User.findOneAndUpdate(
    { _id: userid },
    { $push: { following: newfollowing } }
  )
    .then((use) => {
      res.status(200).send("success");
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).send("Bad rquest");
    });
});
router.delete("/removeFollowing", getUserId, async (req, res) => {
  const userid = req.id;
  await User.findOneAndUpdate(
    { _id: userid },
    {
      $pull: {
        following: { followingId: req.body.followingId },
      },
    }
  ).catch(() => {
    res.status(400).send("Bad request");
  });
  await User.findOneAndUpdate(
    { _id: req.body.followingId },
    { $pull: { followers: { followerId: userid } } }
  )
    .then(() => {
      res.status(200).send("success");
    })
    .catch(() => {
      res.status(400).send("Bad Request");
    });
});
router.post("/changeBio", getUserId, async (req, res) => {
  const userid = req.id;
  const addedbio = await User.findOneAndUpdate(
    { _id: userid },
    { $set: { bio: req.body.bio } }
  )
    .then((el) => {
      res.status(200).send("success");
    })
    .catch(() => {
      res.status(400).send("Bad request");
    });
});

router.post("/addReadingList", getUserId, async (req, res) => {
  const userid = req.id;
  const newRead = {
    postId: req.body.postId,
    posterId: req.body.posterId,
    posterImg: req.body.posterImg,
    posterName: req.body.posterName,
    posttitle: req.body.posttitle,
    date: req.body.date,
    postSubtitle: req.body.postSubtitle,
    postThumbnail: req.body.postThumbnail,
  };
  const added = await readingList.findOneAndUpdate(
    { userid: userid },
    { $push: { readingList: newRead } }
  );
  if (!added) {
    readingList.create({
      userid: userid,
      readingList: [newRead],
    });
    res.status(200).send("New Reading List added");
  } else {
    res.status(200).send("Reading added");
  }
});
router.get("/getReadingList", getUserId, async (req, res) => {
  const readinglist = await readingList.findOne({ userid: req.id });
  readinglist
    ? res.status(200).send({ Rl: readinglist.readingList })
    : res.status(400).send({ Rl: [] });
});

router.delete("/removeRead", getUserId, async (req, res) => {
  const userid = req.id;
  console.log(req.body.postId);
  const removed = await readingList
    .findOneAndUpdate(
      { userid: userid },
      {
        $pull: {
          readingList: {
            postId: req.body.postId,
          },
        },
      }
    )
    .then(() => {
      res.status(200).send("removed");
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).send("Bad request");
    });
  console.log(removed);
});

module.exports = router;
