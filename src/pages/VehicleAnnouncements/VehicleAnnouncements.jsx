"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./VehicleAnnouncements.module.css"
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import BellIcon from '../../assets/icons/bell.svg?react';



const ChevronLeftIcon = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
export default function VehicleAnnouncements() {
  const [activeTab, setActiveTab] = useState("table")
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const vehicleData = [
    {
      id: 1,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Tankerli",
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
      type: "Yük maşını",
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
      type: "Tankerli",
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
      type: "Yük maşını",
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
      type: "Tankerli",
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
      type: "Tankerli",
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
      type: "Tankerli",
      status: "Aktiv",
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

  const handleRowClick = (id) => {
    navigate(`/vehicle-announcements/${id}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.notifications}>
          <button className={styles.notificationButton}>
            <BellIcon />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Yük maşını elanları</h1>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "table" ? styles.activeTab : ""}`}onClick={() => setActiveTab("table")}>
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
            <ChevronDownIcon />
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
                {vehicleData.map((item) => (
                  <tr key={item.id} onClick={() => handleRowClick(item.id)} className={styles.tableRow}>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className={styles.pagination}>
          <button className={styles.paginationButton}>
            <ChevronLeftIcon />
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
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

