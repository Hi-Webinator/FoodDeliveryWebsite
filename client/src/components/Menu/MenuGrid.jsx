import React from 'react';
import PropTypes from 'prop-types';

import MenuCard from '../MenuCard/MenuCard';
import styles from './Menu.module.scss';

/**
 * Responsive grid of dishes: one column on phones, two on tablets, three up.
 *
 * TS: `interface MenuGridProps { items: MenuItem[];
 *      quantities: Record<string, number>; onAdd: (item: MenuItem) => void }`
 */
const MenuGrid = ({ items, quantities, onAdd }) => (
  <div className={styles.grid}>
    {items.map((item) => (
      <div key={item.id} className={styles.grid__cell}>
        <MenuCard item={item} quantity={quantities[item.id] ?? 0} onAdd={onAdd} />
      </div>
    ))}
  </div>
);

MenuGrid.propTypes = {
  // TS: type this prop as `MenuItem[]`
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Cart quantity per menu-item id. */
  quantities: PropTypes.objectOf(PropTypes.number).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default React.memo(MenuGrid);
