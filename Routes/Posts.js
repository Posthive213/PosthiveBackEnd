const express = require("express");
const router = express.Router();
const posts = require("../Schema/PostSchema");
const blogcontents = require("../Schema/BlogContentSchema");
const authenticate = require("../Middlewares/userAuthentication");

router.get("/allPosts", async (req, res) => {
  const allPosts = await posts.find({});
  const index = +req.headers.index;
  if (allPosts.length > index) {
    res.status(200).send({
      Posts: allPosts.slice(index + 0, index + 12),
      nextIndex: index + 12,
    });
  } else {
    res.status(200).send({
      Posts: allPosts.slice(index + 0, index + 12),
      done: true,
    });
  }
});

router.post("/addpost", authenticate, async (req, res) => {
  const blogcontent = await blogcontents.create({
    content: req.body.content,
  });
  const Newpost = await posts.create({
    id: req.id,
    content: blogcontent._id,
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

router.get("/getblogContent", async (req, res) => {
  const blogid = await req.headers.id;
  const blogContent = await blogcontents.findOne({ _id: blogid });
  res.status(200).send({ blogContent: blogContent });
});

router.get("/staffPicks", async (req, res) => {
  const allstaffpicks = await posts.find({ genre: "staffpick" });
  res.status(200).send({ staffpicks: allstaffpicks });
});

router.get("/getBlog/:id", async (req, res) => {
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
    commentorId: req.body.commentorId,
  };

  const postedcomment = await posts.findOneAndUpdate(
    { _id: id },
    { $push: { comments: comment } }
  );
  res.status(200).send({ success: "ok" });
});

router.get("/userPosts/:userid", async (req, res) => {
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
  const reg = new RegExp(`${intres}`, "i");
  const intrestPosts = await posts.find({ genre: { $in: [reg] } });
  res.status(200).send(intrestPosts);
});
router.get("/searchResult/:query", async (req, res) => {
  try {
    const query = req.params.query;
    let reg = new RegExp(`${query}`, "i");
    const G_posts = await posts.find({
      $or: [{ title: { $regex: reg } }, { genre: { $in: [reg] } }],
    });
    res.status(200).send({ posts: G_posts });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
