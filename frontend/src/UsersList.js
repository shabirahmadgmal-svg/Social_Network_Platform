import axios from "axios";
import { useEffect, useState } from "react";

function UsersList() {
  const [allUsers, setAllUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getUsers = async () => {
      try {
        // Backend se saare users mangwayen
        const res = await axios.get("http://localhost:5000/api/users/all/list");
        // Apne aap ko list se nikal kar baki sab ko state mein save karein
        const otherUsers = res.data.filter((u) => u._id !== currentUser?._id);
        setAllUsers(otherUsers);
      } catch (err) {
        console.error("Users lane mein error:", err);
      }
    };
    if (currentUser) getUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}/follow`, { 
        userId: currentUser._id 
      });
      alert("Followed!");
    } catch (err) {
      alert("Masla hua ya pehle se follow kar rahe hain.");
    }
  };

  return (
    <div style={{ padding: "20px", background: "white", borderRadius: "10px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", textAlign: "left" }}>
      <h4 style={{ color: "#65676b", marginBottom: "15px" }}>Suggested Friends</h4>
      
      {allUsers.length === 0 ? (
        <p style={{ color: "gray", fontSize: "13px" }}>Koi aur user nahi mila. Ek naya account banayein check karne ke liye.</p>
      ) : (
        allUsers.map((u) => (
          <div key={u._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#1877f2", color: "white", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px", fontWeight: "bold" }}>
                {u.username.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontWeight: "600", fontSize: "14px" }}>{u.username}</span>
            </div>
            {/* Follow Button yahan har user ke liye alag hai */}
            <button 
              onClick={() => handleFollow(u._id)}
              style={{ padding: "5px 12px", borderRadius: "6px", border: "none", background: "#e7f3ff", color: "#1877f2", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
            >
              Follow
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default UsersList;