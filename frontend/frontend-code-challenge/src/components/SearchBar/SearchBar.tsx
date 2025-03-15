import React from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}


const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search Pokemon...' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circle of the magnifying glass */}
          <circle 
            cx="11" 
            cy="11" 
            r="8" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          {/* Handle of the magnifying glass */}
          <line 
            x1="16.5" 
            y1="16.5" 
            x2="21" 
            y2="21" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default SearchBar; 