import React from 'react';
import PropTypes from 'prop-types';

import styles from './SectionHeading.module.scss';

/**
 * The title + subtitle pair every section on the homepage already uses.
 * `highlight` renders in the brand red, matching the existing `.title span`.
 *
 * TS: `interface SectionHeadingProps { title: string; highlight?: string;
 *      subtitle?: string; trailing?: string }`
 *
 * Redesign: renders an <h2> (the hero owns the page's only <h1>) and accepts
 * an optional small `eyebrow` label. TS: `eyebrow?: string`
 */
const SectionHeading = ({ title, highlight = '', subtitle = '', trailing = '', eyebrow = '' }) => (
  <header className={styles.heading}>
    {eyebrow ? <span className={styles.heading__eyebrow}>{eyebrow}</span> : null}
    <h2 className={styles.heading__title}>
      {title}
      {highlight ? <span className={styles.heading__highlight}> {highlight}</span> : null}
      {trailing ? ` ${trailing}` : null}
    </h2>
    {subtitle ? <p className={styles.heading__subtitle}>{subtitle}</p> : null}
  </header>
);

SectionHeading.propTypes = {
  /** Leading, un-highlighted part of the heading. */
  title: PropTypes.string.isRequired,
  /** Rendered in the brand color. */
  highlight: PropTypes.string,
  /** Supporting line below the heading. */
  subtitle: PropTypes.string,
  /** Text after the highlighted portion. */
  trailing: PropTypes.string,
  /** Small uppercase label above the title. */
  eyebrow: PropTypes.string,
};


export default SectionHeading;
