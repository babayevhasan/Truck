"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./VehicleAnnouncements.module.css"
import CalendarIcon from "../../assets/icons/calendar.svg?react"
import BellIcon from "../../assets/icons/bell.svg?react"
import LeftNav from "../../assets/icons/leftnav.svg?react"
import RightNav from "../../assets/icons/rightnav.svg?react"
import vehicleData from '../VehicleAnnouncements/vehicleData.json'
import EditModal from '../FreightAnnouncements/Edit/EditModal'
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
  const [data, setData] = useState(vehicleData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const selectRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedData = localStorage.getItem('vehicleData')
    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

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
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen)
  }
  const handleSelectOption = (option) => {
    setSelectedStatus(option)
    setIsSelectOpen(false)
  }
  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id)
    setData(updatedData)
    localStorage.setItem('vehicleData', JSON.stringify(updatedData))
  }
  const handleEdit = (item) => {
    setEditingItem(item)
    setIsEditModalOpen(true)
  }
  const handleSave = (editedItem) => {
    const updatedData = data.map(item => 
      item.id === editedItem.id ? editedItem : item
    )
    setData(updatedData)
    localStorage.setItem('vehicleData', JSON.stringify(updatedData))
    setIsEditModalOpen(false)
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
  const filteredData =
    selectedStatus === "Status seç" ? data : data.filter((item) => item.status === selectedStatus)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Profil", path: "/profile" },
    { label: "Seçim Konfiqurasiyası", path: "/configuration" },
    { label: "Yük elanları", path: "/freight-announcements" },
    { label: "Yük maşını elanları", path: "/vehicle-announcements" },
    { label: "Mesajlar", path: "/messages" },
    { label: "Operatorlar", path: "/operators" },
    { label: "İstifadəçilər", path: "/users" },
    { label: "Tranzaksiya", path: "/transactions" },
  ];

  const handleNavigation = (direction) => {
    const currentIndex = navItems.findIndex(item =>
      location.pathname === item.path || location.pathname.startsWith(item.path + "/")
    );

    let targetIndex = currentIndex;

    if (direction === "next" && targetIndex < navItems.length - 1) {
      targetIndex += 1;
    } else if (direction === "prev" && targetIndex > 0) {
      targetIndex -= 1;
    }

    if (targetIndex >= 0 && targetIndex < navItems.length) {
      navigate(navItems[targetIndex].path);
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
                            handleDelete(item.id);
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
                          Redaktə
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.pagination}>
          <div className={styles.paginations}>
            <button
              className={styles.paginationButton}
              onClick={() => setCurrentPage(currentPage - 1)}
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
              <span className={`${styles.icon} ${styles.chevronRight}`}><ChevronRightIcon /> </span>
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditModal
          item={editingItem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}