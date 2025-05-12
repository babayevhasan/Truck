import styles from "./Profile.module.css";

export default function ProfileImageSection({ profileImage, onImageChange }) {
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onImageChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.profileImageContainer}>
      {profileImage ? (
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
      ) : (
        <div className={styles.noImage}>No Image</div>
      )}
      <input
        type="file"
        id="fileInput"
        onChange={handleFileInput}
        className={styles.imageInput}
        accept="image/*"
        style={{ display: "none" }}
      />
      <button
        className={styles.uploadButton}
        onClick={() => document.getElementById("fileInput").click()}
      >
        Upload Profile Picture
      </button>
    </div>
  );
}
