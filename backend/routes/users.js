// FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User follow ho gaya!");
      } else {
        res.status(403).json("Aap pehle hi follow kar rahe hain.");
      }
    } catch (err) { res.status(500).json(err); }
  } else {
    res.status(403).json("Aap khud ko follow nahi kar sakte!");
  }
});