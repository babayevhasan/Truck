import styles from "./FreightAnnouncements.module.css";

export default function TableView({ currentItems, handleDelete, handleEdit }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Ləğv":
        return styles.statusCancel
      case "Blok":
        return styles.statusBlock
      case "Aktiv":
        return styles.statusActive
      case "Gözləmədə":
        return styles.statusPending
      default:
        return ""
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Haradan</th>
            <th> tarix</th>
            <th>Haraya</th>
            <th>tarix</th>
            <th>Növü</th>
            <th>Status</th>
            <th>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fromLocation}, {item.fromCountry}</td>
              <td>
                <div className={styles.dateCell}>
                  <span className={`${styles.icon} ${styles.calendar}`}></span>
                  {item.fromDate}
                </div>
              </td>
              <td>{item.toLocation}, {item.toCountry}</td>
              <td>
                <div className={styles.dateCell}>
                  <span className={`${styles.icon} ${styles.calendar}`}></span>
                  {item.toDate}
                </div>
              </td>
              <td>{item.type}</td>
              <td>
                <span className={`${styles.status} ${getStatusClass(item.status)}`}>• {item.status}</span>
              </td>
              <td>
                <div className={styles.actionButtons}>
                  <button onClick={() => handleDelete(item.id)}>
                    Sil
                  </button>
                  <button onClick={() => handleEdit(item)}>
                    Redaktə
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}