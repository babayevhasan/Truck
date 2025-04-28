// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import styles from "./Signin.module.css";

// export default function Signin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const user = { email, password };
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("isAuthenticated", "true");

//     alert("succses!");
//     navigate("/");
//   };

//   return (
//     <div className={styles.signinContainer}>
//       <form onSubmit={handleSubmit} className={styles.signinForm}>
//         <h2>singin</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">singin</button>
//         <p className={styles.linkText}>
//         Do you have an account?{" "}
//           <Link to="/login" className={styles.link}>
//            login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Signin.module.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password }; 
    localStorage.setItem("user", JSON.stringify(user));  
    localStorage.setItem("isAuthenticated", "true");

    alert("Success!");  
    navigate("/");  
  };

  return (
    <div className={styles.signinContainer}>
      <form onSubmit={handleSubmit} className={styles.signinForm}>
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        <p className={styles.linkText}>
          Do you have an account?{" "}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
