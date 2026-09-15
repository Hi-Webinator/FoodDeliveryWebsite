import React from 'react';

import { CATEGORY_FILTERS, type MenuCategory, ALL_CATEGORIES } from '../../constants/categories';
import styles from './Menu.module.scss';

interface MenuFiltersProps {
  /** Currently selected category id, or 'all'. */
  active: MenuCategory | typeof ALL_CATEGORIES;
  onChange: (id: MenuCategory | typeof ALL_CATEGORIES) => void;
}

/**
 * Category chips above the menu grid.
 */
const MenuFilters = ({ active, onChange }: MenuFiltersProps) => (
  <div className={styles.filters} role="group" aria-label="Filter menu by category">
    {CATEGORY_FILTERS.map(({ id, label, emoji }) => (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        aria-pressed={active === id}
        className={`${styles.filters__chip} ${
          active === id ? styles['filters__chip--active'] : ''
        }`}
      >
        <span aria-hidden="true">{emoji}</span>
        {label}
      </button>
    ))}
  </div>
);

export default React.memo(MenuFilters);
