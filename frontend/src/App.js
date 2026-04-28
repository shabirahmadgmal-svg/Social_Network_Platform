import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Login from "./Login";
import Post from "./Post";
import Feed from "./Feed";
import UsersList from "./UsersList"; // Naya component import kiya

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="App" style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />

      <div className="main-layout" style={{
        display: "flex",
        justifyContent: "center",
        padding: "30px",
        gap: "20px", // Gap thora kam kiya taake 3 columns aa saken
        maxWidth: "1200px",
        margin: "0 auto"
      }}>

        {!user ? (
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
            <div className="card" style={{ padding: "20px", width: "350px", backgroundColor: "white", borderRadius: "10px" }}>
              <h3 style={{ textAlign: "center", color: "#1877f2" }}>Naya Account Banayein</h3>
              <Signup />
            </div>
            <div className="card" style={{ padding: "20px", width: "350px", backgroundColor: "white", borderRadius: "10px" }}>
              <h3 style={{ textAlign: "center", color: "#1877f2" }}>Pehle se Account hai?</h3>
              <Login />
            </div>
          </div>
        ) : (
          /* LOGIN HONE KE BAAD 3 SECTIONS: Profile, Feed, aur Users List */
          <>
            {/* Left Sidebar: User Profile */}
            <div className="sidebar" style={{ flex: "1", maxWidth: "250px" }}>
              <div className="card" style={{ padding: "20px", textAlign: "center", backgroundColor: "white", borderRadius: "10px", position: "sticky", top: "80px" }}>
                <div style={{ width: "60px", height: "60px", background: "#1877f2", borderRadius: "50%", margin: "0 auto 10px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold" }}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>{user.username}</h3>
                <p style={{ color: "gray", fontSize: "12px" }}>{user.email}</p>
                <button onClick={handleLogout} style={{ background: "#e4e6eb", color: "black", width: "100%", marginTop: "10px", border: "none", padding: "8px", borderRadius: "5px", cursor: "pointer" }}>Logout</button>
              </div>
            </div>

            {/* Middle Section: Post and Feed */}
            <div className="feed-section" style={{ flex: "2", maxWidth: "550px" }}>
              <div className="card" style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
                <Post />
              </div>
              <Feed />
            </div>

            {/* Right Sidebar: Suggested Friends (Users List) */}
            <div className="rightbar" style={{ flex: "1", maxWidth: "300px" }}>
              <div style={{ position: "sticky", top: "80px" }}>
                <UsersList />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;