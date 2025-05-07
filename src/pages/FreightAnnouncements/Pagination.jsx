import styles from "./FreightAnnouncements.module.css";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}) {
  const getPageRange = () => {
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(3, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - 2);
    }

    return [startPage, endPage];
  };

  const [startPage, endPage] = getPageRange();

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

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
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
