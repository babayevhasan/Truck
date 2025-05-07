"use client"
import React from "react"
import styles from "./AddModal.module.css"

export default function AddModal({ isOpen, onClose, onAdd }) {
  const [newFreight, setNewFreight] = React.useState({
    fromLocation: "",
    fromCountry: "",
    toLocation: "",
    toCountry: "",
    fromDate: "",
    toDate: "",
    type: "",
    status: "Aktiv"
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(newFreight)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Yeni Yük İlanı</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Haradan</label>
            <input
              type="text"
              value={newFreight.fromLocation}
              onChange={(e) => setNewFreight({ ...newFreight, fromLocation: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ölkə</label>
            <input
              type="text"
              value={newFreight.fromCountry}
              onChange={(e) => setNewFreight({ ...newFreight, fromCountry: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Tarix</label>
            <input
              type="text"
              value={newFreight.fromDate}
              onChange={(e) => setNewFreight({ ...newFreight, fromDate: e.target.value })}
              placeholder="GG.AA.İL"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Haraya</label>
            <input
              type="text"
              value={newFreight.toLocation}
              onChange={(e) => setNewFreight({ ...newFreight, toLocation: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ölkə</label>
            <input
              type="text"
              value={newFreight.toCountry}
              onChange={(e) => setNewFreight({ ...newFreight, toCountry: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Tarix</label>
            <input
              type="text"
              value={newFreight.toDate}
              onChange={(e) => setNewFreight({ ...newFreight, toDate: e.target.value })}
              placeholder="GG.AA.İL"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Növ</label>
            <input
              type="text"
              value={newFreight.type}
              onChange={(e) => setNewFreight({ ...newFreight, type: e.target.value })}
              required
            />
          </div>
          <div className={styles.modalButtons}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Ləğv et
            </button>
            <button type="submit" className={styles.saveButton}>
              Əlavə et
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}