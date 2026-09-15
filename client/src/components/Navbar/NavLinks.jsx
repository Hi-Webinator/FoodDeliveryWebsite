import React from 'react';
import PropTypes from 'prop-types';

import styles from './Navbar.module.scss';

/**
 * Smooth-scroll navigation links. Rendered as buttons rather than anchors so
 * the URL hash never changes — this is a single page with no routing.
 *
 * TS: `interface NavLinksProps { links: NavLink[]; activeId: string;
 *      onNavigate: (id: string) => void }`
 */
const NavLinks = ({ links, activeId = '', onNavigate }) => (
  <ul className={styles.links}>
    {links.map(({ id, label }) => (
      <li key={id}>
        <button
          type="button"
          onClick={() => onNavigate(id)}
          className={`${styles.link} ${activeId === id ? styles['link--active'] : ''}`}
          aria-current={activeId === id ? 'true' : undefined}
        >
          {label}
        </button>
      </li>
    ))}
  </ul>
);

NavLinks.propTypes = {
  /** Section targets rendered in order. */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /** Id of the section currently in view. */
  activeId: PropTypes.string,
  /** Called with a section id when a link is clicked. */
  onNavigate: PropTypes.func.isRequired,
};


export default NavLinks;
