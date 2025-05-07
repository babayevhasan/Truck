import { useNavigate } from "react-router-dom";
import LeftNav from "../../assets/icons/leftnav.svg?react";
import RightNav from "../../assets/icons/rightnav.svg?react";
import Bell from "../../assets/icons/bell.svg?react";
import styles from "./FreightAnnouncements.module.css";

const navItems = [
  { path: "/" },
  { path: "/profile" },
  { path: "/configuration" },
  { path: "/freight-announcements" },
  { path: "/vehicle-announcements" },
  { path: "/messages" },
  { path: "/operators" },
  { path: "/users" },
  { path: "/transactions" },
]

export default function Header() {
  const navigate = useNavigate();

  const handleNavigation = (direction) => {
    const currentIndex = navItems.findIndex(item =>
      location.pathname === item.path || location.pathname.startsWith(item.path + "/")
    )
    let targetIndex = currentIndex

    if (direction === "next" && targetIndex < navItems.length - 1) {
      targetIndex += 1
    } else if (direction === "prev" && targetIndex > 0) {
      targetIndex -= 1
    }
    if (targetIndex >= 0 && targetIndex < navItems.length) {
      navigate(navItems[targetIndex].path)
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.backornext}>
        <button onClick={() => handleNavigation("prev")}>
          <LeftNav />
        </button>
        <button onClick={() => handleNavigation("next")}>
          <RightNav />
        </button>
      </div>
      <div className={styles.notifications}>
        <button className={styles.notificationButton}>
          <Bell />
        </button>
      </div>
    </div>
  );
}