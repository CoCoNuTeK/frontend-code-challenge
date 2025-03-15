import React, { useState } from 'react';
import styles from './FilterDropdown.module.scss';

interface FilterDropdownProps {
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
  availableTypes: string[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  selectedTypes, 
  onTypeChange, 
  availableTypes 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onTypeChange(newTypes);
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Type</span>
        <svg 
          className={`${styles.arrow} ${isOpen ? styles.open : ''}`} 
          width="12" 
          height="8" 
          viewBox="0 0 12 8" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        {selectedTypes.length > 0 && (
          <span className={styles.badge}>{selectedTypes.length}</span>
        )}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {availableTypes.map(type => (
            <label key={type} className={styles.option}>
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeToggle(type)}
                className={styles.checkbox}
              />
              <span className={styles.label}>{type}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown; 