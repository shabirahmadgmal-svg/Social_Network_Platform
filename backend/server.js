const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer"); // Multer library
const path = require("path");

const app = express();

app.use(express.json()); 
app.use(cors());

// Images ko browser mein dikhane ke liye static folder banaya
app.use("/images", express.static(path.join(__dirname, "public/images")));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/socialApp")
.then(() => console.log("DB Connected Successfully"))
.catch(err => console.log("DB Connection Error:", err));

// --- Multer Setup (Photo Upload ke liye) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Make sure 'public/images' folder exists
  },
  filename: (req, file, cb) => {
    // Frontend se bheja gaya naam use hoga
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    // Agar file nahi aayi toh error na de
    if (!req.file) return res.status(400).json("File nahi mili!");
    
    return res.status(200).json("File upload ho gayi hai.");
  } catch (error) {
    console.error("Upload Route Error:", error);
    res.status(500).json(error);
  }
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute); 

app.get("/test", (req, res) => {
    res.send("Server is Working!");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});