import React from 'react';
import styles from './TabNavigation.module.scss';

interface TabNavigationProps {
  activeTab: 'all' | 'favorites';
  onTabChange: (tab: 'all' | 'favorites') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabWrapper}>
        <button 
          className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => onTabChange('all')}
        >
          All
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'favorites' ? styles.active : ''}`}
          onClick={() => onTabChange('favorites')}
        >
          Favorites
        </button>
      </div>
    </div>
  );
};

export default TabNavigation; 