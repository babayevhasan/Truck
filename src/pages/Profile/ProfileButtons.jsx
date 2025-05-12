import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

export default function ProfileButtons({ onUpdateProfile, onUpdatePassword, onLogout }) {
  return (
    <div className={styles.buttons}>
      <button className={styles.updateProfileButton} onClick={onUpdateProfile}>
        Update Profile
      </button>
      <button className={styles.updatePasswordButton} onClick={onUpdatePassword}>
        Update Password
      </button>
      <button className={styles.logoutButton} onClick={onLogout}>
        Logout
      </button>
      <Link to="/forgot" className={styles.forgotPassword}>
        - Forgot Current Password? -
      </Link>
    </div>
  );
}
