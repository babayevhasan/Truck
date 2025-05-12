import React from "react"
import styles from "./Notifications.module.css"
import { useNotifications } from "../../context/NotificationContext"

export default function Notifications() {
  const { notifications } = useNotifications()

  return (
    <div className={styles.container}>
      <h2>Bildirişlər</h2>
      <ul className={styles.list}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))
        ) : (
          <li>Bildiriş yoxdur</li>
        )}
      </ul>
    </div>
  )
}
