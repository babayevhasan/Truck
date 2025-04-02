"use client"

import { useState } from "react"
import styles from "./FreightAnnouncements.module.css"

export default function FreightAnnouncements() {
  const [activeTab, setActiveTab] = useState("table")
  const [currentPage, setCurrentPage] = useState(1)

  // Örnek veri
  const freightData = [
    {
      id: 1,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çıxdır",
      status: "Ləğv",
    },
    {
      id: 2,
      fromLocation: "Moskva",
      fromCountry: "Rusiya",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çıxdır",
      status: "Blok",
    },
    {
      id: 3,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Soyuducu",
      status: "Ləğv",
    },
    {
      id: 4,
      fromLocation: "Moskva",
      fromCountry: "Rusiya",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çıxdır",
      status: "Aktiv",
    },
    {
      id: 5,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çıxdır",
      status: "Ləğv",
    },
    {
      id: 6,
      fromLocation: "Moskva",
      fromCountry: "Rusiya",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çıxdır",
      status: "Blok",
    },
    {
      id: 7,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Soyuducu",
      status: "Gözləmədə",
    },
    {
      id: 8,
      fromLocation: "Moskva",
      fromCountry: "Rusiya",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çıxdır",
      status: "Blok",
    },
    {
      id: 9,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Soyuducu",
      status: "Gözləmədə",
    },
    {
      id: 10,
      fromLocation: "Moskva",
      fromCountry: "Rusiya",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çıxdır",
      status: "Aktiv",
    },
    {
      id: 11,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Soyuducu",
      status: "Gözləmədə",
    },
    {
      id: 12,
      fromLocation: "Moskva",
      fromCountry: "Rusiya",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çıxdır",
      status: "Aktiv",
    },
    {
      id: 18,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Soyuducu",
      status: "Gözləmədə",
    },
  ]

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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.notifications}>
          <button className={styles.notificationButton}>
            <span className={`${styles.icon} ${styles.bell}`}></span>
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Yük maşın elanları</h1>

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

        <div className={styles.filterContainer}>
          <div className={styles.selectWrapper}>
            <select className={styles.select}>
              <option>Status seç</option>
              <option>Aktiv</option>
              <option>Ləğv</option>
              <option>Blok</option>
              <option>Gözləmədə</option>
            </select>
            <span className={`${styles.icon} ${styles.chevronDown}`}></span>
          </div>
        </div>

        {activeTab === "table" && (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Haradan</th>
                  <th>Haradan tarix</th>
                  <th>Haraya</th>
                  <th>Haraya tarix</th>
                  <th>Növü</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {freightData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {item.fromLocation}, {item.fromCountry}
                    </td>
                    <td>
                      <div className={styles.dateCell}>
                        <span className={`${styles.icon} ${styles.calendar}`}></span>
                        {item.fromDate}
                      </div>
                    </td>
                    <td>
                      {item.toLocation}, {item.toCountry}
                    </td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "cards" && (
          <div className={styles.cardsContainer}>
            {/* Kart */}
            <div className={styles.card}>Kart görünümü henüz uygulanmadı</div>
          </div>
        )}

        <div className={styles.pagination}>
          <button className={styles.paginationButton}>
            <span className={`${styles.icon} ${styles.chevronLeft}`}></span>
          </button>

          <div className={styles.pageNumbers}>
            <button className={`${styles.pageNumber} ${styles.activePage}`}>1</button>
            {[2, 3, 4, 5].map((page) => (
              <button key={page} className={styles.pageNumber}>
                {page}
              </button>
            ))}
            <span className={styles.ellipsis}>...</span>
            <button className={styles.pageNumber}>21</button>
          </div>

          <button className={styles.paginationButton}>
            <span className={`${styles.icon} ${styles.chevronRight}`}></span>
          </button>
        </div>
      </div>
    </div>
  )
}

