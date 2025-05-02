
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Forgot.module.css"; 

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleCheckEmail = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email) {
      setStep(2); 
    } else {
      alert("Email not found!");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      const updatedUser = {
        ...storedUser,
        password: newPassword,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Password successfully changed!");
      navigate("/login");
    }
  };

  return (
    <div className={styles.forgotContainer}>
      <form onSubmit={step === 1 ? handleCheckEmail : handleChangePassword} className={styles.forgotForm}>
        <h2>Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Continue</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Change Password</button>
          </>
        )}
      </form>
    </div>
  );
}

