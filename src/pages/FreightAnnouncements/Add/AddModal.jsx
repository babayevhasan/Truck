"use client"
import React, { useState } from "react"
import styles from "./AddModal.module.css"

export default function AddModal({ isOpen, onClose, onAdd }) {
  const [newFreight, setNewFreight] = useState({
    fromLocation: "",
    fromCountry: "",
    toLocation: "",
    toCountry: "",
    fromDate: "",
    toDate: "",
    type: "",
    status: "Aktiv"
  })

  const statusOptions = ["Aktiv", "Ləğv", "Blok", "Gözləmədə"]

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(newFreight)
    onClose()
  }

  const handleStatusChange = (status) => {
    setNewFreight({ ...newFreight, status })
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Yeni Yük Elanı</h2>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div>
            <label>Haradan (Şəhər):</label>
            <input
              type="text"
              value={newFreight.fromLocation}
              onChange={(e) => setNewFreight({ ...newFreight, fromLocation: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Haradan (Ölkə):</label>
            <input
              type="text"
              value={newFreight.fromCountry}
              onChange={(e) => setNewFreight({ ...newFreight, fromCountry: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Haraya (Şəhər):</label>
            <input
              type="text"
              value={newFreight.toLocation}
              onChange={(e) => setNewFreight({ ...newFreight, toLocation: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Haraya (Ölkə):</label>
            <input
              type="text"
              value={newFreight.toCountry}
              onChange={(e) => setNewFreight({ ...newFreight, toCountry: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Üsul tarixi:</label>
            <input
              type="date"
              value={newFreight.fromDate}
              onChange={(e) => setNewFreight({ ...newFreight, fromDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Varış tarixi:</label>
            <input
              type="date"
              value={newFreight.toDate}
              onChange={(e) => setNewFreight({ ...newFreight, toDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Yük növü:</label>
            <input
              type="text"
              value={newFreight.type}
              onChange={(e) => setNewFreight({ ...newFreight, type: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <div className={styles.statusButtons}>
              {statusOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`${styles.statusBtn} ${
                    newFreight.status === option ? styles.activeStatus : ""
                  }`}
                  onClick={() => handleStatusChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Ləğv et
            </button>
            <button type="submit" className={styles.saveButton}>
              Yadda saxla
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
