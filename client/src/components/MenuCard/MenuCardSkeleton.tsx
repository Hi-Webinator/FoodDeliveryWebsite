import styles from './MenuCard.module.scss';

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

export default MenuCardSkeleton;
