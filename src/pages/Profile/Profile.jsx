
// import { useAuth } from "../../context/AuthContext";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Profile.module.css";

// export default function Profile() {
//   const { user, logout } = useAuth();
//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [profileImage, setProfileImage] = useState(user?.profileImage || "");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfileImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpdateProfile = () => {
//     // Profile update logic (e.g., send data to backend)
//     console.log("Updated Profile:", { name, email, profileImage });
//   };

//   return (
//     <div className={`container mx-auto p-6 ${styles.profileContainer}`}>
      
//       <div className={styles.profileInfo}>
//         {/* Profil Resmi */}
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
//             onChange={handleImageChange}
//             className={styles.imageInput}
//             accept="image/*"
//           />
//         </div>

//         {/* Kullanıcı Bilgileri */}
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
//       </div>

//       <div className={styles.buttons}>
//         <button className={styles.updateProfileButton} onClick={handleUpdateProfile}>
//           Update Profile
//         </button>
//         <button className={styles.logoutButton} onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }








// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Profile.module.css";

// export default function Profile() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [profileImage, setProfileImage] = useState(user?.profileImage || "");

//   useEffect(() => {
//     // Sayfa yenilendiğinde 'localStorage' üzerinden profil bilgilerini yükleyin
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
//         setProfileImage(imageDataUrl); // Profil resmini güncelle
//         // Resmi 'localStorage' kaydedelim
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
//           } catch (error) {
//             console.error(error);
//             alert(
//               "Profile image could not be saved. Please try again later."
//             );
//           }
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpdateProfile = () => {
//     const updatedUser = {
//       name,
//       email,
//       profileImage,
//     };

//     // Kullanıcı verilerini localStorage'a kaydet
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     alert("Profile updated!");
//   };

//   return (
//     <div className={`container mx-auto p-6 ${styles.profileContainer}`}>
//       <div className={styles.profileInfo}>
//         {/* Profil Resmi */}
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
//             onChange={handleImageChange}
//             className={styles.imageInput}
//             accept="image/*"
//           />
//         </div>

//         {/* Kullanıcı Bilgileri */}
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
//       </div>

//       <div className={styles.buttons}>
//         <button
//           className={styles.updateProfileButton}
//           onClick={handleUpdateProfile}
//         >
//           Update Profile
//         </button>
//         <button className={styles.logoutButton} onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }





import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

export default function Profile() {
  const { user, logout } = useAuth();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setProfileImage(imageDataUrl); // Set the new image for display

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          const updatedUser = {
            ...storedUser,
            name,
            email,
            profileImage: imageDataUrl, // Save the new image to localStorage
          };
          try {
            localStorage.setItem("user", JSON.stringify(updatedUser));
          } catch (error) {
            console.error(error);
            alert("Profil resmi kaydedilemedi. Lütfen tekrar deneyin.");
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    const updatedUser = {
      name,
      email,
      profileImage,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated!");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.password === currentPassword) {
      const updatedUser = {
        ...storedUser,
        password: newPassword,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Password updated!");
    } else {
      alert("Current password is incorrect.");
    }
  };

  return (
    <div className={`container mx-auto p-6 ${styles.profileContainer}`}>
      <div className={styles.profileInfo}>
        <div className={styles.profileImageContainer}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}

          <button
            className={styles.uploadButton}
            onClick={() => document.getElementById("fileInput").click()}
          >
            Upload Profile Picture
          </button>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            className={styles.imageInput}
            accept="image/*"
            style={{ display: "none" }}  
          />
        </div>

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

        <div className={styles.inputContainer}>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
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
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.updateProfileButton}
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
        <button
          className={styles.updatePasswordButton}
          onClick={handlePasswordChange}
        >
          Update Password
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}




