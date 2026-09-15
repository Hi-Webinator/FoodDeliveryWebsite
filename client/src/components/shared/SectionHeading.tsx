import styles from './SectionHeading.module.scss';

interface SectionHeadingProps {
  /** Leading, un-highlighted part of the heading. */
  title: string;
  /** Rendered in the brand color. */
  highlight?: string;
  /** Supporting line below the heading. */
  subtitle?: string;
  /** Text after the highlighted portion. */
  trailing?: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
}

const SectionHeading = ({
  title,
  highlight = '',
  subtitle = '',
  trailing = '',
  eyebrow = '',
}: SectionHeadingProps) => (
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

export default SectionHeading;
