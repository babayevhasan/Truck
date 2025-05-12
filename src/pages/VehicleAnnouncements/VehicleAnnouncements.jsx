import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VehicleAnnouncements.module.css";
import vehicleData from './vehicleData.json';
import EditModal from '../FreightAnnouncements/Edit/EditModal';
import { StatusFilter } from "../VehicleAnnouncements/StatusFilter";
import { VehicleTable } from "../VehicleAnnouncements/VehicleTable";
import { Pagination } from "../VehicleAnnouncements/Pagination";
import Header from "../FreightAnnouncements/Header";


const statusOptions = ["Status seç", "Aktiv", "Ləğv", "Blok", "Gözləmədə"];

export default function VehicleAnnouncements() {
  const [activeTab, setActiveTab] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status seç");
  const [data, setData] = useState(vehicleData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const selectRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('vehicleData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  const toggleSelect = () => setIsSelectOpen(!isSelectOpen);
  
  const handleSelectOption = (option) => {
    setSelectedStatus(option);
    setIsSelectOpen(false);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    localStorage.setItem('vehicleData', JSON.stringify(updatedData));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleSave = (editedItem) => {
    const updatedData = data.map(item => 
      item.id === editedItem.id ? editedItem : item
    );
    setData(updatedData);
    localStorage.setItem('vehicleData', JSON.stringify(updatedData));
    setIsEditModalOpen(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Ləğv": return styles.statusCancel;
      case "Blok": return styles.statusBlock;
      case "Aktiv": return styles.statusActive;
      case "Gözləmədə": return styles.statusPending;
      default: return "";
    }
  };

  const filteredData = selectedStatus === "Status seç" 
    ? data 
    : data.filter((item) => item.status === selectedStatus);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
  };
  return (
    <div className={styles.container}>
         <Header />
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
          <StatusFilter
            selectedStatus={selectedStatus}
            statusOptions={statusOptions}
            isSelectOpen={isSelectOpen}
            toggleSelect={toggleSelect}
            handleSelectOption={handleSelectOption}
            selectRef={selectRef}
          />
        </div>
        {activeTab === "table" && (
          <VehicleTable
            currentItems={currentItems}
            getStatusClass={getStatusClass}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {isEditModalOpen && (
        <EditModal
          item={editingItem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}