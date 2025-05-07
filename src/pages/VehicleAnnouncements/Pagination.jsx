import { ChevronLeftIcon, ChevronRightIcon } from "../VehicleAnnouncements/ChevronIcons";
import styles from "./VehicleAnnouncements.module.css"

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginations}>
        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className={`${styles.icon} ${styles.chevronLeft}`}><ChevronLeftIcon /> </span>
        </button>
        {Array.from({ length: 3 }, (_, i) => {
          const firstPage = Math.max(1, currentPage - 2);
          const page = firstPage + i;
          return page <= totalPages ? (
            <button
              key={page}
              className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : null;
        })}
        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className={`${styles.icon} ${styles.chevronRight}`}><ChevronRightIcon /> </span>
        </button>
      </div>
    </div>
  );
};