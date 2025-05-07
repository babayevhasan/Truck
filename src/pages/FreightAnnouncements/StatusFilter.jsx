import { useState, useRef, useEffect } from "react";
import styles from "./FreightAnnouncements.module.css";

const statusOptions = ["Status seç", "Aktiv", "Ləğv", "Blok", "Gözləmədə"];

export default function StatusFilter({
  selectedStatus,
  setSelectedStatus,
  setCurrentPage,
  currentPage, 
}) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [data, setData] = useState([]); 
  const selectRef = useRef(null);

  useEffect(() => {
    const savedData = localStorage.getItem("freightData");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData([]); 
    }
  }, []);

  const handleAddNewFreight = (newFreight) => {
    const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    const updatedData = [...data, { id: newId, ...newFreight }];
    setData(updatedData);
    localStorage.setItem("freightData", JSON.stringify(updatedData));
  };

  const handleViewDetails = () => {
    navigate("/vehicle-announcements/:id");
  };

  const filteredData =
    selectedStatus === "Status seç"
      ? data
      : data.filter((item) => item.status === selectedStatus);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedStatus(option);
    setCurrentPage(1);
    setIsSelectOpen(false);
  };

  return (
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
  );
}
