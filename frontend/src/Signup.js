import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", { username, email, password });
      alert("Mubarak ho! Account ban gaya.");
    } catch (err) {
      console.log(err);
      alert("Koshish nakam rahi!");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid black", width: "300px" }}>
      <h2>Naya Account Banayein</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br/>
        <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} /><br/>
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br/>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;