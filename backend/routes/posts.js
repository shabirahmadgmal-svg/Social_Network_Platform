const router = require("express").Router();
const Post = require("../models/Post");

// CREATE A POST
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POSTS
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Nayi posts sab se upar
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIKE / DISLIKE A POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post like ho gayi!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Like hata diya gaya!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// COMMENT ON A POST
router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const newComment = {
      userId: req.body.userId,
      username: req.body.username,
      text: req.body.text,
    };
    await post.updateOne({ $push: { comments: newComment } });
    res.status(200).json("Comment add ho gaya!");
  } catch (err) {
    res.status(500).json(err);
  }
});
// 1. DELETE A POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post delete ho gayi!");
    } else {
      res.status(403).json("Aap sirf apni post delete kar sakte hain!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. UPDATE A POST (Post ka text badalna)
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post update ho gayi!");
    } else {
      res.status(403).json("Aap sirf apni post update kar sakte hain!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;