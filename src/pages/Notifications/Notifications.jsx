// import React, { useEffect, useState } from "react";
// import styles from "./Notifications.module.css";
// import Header from "../FreightAnnouncements/Header";
// import { useNotifications } from "../../context/NotificationContext";

// export default function Notifications() {
//   const { notifications, markAllAsRead } = useNotifications();
//   const [localNotifications, setLocalNotifications] = useState([]);

//   useEffect(() => {
//     setLocalNotifications(notifications);

//     const timer = setTimeout(() => {
//       markAllAsRead();
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [notifications, markAllAsRead]);

//   return (
//     <>
//       <Header />
//       <div className={styles.container}>
//         <h2>Bildirişlər</h2>
//         <ul className={styles.list}>
//           {localNotifications.length > 0 ? (
//             localNotifications.map((notification, index) => (
//               <li key={index}>{notification}</li>
//             ))
//           ) : (
//             <li>Bildiriş yoxdur</li>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import styles from "./Notifications.module.css";
import Header from "../FreightAnnouncements/Header";
import { useNotifications } from "../../context/NotificationContext";

export default function Notifications() {
  const { notifications, markAllAsRead } = useNotifications();
  const [localNotifications, setLocalNotifications] = useState([]);
  const [persistentNotifications, setPersistentNotifications] = useState([]);
  const [newPersistentMsg, setNewPersistentMsg] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("persistentNotifications")) || [];
    setPersistentNotifications(stored);

    setLocalNotifications(notifications);

    const timer = setTimeout(() => {
      markAllAsRead();
    }, 2000);

    return () => clearTimeout(timer);
  }, [notifications, markAllAsRead]);

  const handleAddPersistent = () => {
    if (!newPersistentMsg.trim()) return;

    const updated = [...persistentNotifications, newPersistentMsg];
    localStorage.setItem("persistentNotifications", JSON.stringify(updated));
    setPersistentNotifications(updated);
    setNewPersistentMsg("");
  };

  const handleDeletePersistent = (index) => {
    const updated = [...persistentNotifications];
    updated.splice(index, 1);
    localStorage.setItem("persistentNotifications", JSON.stringify(updated));
    setPersistentNotifications(updated);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Bildirişlər</h2>

        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Reklam mesajı..."
            value={newPersistentMsg}
            onChange={(e) => setNewPersistentMsg(e.target.value)}
          />
          <button onClick={handleAddPersistent}>Əlavə et</button>
        </div>

        <ul className={styles.list}>
          {persistentNotifications.map((msg, index) => (
            <li key={`persistent-${index}`}>
              <span>{msg}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeletePersistent(index)}
              >
                Sil
              </button>
            </li>
          ))}

          {localNotifications.length > 0 ? (
            localNotifications.map((notification, index) => (
              <li key={`temp-${index}`}>{notification}</li>
            ))
          ) : persistentNotifications.length === 0 ? (
            <li>Bildiriş yoxdur</li>
          ) : null}
        </ul>
      </div>
    </>
  );
}


