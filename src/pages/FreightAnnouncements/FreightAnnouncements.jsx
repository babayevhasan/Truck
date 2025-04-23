"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./FreightAnnouncements.module.css"
import TruckIcon from "../../assets/icons/truckorange.svg?react"
import Bell from "../../assets/icons/bell.svg?react"
import LeftNav from "../../assets/icons/leftnav.svg?react"
import RightNav from "../../assets/icons/rightnav.svg?react"

export default function FreightAnnouncements() {
  const [activeTab, setActiveTab] = useState("table")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("Status seç")
  const selectRef = useRef(null)

  const freightData = [
    {
      id: 1,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çadırlı",
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
      type: "Çadırlı",
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
      type: "Soyuduculu",
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
      type: "Çadırlı",
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
      type: "Çadırlı",
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
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çadırlı",
      status: "Ləğv",
    },
    {
      id:11,
      fromLocation: "Moskva",
      fromCountry: "Rusiya",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Çadırlı",
      status: "Blok",
    },
    {
      id: 12,
      fromLocation: "Ankara",
      fromCountry: "Türkiye",
      fromDate: "12.12.2022",
      toLocation: "Bakı",
      toCountry: "Azərbaycan",
      toDate: "12.12.2022",
      type: "Soyuduculu",
      status: "Ləğv",
    },
  ]
  

const filteredData =
  selectedStatus === "Status seç"
    ? freightData
    : freightData.filter((item) => item.status === selectedStatus)

const itemsPerPage = 5
const totalPages = Math.ceil(filteredData.length / itemsPerPage)
const startIndex = (currentPage - 1) * itemsPerPage
const endIndex = startIndex + itemsPerPage
const currentItems = filteredData.slice(startIndex, endIndex)

const statusOptions = ["Status seç", "Aktiv", "Ləğv", "Blok", "Gözləmədə"]

useEffect(() => {
  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsSelectOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)
  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [])

const toggleSelect = () => {
  setIsSelectOpen(!isSelectOpen)
}

const handleSelectOption = (option) => {
  setSelectedStatus(option)
  setCurrentPage(1) 
  setIsSelectOpen(false)
}

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
        <div className={styles.backornext}>
          <button>
            <LeftNav />
          </button>
          <button>
            <RightNav />
          </button>
        </div>
        <div className={styles.notifications}>
          <button className={styles.notificationButton}>
            <Bell />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Yük elanları</h1>

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
          <div className={styles.customSelectWrapper} ref={selectRef}>
            <div
              className={`${styles.customSelect} ${isSelectOpen ? styles.customSelectOpen : ""}`}
              onClick={toggleSelect}
            >
              <span className={styles.customSelectText}>{selectedStatus}</span>
              <span className={`${styles.icon} ${styles.chevronDown} ${isSelectOpen ? styles.rotate : ""}`}></span>
            </div>
            {isSelectOpen && (
              <div className={styles.customSelectOptions}>
                {statusOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.customSelectOption} ${selectedStatus === option ? styles.customSelectOptionSelected : ""}`}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {activeTab === "table" && (
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
            {currentItems.map((item, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div
                    className={`${styles.statusBadge} ${item.status === "Aktiv"
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

                  <TruckIcon />
                  <div className={styles.routeLine}></div>
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
                  <button className={styles.detailsButton}>Detallarına bax</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.pagination}>
          <div className={styles.paginations}>
            <button
              className={styles.paginationButton}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className={`${styles.icon} ${styles.chevronLeft}`}></span>
            </button>

            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className={styles.paginationButton}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className={`${styles.icon} ${styles.chevronRight}`}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


