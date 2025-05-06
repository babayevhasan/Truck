"use client"

import { useState } from 'react';
import styles from '../Edit/EditModal.module.css';

export default function EditModal({ 
  item, 
  onClose, 
  onSave 
}) {
  const [editedData, setEditedData] = useState({
    id: item.id,
    fromLocation: item.fromLocation,
    fromCountry: item.fromCountry,
    fromDate: item.fromDate,
    toLocation: item.toLocation,
    toCountry: item.toCountry,
    toDate: item.toDate,
    type: item.type,
    status: item.status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status) => {
    setEditedData(prev => ({ ...prev, status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedData);
    onClose();
  };

  const statusOptions = ["Aktiv", "Ləğv", "Blok", "Gözləmədə"];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Elanı Redaktə et</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Haradan (Şəhər):</label>
              <input
                type="text"
                name="fromLocation"
                value={editedData.fromLocation}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Haradan (Ölkə):</label>
              <input
                type="text"
                name="fromCountry"
                value={editedData.fromCountry}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Haraya (Şəhər):</label>
              <input
                type="text"
                name="toLocation"
                value={editedData.toLocation}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Haraya (Ölkə):</label>
              <input
                type="text"
                name="toCountry"
                value={editedData.toCountry}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Üsul tarixi:</label>
              <input
                type="date"
                name="fromDate"
                value={editedData.fromDate}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Varış tarixi:</label>
              <input
                type="date"
                name="toDate"
                value={editedData.toDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Yük növü:</label>
              <input
                type="text"
                name="type"
                value={editedData.type}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Status:</label>
              <div className={styles.statusButtons}>
                {statusOptions.map(status => (
                  <button
                    key={status}
                    type="button"
                    className={`${styles.statusButton} ${
                      editedData.status === status ? styles[`status${status}`] : ''
                    }`}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.modalButtons}>
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
  );
}