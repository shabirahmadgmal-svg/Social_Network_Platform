import { useState } from "react";
import axios from "axios";

function Post() {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null); // Photo select karne ke liye state

  const handlePost = async (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      alert("Pehle login karein!");
      return;
    }

    const newPost = {
      userId: loggedInUser._id,
      desc: desc,
    };

    // Agar photo select ki hai toh pehle usey upload karein
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name; // Unique naam taake files overlap na hon
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName; // Database mein image ka naam jayega

      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log("Image upload mein masla:", err);
      }
    }

    try {
      await axios.post("/api/posts", newPost);
      alert("Post Share Ho Gayi!");
      window.location.reload(); 
      setDesc("");
      setFile(null);
    } catch (err) {
      alert("Post nahi ho saki!");
    }
  };

  return (
    <div style={{ textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#1877f2", color: "white", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px" }}>
          {JSON.parse(localStorage.getItem("user"))?.username.charAt(0).toUpperCase()}
        </div>
        <span style={{ fontWeight: "bold" }}>Aapka Khayal?</span>
      </div>
      
      <textarea 
        placeholder="Kuch likhen..." 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)} 
        style={{ width: "100%", border: "none", fontSize: "16px", outline: "none", resize: "none" }}
      /><br/>

      {/* Photo Preview (Optional: selected photo dikhane ke liye) */}
      {file && (
        <div style={{ padding: "10px", position: "relative" }}>
          <img style={{ width: "100%", borderRadius: "10px" }} src={URL.createObjectURL(file)} alt="" />
          <button onClick={() => setFile(null)} style={{ position: "absolute", top: "15px", right: "15px", cursor: "pointer" }}>X</button>
        </div>
      )}

      <hr style={{ opacity: 0.1 }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label htmlFor="file" style={{ cursor: "pointer", color: "#1877f2", fontWeight: "bold" }}>
          🖼️ Photo/Video
          <input 
            type="file" 
            id="file" 
            accept=".png,.jpeg,.jpg" 
            style={{ display: "none" }} 
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </label>
        <button onClick={handlePost} style={{ padding: "5px 20px" }}>Post Karein</button>
      </div>
    </div>
  );
}
export default Post;