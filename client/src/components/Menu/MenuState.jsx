import React from 'react';
import PropTypes from 'prop-types';

import styles from './Menu.module.scss';

/**
 * Shared presentation for the menu's loading, error and empty states.
 *
 * TS: `interface MenuStateProps { icon: string; title: string; text?: string;
 *      actionLabel?: string; onAction?: () => void }`
 */
const MenuState = ({ icon, title, text = '', actionLabel = '', onAction = undefined }) => (
  <div className={styles.state} role="status">
    <span className={styles.state__icon} aria-hidden="true">
      {icon}
    </span>
    <p className={styles.state__title}>{title}</p>
    {text ? <p className={styles.state__text}>{text}</p> : null}
    {actionLabel && onAction ? (
      <button type="button" className={styles.state__action} onClick={onAction}>
        {actionLabel}
      </button>
    ) : null}
  </div>
);

MenuState.propTypes = {
  /** Decorative emoji shown above the message. */
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  /** Renders a button when paired with `onAction`. */
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
};


export default MenuState;
