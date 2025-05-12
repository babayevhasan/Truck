import styles from "./Profile.module.css";

export default function PasswordChangeForm({
  currentPassword,
  newPassword,
  confirmPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
}) {
  return (
    <>
      <div className={styles.inputContainer}>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          placeholder="********"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
      </div>
    </>
  );
}
