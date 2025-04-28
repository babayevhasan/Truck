
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuth } from "../../context/AuthContext"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");  
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "123456") {
      await login(email, password);
      navigate("/"); 
    } else {
      alert("Incorrect login!");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
        <p className={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/signin" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
