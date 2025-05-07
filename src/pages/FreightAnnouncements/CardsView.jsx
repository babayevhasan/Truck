import { useNavigate } from "react-router-dom";
import TruckIcon from "../../assets/icons/truckorange.svg?react";
import styles from "./FreightAnnouncements.module.css";

export default function CardsView({ currentItems, handleDelete, handleEdit }) {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/vehicle-announcements/${id}`);
  };

  return (
    <div className={styles.cardsContainer}>
      {currentItems.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <div
              className={`${styles.statusBadge} ${
                item.status === "Aktiv"
                  ? styles.statusBadgeActive
                  : item.status === "Ləğv"
                  ? styles.statusBadgeCancel
                  : item.status === "Blok"
                  ? styles.statusBadgeBlock
                  : styles.statusBadgePending
              }`}
            >
              {item.status}
            </div>
            <button className={styles.bookmarkButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.locationInfo}>
              <div className={styles.city}>{item.fromLocation},</div>
              <div className={styles.country}>{item.fromCountry}</div>
              <div className={styles.date}>{item.fromDate}</div>
            </div>
            <div className={styles.routeLine}></div>
            <TruckIcon />
            <div className={`${styles.routeDot} ${styles.routeDotStart}`}></div>
            <div className={`${styles.routeDot} ${styles.routeDotEnd}`}></div>
            <div className={styles.locationInfo}>
              <div className={styles.city}>{item.toLocation},</div>
              <div className={styles.country}>{item.toCountry}</div>
              <div className={styles.date}>{item.toDate}</div>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.freightType}>{item.type}</div>
            <div className={styles.cardActions}>
              <button
                onClick={() => handleViewDetails(item.id)}
                className={styles.detailsButton}
              >
                Detallarına bax
              </button>
              <div className={styles.cardActionButtons}>
                <button
                  onClick={() => handleDelete(item.id)}
                  className={styles.deleteButton}
                >
                  Sil
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className={styles.editButton}
                >
                  Redaktə
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
