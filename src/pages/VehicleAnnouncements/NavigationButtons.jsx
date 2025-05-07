import LeftNav from "../../assets/icons/leftnav.svg?react"
 import RightNav from "../../assets/icons/rightnav.svg?react"
 import styles from "./VehicleAnnouncements.module.css"

export const NavigationButtons = ({ onNavigate }) => {
  return (
    <div className={styles.backornext}>
      <button onClick={() => onNavigate("prev")}>
        <LeftNav />
      </button>
      <button onClick={() => onNavigate("next")}>
        <RightNav />
      </button>
    </div>
  );
};