"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./VehicleAnnouncements.module.css"
import CalendarIcon from "../../assets/icons/calendar.svg?react"
import BellIcon from "../../assets/icons/bell.svg?react"
import LeftNav from "../../assets/icons/leftnav.svg?react"
import RightNav from "../../assets/icons/rightnav.svg?react"
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
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("Status seç")
  const selectRef = useRef(null)
  const navigate = useNavigate()

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
    setIsSelectOpen(false)
  }

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

  const filteredData =
    selectedStatus === "Status seç" ? vehicleData : vehicleData.filter((item) => item.status === selectedStatus)

  const itemsPerPage = 5

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backornext}>
          <button onClick={handlePrevPage}>
            <LeftNav />
          </button>
          <button onClick={handleNextPage}>
            <RightNav />
          </button>
        </div>
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
              <ChevronDownIcon className={`${isSelectOpen ? styles.rotate : ""}`} />
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
                  <th>Haradan tarix</th>
                  <th>Haraya</th>
                  <th>Haraya tarix</th>
                  <th>Növü</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
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
          <div className={styles.paginations}>
            <button className={styles.paginationButton} onClick={handlePrevPage}>
              <ChevronLeftIcon />
            </button>

            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`${styles.pageNumber} ${currentPage === index + 1 ? styles.activePage : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button className={styles.paginationButton} onClick={handleNextPage}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

