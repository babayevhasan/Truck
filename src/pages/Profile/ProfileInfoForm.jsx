import styles from "./Profile.module.css";

export default function ProfileInfoForm({ name, setName, email, setEmail }) {
  return (
    <>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </div>
    </>
  );
}
