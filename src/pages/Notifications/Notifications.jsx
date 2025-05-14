import React, { useEffect, useState } from "react";
import styles from "./Notifications.module.css";
import Header from "../FreightAnnouncements/Header";
import { useNotifications } from "../../context/NotificationContext";

export default function Notifications() {
  const { notifications, markAllAsRead } = useNotifications();
  const [localNotifications, setLocalNotifications] = useState([]);

  useEffect(() => {
    setLocalNotifications(notifications);

    const timer = setTimeout(() => {
      markAllAsRead();
    }, 2000); 

    return () => clearTimeout(timer);
  }, [notifications, markAllAsRead]);

  return ( 
    <>
      <Header />
    <div className={styles.container}>
      <h2>Bildirişlər</h2>
      <ul className={styles.list}>
        {localNotifications.length > 0 ? (
          localNotifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))
        ) : (
          <li>Bildiriş yoxdur</li>
        )}
      </ul>
    </div>
        </>
  );
}

