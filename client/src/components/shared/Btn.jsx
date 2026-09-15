import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Btn.module.scss';

/**
 * The pill CTA used across the homepage. `bg` stays a prop because the navbar
 * and the hero deliberately use two different brand reds.
 *
 * TS: `interface BtnProps { text: string; bg?: string; type?: 'button' | 'submit';
 *      onClick?: () => void; disabled?: boolean; className?: string }`
 *
 * Redesign: the inline `bg` color was replaced by token-driven `variant`s, so
 * no color lives in JSX any more. An optional trailing `icon` nudges on hover.
 * TS: `variant?: 'primary' | 'dark' | 'light'; size?: 'sm' | 'md' | 'lg';
 *      icon?: IconDefinition`
 */
const Btn = ({
  text,
  variant = 'primary',
  size = 'md',
  icon = null,
  type = 'button',
  onClick = undefined,
  disabled = false,
  className = '',
  ...rest
}) => {
  const classes = [styles.btn, styles[`btn--${variant}`], styles[`btn--${size}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled} {...rest}>
      <span>{text}</span>
      {icon ? <FontAwesomeIcon icon={icon} className={styles.btn__icon} aria-hidden="true" /> : null}
    </button>
  );
};

Btn.propTypes = {
  /** Visible label. */
  text: PropTypes.string.isRequired,
  /** Color treatment, resolved to tokens in Btn.module.scss. */
  variant: PropTypes.oneOf(['primary', 'dark', 'light']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** FontAwesome icon definition rendered after the label. */
  icon: PropTypes.object,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Btn;
