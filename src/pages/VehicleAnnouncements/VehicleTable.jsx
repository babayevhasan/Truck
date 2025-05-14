import { useNotifications } from "../../context/NotificationContext";
import CalendarIcon from "../../assets/icons/calendar.svg?react";
import styles from "./VehicleAnnouncements.module.css";

export const VehicleTable = ({
  currentItems,
  getStatusClass,
  handleDelete,
  handleEdit
}) => {
  const { addNotification } = useNotifications(); 

  const handleDeleteWithNotification = (itemId, fromCountry, toCountry) => {
    handleDelete(itemId);
    addNotification(`Elan silindi: ${fromCountry} → ${toCountry}`);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Haradan</th>
            <th> tarix</th>
            <th>Haraya</th>
            <th> tarix</th>
            <th>Növü</th>
            <th>Status</th>
            <th>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {item.fromLocation}, {item.fromCountry}
              </td>
              <td>
                <div className={styles.dateCell}>
                  <CalendarIcon />
                  {item.fromDate}
                </div>
              </td>
              <td>
                {item.toLocation}, {item.toCountry}
              </td>
              <td>
                <div className={styles.dateCell}>
                  <CalendarIcon />
                  {item.toDate}
                </div>
              </td>
              <td>{item.type}</td>
              <td>
                <span className={`${styles.status} ${getStatusClass(item.status)}`}>• {item.status}</span>
              </td>
              <td>
                <div className={styles.actionButtons}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWithNotification(item.id, item.fromCountry, item.toCountry);
                    }} 
                    className={styles.deleteButton}
                  >
                    Sil
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item); 
                    }}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

