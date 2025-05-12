import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import ProfileImageSection from "./ProfileImageSection";
import ProfileInfoForm from "./ProfileInfoForm";
import PasswordChangeForm from "./PasswordChangeForm";
import ProfileButtons from "./ProfileButtons";
import { updateUserInLocalStorage } from "./profileHelpers";
export default function Profile() {
  const { user, logout } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setName(storedUser.name);
      setEmail(storedUser.email);
      setProfileImage(storedUser.profileImage || "");
    }
  }, []);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleImageChange = (imageDataUrl) => {
    setProfileImage(imageDataUrl);
    updateUserInLocalStorage({ name, email, profileImage: imageDataUrl }, addNotification);
  };
  const handleUpdateProfile = () => {
    updateUserInLocalStorage({ name, email, profileImage }, addNotification);
  };
  const handlePasswordChange = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!currentPassword || !newPassword || !confirmPassword) {
      addNotification("Please fill in all password fields.");
    } else if (newPassword !== confirmPassword) {
      addNotification("New password and confirmation do not match.");
    } else if (storedUser.password !== currentPassword) {
      addNotification("Current password is incorrect.");
    } else {
      storedUser.password = newPassword;
      localStorage.setItem("user", JSON.stringify(storedUser));
      addNotification("Password updated successfully!");
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className={`container mx-auto p-6 ${styles.profileContainer}`}>
      <div className={styles.profileInfo}>
        <ProfileImageSection
          profileImage={profileImage}
          onImageChange={handleImageChange}
        />
        <ProfileInfoForm
          name={name} setName={setName} email={email} setEmail={setEmail}
        />
        <PasswordChangeForm
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setCurrentPassword={setCurrentPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <ProfileButtons
          onUpdateProfile={handleUpdateProfile}
          onUpdatePassword={handlePasswordChange}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}
