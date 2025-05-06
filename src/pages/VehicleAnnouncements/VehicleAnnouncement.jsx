"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./VehicleAnnouncement.module.css"
import Modal from "../../components/ui/Modal/Modal"
import BellIcon from '../../assets/icons/bell.svg?react';
import BlockIcon from '../../assets/icons/block.svg?react';
import CancelIcon from '../../assets/icons/cancel.svg?react';
import CheckIcon from '../../assets/icons/check.svg?react';
import Back from '../../assets/icons/back.svg?react';
import freightData from '../FreightAnnouncements/freightData.json'

// import TruckIcon from '../../assets/icons/truckabout.svg?react';
// import LocationIcon from '../../assets/icons/location.svg?react';

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

const PlusIcon = () => (
  <svg
    className={styles.plusIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function VehicleAnnouncement() {
  const navigate = useNavigate()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false)
  const [reasons, setReasons] = useState([{ id: 1, value: "" }])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleBack = () => {
    navigate("/vehicle-announcements")
  }

  const handleAddReason = () => {
    setReasons([...reasons, { id: reasons.length + 1, value: "" }])
  }

  const handleReasonChange = (id, value) => {
    const updatedReasons = reasons.map((reason) => (reason.id === id ? { ...reason, value } : reason))
    setReasons(updatedReasons)
  }

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
            <Back />
            <span> Elan haqqında</span>
          </button>
          <div className={styles.actionButtons}>
            <button className={styles.blockButton} onClick={() => setIsBlockModalOpen(true)}>
              <BlockIcon />
              <span>Elanı blokla</span>
            </button>
            <button className={styles.cancelButton} onClick={() => setIsCancelModalOpen(true)}>
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

        {/* <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Daşınma əlkələri:</h2>
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
        </div> */}
      </div>
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Elanı ləğv etmə səbəbini qeyd edin"
      >
        <div className={styles.modalContent}>
          <h3 className={styles.modalSubtitle}>Yük elanı</h3>

          {reasons.map((reason) => (
            <div key={reason.id} className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={reason.value}
                onChange={(e) => handleReasonChange(reason.id, e.target.value)}
              >
                <option value="" disabled>
                  Səbəbi qeyd et
                </option>
                <option value="reason1">Yanlış məlumat</option>
                <option value="reason2">Qadağan olunmuş məhsul</option>
                <option value="reason3">Digər səbəb</option>
              </select>
              <ChevronDownIcon />
            </div>
          ))}

          <button className={styles.addReasonButton} onClick={handleAddReason}>
            <PlusIcon />
            <span>Yenisini əlavə et</span>
          </button>

          <div className={styles.modalActions}>
            <button className={styles.modalCancelButton} onClick={() => setIsCancelModalOpen(false)}>
              Ləğv et
            </button>
            <button
              className={styles.modalConfirmButton}
              onClick={() => {
                setIsCancelModalOpen(false)
              }}
            >
              Təsdiq et
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        title="Elanı bloklama səbəbini qeyd edin"
      >
        <div className={styles.modalContent}>
          <h3 className={styles.modalSubtitle}>Yük elanı</h3>

          {reasons.map((reason) => (
            <div key={reason.id} className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={reason.value}
                onChange={(e) => handleReasonChange(reason.id, e.target.value)}
              >
                <option value="" disabled>
                  Səbəbi qeyd et
                </option>
                <option value="reason1">Yanlış məlumat</option>
                <option value="reason2">Qadağan olunmuş məhsul</option>
                <option value="reason3">Digər səbəb</option>
              </select>
              <ChevronDownIcon />
            </div>
          ))}

          <button className={styles.addReasonButton} onClick={handleAddReason}>
            <PlusIcon />
            <span>Yenisini əlavə et</span>
          </button>

          <div className={styles.modalActions}>
            <button className={styles.modalCancelButton} onClick={() => setIsBlockModalOpen(false)}>
              Ləğv et
            </button>
            <button
              className={styles.modalConfirmButton}
              onClick={() => {
                setIsBlockModalOpen(false)
              }}
            >
              Təsdiq et
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
