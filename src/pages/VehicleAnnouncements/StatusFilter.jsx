import { ChevronDownIcon } from "../VehicleAnnouncements/ChevronIcons";
import styles from "./VehicleAnnouncements.module.css"

export const StatusFilter = ({
  selectedStatus,
  statusOptions,
  isSelectOpen,
  toggleSelect,
  handleSelectOption,
  selectRef
}) => {
  return (
    <div className={styles.customSelectWrapper} ref={selectRef}>
      <div
        className={`${styles.customSelect} ${isSelectOpen ? styles.customSelectOpen : ""}`}
        onClick={toggleSelect}
      >
        <span className={styles.customSelectText}>{selectedStatus}</span>
        <ChevronDownIcon className={`${styles.icon} ${isSelectOpen ? styles.rotate : ""}`} />
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
};