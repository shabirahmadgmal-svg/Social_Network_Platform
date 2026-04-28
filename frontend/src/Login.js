import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      // User ka data browser mein save kar rahe hain
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Login Kamyab! Page refresh karein.");
      window.location.reload(); 
    } catch (err) {
      alert("Login nakam raha! Email ya Password check karein.");
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" style={{width: "100%"}}>Login</button>
      </form>
    </div>
  );
}

export default Login;