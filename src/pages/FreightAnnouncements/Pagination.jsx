import styles from "./FreightAnnouncements.module.css";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}) {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginations}>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className={`${styles.icon} ${styles.chevronLeft}`}></span>
        </button>
        {Array.from({ length: 3 }, (_, i) => {
          const firstPage = Math.max(1, currentPage - 2)
          const page = firstPage + i
          return page <= totalPages ? (
            <button
              key={page}
              className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ) : null
        })}
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className={`${styles.icon} ${styles.chevronRight}`}></span>
        </button>
      </div>
    </div>
  );
}