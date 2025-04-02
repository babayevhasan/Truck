import { useLocation } from "react-router-dom"
import styles from "./Sidebar.module.css"

export default function Sidebar() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { icon: "dashboard", label: "Dashboard", path: "/" },
    { icon: "settings", label: "Seçim Konfiqurasiyası", path: "/configuration" },
    { icon: "package", label: "Yük elanları", path: "/freight-announcements" },
    { icon: "truck", label: "Yük maşını elanları", path: "/vehicle-announcements" },
    { icon: "message", label: "Mesajlar", path: "/messages" },
    { icon: "users", label: "Operatorlar", path: "/operators" },
    { icon: "user", label: "İstifadəçilər", path: "/users" },
    { icon: "chart", label: "Tranzaksiya", path: "/transactions" },
  ]

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item, index) => (
            <li key={index} className={styles.navItem}>
              <a href={item.path} className={`${styles.navLink} ${isActive(item.path) ? styles.active : ""}`}>
                <span className={`${styles.icon} ${styles[item.icon]}`}></span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
