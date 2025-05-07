import styles from "./FreightAnnouncements.module.css";

export default function TabSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === "cards" ? styles.activeTab : ""}`}
        onClick={() => setActiveTab("cards")}
      >
        Elan kartları
      </button>
      <button
        className={`${styles.tab} ${activeTab === "table" ? styles.activeTab : ""}`}
        onClick={() => setActiveTab("table")}
      >
        Elan cədvəli
      </button>
    </div>
  );
}