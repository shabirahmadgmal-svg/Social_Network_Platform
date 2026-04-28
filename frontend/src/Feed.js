import { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  
  // Update/Edit ke liye states
  const [isEditing, setIsEditing] = useState(null); 
  const [editDesc, setEditDesc] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user?._id;
  const currentUsername = user?.username;

  const PF = "http://localhost:5000/images/";

  const getPosts = async () => {
    try {
      const res = await axios.get("/api/posts/all");
      setPosts(res.data);
    } catch (err) {
      console.log("Posts lane mein masla hua", err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // --- DELETE FUNCTION ---
  const handleDelete = async (postId, postUserId) => {
    if (window.confirm("Kya aap waqai ye post delete karna chahte hain?")) {
      try {
        await axios.delete(`/api/posts/${postId}`, {
          data: { userId: currentUserId }, 
        });
        alert("Post delete ho gayi!");
        getPosts(); 
      } catch (err) {
        alert("Delete nahi ho saki!");
      }
    }
  };

  // --- UPDATE FUNCTION ---
  const handleUpdate = async (postId) => {
    try {
      await axios.put(`/api/posts/${postId}`, { 
        userId: currentUserId, 
        desc: editDesc 
      });
      setIsEditing(null); 
      getPosts(); 
    } catch (err) {
      alert("Update nahi ho saki!");
    }
  };

  const handleLike = async (postId) => {
    if (!currentUserId) return alert("Pehle login karein!");
    try {
      await axios.put(`/api/posts/${postId}/like`, { userId: currentUserId });
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]) return;
    if (!currentUserId) return alert("Pehle login karein!");
    try {
      await axios.put(`/api/posts/${postId}/comment`, {
        userId: currentUserId,
        username: currentUsername,
        text: commentText[postId]
      });
      setCommentText({ ...commentText, [postId]: "" });
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="feed-container">
      <h3 style={{ borderBottom: "2px solid #1877f2", paddingBottom: "10px", color: "#1877f2", textAlign: "left" }}>
        Timeline
      </h3>

      {posts.length === 0 ? (
        <p>Abhi tak koi post nahi hai...</p>
      ) : (
        posts.map((p) => (
          <div key={p._id} className="post-card card" style={{ textAlign: "left", padding: "15px", marginBottom: "15px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            
            {/* Header Section: User Info + Edit/Delete Buttons */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
               <div style={{ display: "flex", alignItems: "center" }}>
                 <div style={{ width: "35px", height: "35px", borderRadius: "50%", backgroundColor: "#1877f2", color: "white", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px", fontWeight: "bold" }}>
                   {p.userId === currentUserId ? "ME" : "U"}
                 </div>
                 <span style={{ fontWeight: "bold" }}>User ID: {p.userId.substring(0,5)}...</span>
               </div>

               {/* Edit aur Delete sirf apni post par dikhen ge */}
               {p.userId === currentUserId && (
                 <div style={{ display: "flex", gap: "10px" }}>
                    <button 
                      onClick={() => { setIsEditing(p._id); setEditDesc(p.desc); }}
                      style={{ border: "none", background: "#e4e6eb", cursor: "pointer", borderRadius: "5px", padding: "2px 8px" }}
                    >✏️ Edit</button>
                    <button 
                      onClick={() => handleDelete(p._id, p.userId)}
                      style={{ border: "none", background: "#ffebee", color: "#f44336", cursor: "pointer", borderRadius: "5px", padding: "2px 8px" }}
                    >🗑️ Delete</button>
                 </div>
               )}
            </div>

            {/* Post Description Area (Edit Mode vs View Mode) */}
            {isEditing === p._id ? (
              <div style={{ marginBottom: "10px" }}>
                <textarea 
                  value={editDesc} 
                  onChange={(e) => setEditDesc(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #1877f2", outline: "none" }}
                />
                <div style={{ marginTop: "5px", display: "flex", gap: "5px" }}>
                  <button onClick={() => handleUpdate(p._id)} style={{ background: "#1877f2", color: "white", border: "none", padding: "5px 15px", borderRadius: "5px", cursor: "pointer" }}>Save</button>
                  <button onClick={() => setIsEditing(null)} style={{ background: "#ccc", border: "none", padding: "5px 15px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: "16px", color: "#050505", marginBottom: "10px" }}>{p.desc}</p>
            )}
            
            {/* Post Image */}
            {p.img && (
              <img 
                src={PF + p.img} 
                alt="post_content" 
                style={{ width: "100%", maxHeight: "450px", objectFit: "contain", borderRadius: "8px", background: "#f9f9f9" }} 
              />
            )}

            <hr style={{ opacity: 0.1, margin: "15px 0" }} />
            
            {/* Interaction Buttons */}
            <div style={{ display: "flex", gap: "25px", marginBottom: "10px" }}>
              <span 
                onClick={() => handleLike(p._id)} 
                style={{ cursor: "pointer", color: p.likes.includes(currentUserId) ? "#1877f2" : "#65676b", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}
              >
                👍 {p.likes.length} Likes
              </span>
              <span style={{ color: "#65676b", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                💬 {p.comments.length} Comments
              </span>
            </div>

            {/* Comments Section */}
            <div style={{ background: "#f0f2f5", padding: "12px", borderRadius: "10px" }}>
              {p.comments.map((c, index) => (
                <div key={index} style={{ fontSize: "14px", marginBottom: "8px", borderBottom: "1px solid #e0e0e0", paddingBottom: "4px" }}>
                  <b style={{ color: "#1877f2" }}>{c.username || "User"}: </b> 
                  <span>{c.text}</span>
                </div>
              ))}

              <div style={{ display: "flex", marginTop: "10px", gap: "8px" }}>
                <input 
                  placeholder="Write a comment..." 
                  value={commentText[p._id] || ""}
                  onChange={(e) => setCommentText({ ...commentText, [p._id]: e.target.value })}
                  style={{ flex: 1, borderRadius: "20px", padding: "6px 15px", border: "1px solid #ccc", outline: "none" }}
                />
                <button 
                  onClick={() => handleComment(p._id)} 
                  style={{ borderRadius: "20px", padding: "5px 15px", backgroundColor: "#1877f2", color: "white", border: "none", cursor: "pointer" }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Feed;