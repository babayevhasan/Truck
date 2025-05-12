// import { useAuth } from "../../context/AuthContext";
// import { useNotifications } from "../../context/NotificationContext"; 
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import styles from "./Profile.module.css";

// export default function Profile() {
//   const { user, logout } = useAuth();
//   const { addNotification } = useNotifications(); 
//   const navigate = useNavigate();

//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [profileImage, setProfileImage] = useState(user?.profileImage || "");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setName(storedUser.name);
//       setEmail(storedUser.email);
//       setProfileImage(storedUser.profileImage || "");
//     }
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const imageDataUrl = reader.result;
//         setProfileImage(imageDataUrl);

//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         if (storedUser) {
//           const updatedUser = {
//             ...storedUser,
//             name,
//             email,
//             profileImage: imageDataUrl,
//           };
//           try {
//             localStorage.setItem("user", JSON.stringify(updatedUser));
//             addNotification("Profile picture updated."); 
//           } catch (error) {
//             console.error(error);
//             addNotification("Error saving profile picture."); 
//           }
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpdateProfile = () => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     const updatedUser = {
//       ...storedUser,
//       name,
//       email,
//       profileImage,
//     };

//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     addNotification("Profile updated successfully!");
//   };

//   const handlePasswordChange = () => {
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       addNotification("Please fill in all password fields."); 
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       addNotification("New password and confirmation do not match."); 
//     } else {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (storedUser && storedUser.password === currentPassword) {
//         const updatedUser = {
//           ...storedUser,
//           password: newPassword,
//         };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         addNotification("Password updated successfully!"); 
//       } else {
//         addNotification("Current password is incorrect."); 
//       }
//     }
//     setCurrentPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//   };

//   return (
//     <div className={`container mx-auto p-6 ${styles.profileContainer}`}>
//       <div className={styles.profileInfo}>
//         <div className={styles.profileImageContainer}>
//           {profileImage ? (
//             <img
//               src={profileImage}
//               alt="Profile"
//               className={styles.profileImage}
//             />
//           ) : (
//             <div className={styles.noImage}>No Image</div>
//           )}
//           <input
//             type="file"
//             id="fileInput"
//             onChange={handleImageChange}
//             className={styles.imageInput}
//             accept="image/*"
//             style={{ display: "none" }}
//           />
//         </div>
//         <button
//           className={styles.uploadButton}
//           onClick={() => document.getElementById("fileInput").click()}
//         >
//           Upload Profile Picture
//         </button>
//         <div className={styles.inputContainer}>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label htmlFor="currentPassword">Current Password</label>
//           <input
//             type="password"
//             id="currentPassword"
//             placeholder=" ********"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label htmlFor="newPassword">New Password</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label htmlFor="confirmPassword">Confirm New Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.buttons}>
//           <button
//             className={styles.updateProfileButton}
//             onClick={handleUpdateProfile}
//           >
//             Update Profile
//           </button>
//           <button
//             className={styles.updatePasswordButton}
//             onClick={handlePasswordChange}
//           >
//             Update Password
//           </button>
//           <button className={styles.logoutButton} onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//         <Link to="/forgot" className={styles.forgotPassword}>
//           - Forgot Current Password? -
//         </Link>
//       </div>
//     </div>
//   );
// }



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
        <ProfileInfoForm name={name} setName={setName} email={email} setEmail={setEmail} />
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
