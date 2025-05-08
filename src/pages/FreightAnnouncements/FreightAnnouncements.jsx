import { useState, useEffect } from "react";
import styles from "./FreightAnnouncements.module.css";
import freightData from './freightData.json';
import EditModal from './Edit/EditModal';
import AddModal from './Add/AddModal';
import Header from "./Header";
import TabSwitcher from "./TabSwitcher";
import StatusFilter from "./StatusFilter";
import TableView from "./TableView";
import CardsView from "./CardsView";
import Pagination from "./Pagination";

export default function FreightAnnouncements() {
  const [activeTab, setActiveTab] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("Status seç");
  const [data, setData] = useState(freightData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('freightData');
    setData(savedData ? JSON.parse(savedData) : freightData);
  }, []);

  useEffect(() => {
    if (isEditModalOpen || isAddModalOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditModalOpen, isAddModalOpen]);

  const handleAddNewFreight = (newFreight) => {
    const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const updatedData = [...data, { id: newId, ...newFreight }];
    updateData(updatedData);
  };

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem('freightData', JSON.stringify(newData));
  };

  const filteredData = selectedStatus === "Status seç"
    ? data
    : data.filter(item => item.status === selectedStatus);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // CRUD operations
  const handleDelete = (id) => {
    updateData(data.filter(item => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleSave = (editedItem) => {
    updateData(data.map(item => item.id === editedItem.id ? editedItem : item));
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <h1 className={styles.title}>Yük elanları</h1>

        <TabSwitcher
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className={styles.filterContainer}>
          <StatusFilter
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            setCurrentPage={setCurrentPage}
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className={styles.addButton}
          >
            Əlavə et
          </button>
        </div>

        {activeTab === "table" ? (
          <TableView
            currentItems={currentItems}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : (
          <CardsView
            currentItems={currentItems}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {isEditModalOpen && (
        <EditModal
          item={editingItem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isAddModalOpen && (
        <AddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddNewFreight}
        />
      )}
    </div>
  );
}
