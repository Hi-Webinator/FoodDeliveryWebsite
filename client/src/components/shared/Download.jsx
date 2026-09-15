import React from 'react';
import PropTypes from 'prop-types';

import styles from './Download.module.scss';

/**
 * App-store download pill shown in the hero and the footer.
 *
 * TS: `interface DownloadProps { logo: string; alt: string; top: string; down: string }`
 */
const Download = ({ logo, alt, top, down, tone = 'light' }) => (
  <div className={`${styles.download} ${tone === 'dark' ? styles['download--dark'] : ''}`}>
    <img className={styles.download__logo} src={logo} alt={alt} />
    <span className={styles.download__text}>
      <span className={styles.download__caption}>{top}</span>
      <span className={styles.download__store}>{down}</span>
    </span>
  </div>
);

Download.propTypes = {
  /** Store badge image. */
  logo: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  /** Small caption, e.g. 'Download on the'. */
  top: PropTypes.string.isRequired,
  /** Store name, e.g. 'App Store'. */
  down: PropTypes.string.isRequired,
  /** 'dark' when the pill sits on a dark surface (footer). */
  tone: PropTypes.oneOf(['light', 'dark']),
};

export default Download;
