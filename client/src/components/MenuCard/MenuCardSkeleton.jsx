import React from 'react';

import styles from './MenuCard.module.scss';

/**
 * Loading placeholder with the same footprint as MenuCard, so the grid does
 * not jump when the real dishes arrive.
 *
 * TS: this component takes no props — no interface needed.
 */
const MenuCardSkeleton = () => (
  <div className={`${styles.card} ${styles['card--skeleton']}`} aria-hidden="true">
    <div className={`${styles.card__media} ${styles.skeleton}`} />
    <div className={styles.card__body}>
      <span className={`${styles.skeleton} ${styles['skeleton--title']}`} />
      <span className={`${styles.skeleton} ${styles['skeleton--line']}`} />
      <span className={`${styles.skeleton} ${styles['skeleton--line-short']}`} />
      <div className={styles.card__footer}>
        <span className={`${styles.skeleton} ${styles['skeleton--price']}`} />
        <span className={`${styles.skeleton} ${styles['skeleton--button']}`} />
      </div>
    </div>
  </div>
);

MenuCardSkeleton.propTypes = {};

export default MenuCardSkeleton;
