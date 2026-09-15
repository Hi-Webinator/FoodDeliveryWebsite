import React from 'react';
import PropTypes from 'prop-types';

import { CATEGORY_FILTERS } from '../../constants/categories';
import styles from './Menu.module.scss';

/**
 * Category chips above the menu grid.
 *
 * TS: `interface MenuFiltersProps { active: string; onChange: (id: string) => void }`
 */
const MenuFilters = ({ active, onChange }) => (
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

MenuFilters.propTypes = {
  /** Currently selected category id, or 'all'. */
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(MenuFilters);
