import React from 'react';
import PropTypes from 'prop-types';

import styles from './FooterLinkList.module.scss';

/**
 * One titled column of footer links.
 *
 * TS: `interface FooterLinkListProps { title: string; items: string[] }`
 * TS: (redesign) optional `onSelect?: (item: string) => void` — when given,
 *     items render as buttons (used for the smooth-scroll quick links).
 */
const FooterLinkList = ({ title, items, onSelect = undefined }) => (
  <nav className={styles.column} aria-label={title}>
    <h3 className={styles.column__title}>{title}</h3>
    <ul className={styles.column__list}>
      {items.map((item) => (
        // Labels are unique within a column, so they are stable keys here.
        <li key={item}>
          {onSelect ? (
            <button type="button" className={styles.column__link} onClick={() => onSelect(item)}>
              {item}
            </button>
          ) : (
            <span className={styles.column__text}>{item}</span>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

FooterLinkList.propTypes = {
  /** Column heading. */
  title: PropTypes.string.isRequired,
  /** Link labels, rendered in order. */
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Makes each item a button and receives its label on click. */
  onSelect: PropTypes.func,
};

export default React.memo(FooterLinkList);
