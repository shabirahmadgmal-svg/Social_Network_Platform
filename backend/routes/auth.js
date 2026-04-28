const router = require("express").Router();
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
    // Ye line terminal mein data dikhayegi
    console.log("Aane wala data:", req.body); 

    try {
        // Agar body khali ho to error de de
        if (!req.body || !req.body.username) {
            return res.status(400).json("Error: Data nahi mila! Thunder Client mein JSON sahi se select karein.");
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json("Database Error: " + err);
    }
});
// LOGIN
router.post("/login", async (req, res) => {
    console.log("Login ki koshish:", req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("User not found!");

        if (user.password !== req.body.password) {
            return res.status(400).json("Wrong password!");
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;