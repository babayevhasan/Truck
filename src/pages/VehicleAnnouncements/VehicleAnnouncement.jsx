"use client"

import { useNavigate } from "react-router-dom"
import styles from "./VehicleAnnouncement.module.css"

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

const BellIcon = () => (
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
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const BlockIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
)

const CancelIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)

const CheckIcon = () => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const LocationIcon = () => (
  <svg
    className={styles.locationIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const TruckIcon = () => (
  <svg
    className={styles.truckIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

export default function VehicleAnnouncement() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate("/vehicle-announcements")
  }

  // masin bilgileri
  const vehicleInfo = {
    marka: "DAF",
    type: "Tankerli",
    carrierType: "Arxa",
    capacity: "13 ton",
    volume: "93 m³",
    length: "7.1 m",
    width: "5 m",
    height: "7 m",
  }

  // dasinma noqtesi bilgileri
  const transportRoutes = [
    {
      startDate: "12.12.2024",
      startLocation: "Bakı, Azərbaycan",
      endDate: "15.12.2024",
      endLocation: "Bakı, Azərbaycan",
    },
    {
      startDate: "15.12.2024",
      startLocation: "Bakı, Azərbaycan",
      endDate: "15.12.2024",
      endLocation: "Bakı, Azərbaycan",
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.navigationButtons}>
          <button className={styles.navButton}>
            <ChevronLeftIcon />
          </button>
          <button className={styles.navButton}>
            <ChevronRightIcon />
          </button>
        </div>
        <div className={styles.notifications}>
          <button className={styles.notificationButton}>
            <BellIcon />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleSection}>
          <button className={styles.backButton} onClick={handleBack}>
            <ChevronLeftIcon />
            <span>Elan haqqında</span>
          </button>

          <div className={styles.actionButtons}>
            <button className={styles.blockButton}>
              <BlockIcon />
              <span>Elanı blokla</span>
            </button>
            <button className={styles.cancelButton}>
              <CancelIcon />
              <span>Elanı ləğv et</span>
            </button>
            <button className={styles.approveButton}>
              <CheckIcon />
              <span>Elanı təsdiq et</span>
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Yük maşını haqqında:</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Markası:</span>
              <span className={styles.infoValue}>{vehicleInfo.marka}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Yük maşınının növü:</span>
              <span className={styles.infoValue}>{vehicleInfo.type}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Daşıyıcının növü:</span>
              <span className={styles.infoValue}>{vehicleInfo.carrierType}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Yük tutumu:</span>
              <span className={styles.infoValue}>{vehicleInfo.capacity}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Həcmi:</span>
              <span className={styles.infoValue}>{vehicleInfo.volume}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Uzunluğu:</span>
              <span className={styles.infoValue}>{vehicleInfo.length}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Eni:</span>
              <span className={styles.infoValue}>{vehicleInfo.width}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Hündürlüyü:</span>
              <span className={styles.infoValue}>{vehicleInfo.height}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Daşınma ölkələri:</h2>
          <div className={styles.routesContainer}>
            {transportRoutes.map((route, index) => (
              <div key={index} className={styles.routeItem}>
                <div className={styles.routePoint}>
                  <LocationIcon />
                  <div className={styles.routeInfo}>
                    <div className={styles.routeDate}>{route.startDate}</div>
                    <div className={styles.routeLocation}>{route.startLocation}</div>
                  </div>
                </div>

                <div className={styles.routeArrow}>
                  <TruckIcon />
                </div>

                <div className={styles.routePoint}>
                  <LocationIcon />
                  <div className={styles.routeInfo}>
                    <div className={styles.routeDate}>{route.endDate}</div>
                    <div className={styles.routeLocation}>{route.endLocation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

