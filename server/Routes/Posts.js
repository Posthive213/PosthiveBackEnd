const express = require("express");
const router = express.Router();
const posts = require("../Schema/PostSchema");
const authenticate = require("../Middlewares/userAuthentication");

router.get("/allPosts", async (req, res) => {
  const allPosts = await posts.find({});
  res.status(200).send({ Posts: allPosts });
});

router.post("/addpost", authenticate, async (req, res) => {
  const Newpost = await posts.create({
    id: req.id,
    content: req.body.content,
    date: Date.now(),
    name: req.body.name,
    profileImg: req.body.profileImg,
    genre: req.body.genre,
    title: req.body.title,
    subtitle: req.body.subtitle,
    Thumbnail: req.body.Thumbnail,
    comments: req.body.comments,
  });
  res.status(200).send({ Newpost });
});

router.get("/staffPicks", async (req, res) => {
  const allstaffpicks = await posts.find({ genre: "staffpick" });
  res.status(200).send({ staffpicks: allstaffpicks });
});

router.get("/getBlog/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  const blog = await posts
    .findById(id)
    .then((blo) => {
      res.status(200).send(blo);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

router.post("/commentpost/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  const comment = {
    commentcontent: req.body.commentcontent,
    username: req.body.username,
    commenterImg: req.body.commenterImg,
    date: req.body.date,
  };

  const postedcomment = await posts.findOneAndUpdate(
    { _id: id },
    { $push: { comments: comment } }
  );
  res.status(200).send({ success: "ok" });
});

router.get("/userPosts/:userid", authenticate, async (req, res) => {
  const userid = req.params.userid;
  const userPosts = await posts
    .find({ id: userid })
    .then((posts) => {
      res.status(200).send({ posts: posts });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

router.get("/intresPost", authenticate, async (req, res) => {
  const intres = await req.headers.intrest;
  console.log(intres);
  const intrestPosts = await posts.find({ genre: intres });
  res.status(200).send(intrestPosts);
});

module.exports = router;
