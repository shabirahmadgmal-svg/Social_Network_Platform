import React from 'react';

function Navbar() {
    return (
        <div style={{
            backgroundColor: "#1877f2",
            height: "70px",
            display: "flex",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 999,
            padding: "0 20px",
            color: "white",
            justifyContent: "space-between",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
        }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", cursor: "pointer" }}>MySocial</div>

            {/* Search Bar */}
            <div style={{ backgroundColor: "#f0f2f5", borderRadius: "20px", padding: "0px 15px", width: "300px", height: "50px" }}>
  <input 
    placeholder="Search MySocial" 
    style={{ border: "none", width: "100%", background: "transparent", outline: "none" }} 
  />
</div>

            {/* Icons/Links */}
            <div style={{ display: "flex", gap: "20px", fontWeight: "500", cursor: "pointer" }}>
                <span>Home</span>
                <span>Profile</span>
            </div>
        </div>
    );
}

export default Navbar;