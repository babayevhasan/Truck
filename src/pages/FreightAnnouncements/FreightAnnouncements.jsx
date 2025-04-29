"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./FreightAnnouncements.module.css"
import TruckIcon from "../../assets/icons/truckorange.svg?react"
import Bell from "../../assets/icons/bell.svg?react"
import LeftNav from "../../assets/icons/leftnav.svg?react"
import RightNav from "../../assets/icons/rightnav.svg?react"
import freightData from '../FreightAnnouncements/freightData.json'

export default function FreightAnnouncements() {
  const [activeTab, setActiveTab] = useState("table")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("Status seç")
  const selectRef = useRef(null)


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

  const navItems = [
    { path: "/" },
    { path: "/configuration" },
    { path: "/freight-announcements" },
    { path: "/vehicle-announcements" },
    { path: "/messages" },
    { path: "/operators" },
    { path: "/users" },
    { path: "/transactions" },
  ]

  const navigate = useNavigate()

  const handleNavigation = (direction) => {
    const currentIndex = navItems.findIndex(item =>
      location.pathname === item.path || location.pathname.startsWith(item.path + "/")
    )

    let targetIndex = currentIndex

    if (direction === "next" && targetIndex < navItems.length - 1) {
      targetIndex += 1
    } else if (direction === "prev" && targetIndex > 0) {
      targetIndex -= 1
    }

    if (targetIndex >= 0 && targetIndex < navItems.length) {
      navigate(navItems[targetIndex].path)
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.header}>

        <div className={styles.backornext}>
          <button onClick={() => handleNavigation("prev")}>
            <LeftNav />
          </button>
          <button onClick={() => handleNavigation("next")}>
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
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className={`${styles.icon} ${styles.chevronLeft}`}></span>
            </button>

            {Array.from({ length: 3 }, (_, i) => {
              const firstPage = Math.max(1, currentPage - 2);
              const page = firstPage + i;
              return page <= totalPages ? (
                <button
                  key={page}
                  className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ) : null;
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


      </div>
    </div>
  )
}
