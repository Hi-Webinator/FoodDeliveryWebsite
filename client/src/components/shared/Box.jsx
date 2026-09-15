import React from 'react';
import PropTypes from 'prop-types';

import styles from './Box.module.scss';

/**
 * The rounded icon card used by the category grid and the How It Works steps.
 *
 * TS: `interface BoxProps { logo: string; size: string; text: string; alt?: string }`
 */
const Box = ({ logo, size, text, alt = '' }) => (
  <div className={styles.box}>
    <div
      // `size` still picks the tile shape; the values now map to module classes.
      className={`${styles.box__icon} ${size === '50%' ? styles['box__icon--round'] : ''}`}
    >
      <img className={styles.box__image} src={logo} alt={alt || text} />
    </div>
    <h2 className={styles.box__label}>{text}</h2>
  </div>
);

Box.propTypes = {
  /** Imported image URL for the icon. */
  logo: PropTypes.string.isRequired,
  /** Border-radius of the icon tile, e.g. '50%' or '16px'. */
  size: PropTypes.string.isRequired,
  /** Caption below the icon. */
  text: PropTypes.string.isRequired,
  /** Overrides the alt text; defaults to `text`. */
  alt: PropTypes.string,
};


export default Box;
