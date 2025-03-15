import React from 'react';
import styles from './ControlsBar.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import ViewToggle from '../ViewToggle/ViewToggle';

interface ControlsBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
  availableTypes: string[];
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

const ControlsBar: React.FC<ControlsBarProps> = ({
  searchValue,
  onSearchChange,
  selectedTypes,
  onTypeChange,
  availableTypes,
  view,
  onViewChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.searchSection}>
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search Pokemon..."
          />
        </div>
        <div className={styles.filterSection}>
          <FilterDropdown
            selectedTypes={selectedTypes}
            onTypeChange={onTypeChange}
            availableTypes={availableTypes}
          />
        </div>
        <div className={styles.toggleSection}>
          <ViewToggle view={view} onViewChange={onViewChange} />
        </div>
      </div>
    </div>
  );
};

export default ControlsBar; 