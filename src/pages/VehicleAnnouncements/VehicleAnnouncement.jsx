"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./VehicleAnnouncement.module.css"
import Modal from "../../components/ui/Modal/Modal"
import freightData from '../FreightAnnouncements/freightData.json'

import BackIcon from '../../assets/icons/back.svg?react';
import BlockIcon from '../../assets/icons/block.svg?react';
import CancelIcon from '../../assets/icons/cancel.svg?react';
import CheckIcon from '../../assets/icons/check.svg?react';
import Header from "../FreightAnnouncements/Header";

export default function VehicleAnnouncement() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false)
  const [reasons, setReasons] = useState([{ id: 1, value: "" }])
  const [setWindowWidth] = useState(window.innerWidth)
  const [currentFreight, setCurrentFreight] = useState(null)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)

    const freight = freightData.find(item => item.id === parseInt(id))
    setCurrentFreight(freight)

    return () => window.removeEventListener("resize", handleResize)
  }, [id])

  // const handleBack = () => navigate("/vehicle-announcements")
  const handleAddReason = () => setReasons([...reasons, { id: reasons.length + 1, value: "" }])

  const handleReasonChange = (id, value) => {
    setReasons(reasons.map(reason =>
      reason.id === id ? { ...reason, value } : reason
    ))
  }

  if (!currentFreight) return <div className={styles.loading}>Yükleniyor...</div>

  return (
    <div className={styles.container}>
   
        <Header />

      <div className={styles.content}>
        <div className={styles.titleSection}>
          <button className={styles.backButton} onClick={() => navigate("/freight-announcements")}>
            <BackIcon />
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
          <h2 className={styles.sectionTitle}>Yük elanı haqqında:</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Başlangıç nöqtəsi:</span>
              <span className={styles.infoValue}>{currentFreight.fromLocation}, {currentFreight.fromCountry}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Çatdırılma nöqtəsi:</span>
              <span className={styles.infoValue}>{currentFreight.toLocation}, {currentFreight.toCountry}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Yükləmə tarixi:</span>
              <span className={styles.infoValue}>{currentFreight.fromDate}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Çatdırılma tarixi:</span>
              <span className={styles.infoValue}>{currentFreight.toDate}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Yük növü:</span>
              <span className={styles.infoValue}>{currentFreight.type}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status:</span>
              <span className={styles.infoValue}>{currentFreight.status}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Yük maşını haqqında:</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Markası:</span>
              <span className={styles.infoValue}>DAF</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Yük maşınının növü:</span>
              <span className={styles.infoValue}>Tankerli</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Daşıyıcının növü:</span>
              <span className={styles.infoValue}>Arxa</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Yük tutumu:</span>
              <span className={styles.infoValue}>13 ton</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Həcmi:</span>
              <span className={styles.infoValue}>93  m³</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Uzunluğu:</span>
              <span className={styles.infoValue}>7.1  m</span>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Elanı ləğv etmə səbəbini qeyd edin"
      >
        <div className={styles.modalContent}>
          <h3 className={styles.modalSubtitle}>Yük elanı #{currentFreight.id}</h3>

          {reasons.map((reason) => (
            <div key={reason.id} className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={reason.value}
                onChange={(e) => handleReasonChange(reason.id, e.target.value)}
              >
                <option value="" disabled>Səbəbi qeyd et</option>
                <option value="reason1">Yanlış məlumat</option>
                <option value="reason2">Qadağan olunmuş məhsul</option>
                <option value="reason3">Digər səbəb</option>
              </select>
            </div>
          ))}

          <button className={styles.addReasonButton} onClick={handleAddReason}>
            <span>Yenisini əlavə et</span>
          </button>

          <div className={styles.modalActions}>
            <button className={styles.modalCancelButton} onClick={() => setIsCancelModalOpen(false)}>
              Ləğv et
            </button>
            <button className={styles.modalConfirmButton} onClick={() => setIsCancelModalOpen(false)}>
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
            </div>
          ))}
          <button className={styles.addReasonButton} onClick={handleAddReason}>
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