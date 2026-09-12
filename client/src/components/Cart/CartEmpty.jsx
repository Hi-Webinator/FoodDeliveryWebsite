import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBagShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './CartEmpty.module.scss';

/**
 * Empty-cart state inside the drawer, with a way back to the menu.
 *
 * TS: `interface CartEmptyProps { message: string; onBrowse: () => void }`
 */
const CartEmpty = ({ message, onBrowse }) => (
  <div className={styles.empty}>
    <span className={styles.empty__illustration} aria-hidden="true">
      <FontAwesomeIcon icon={faBagShopping} />
    </span>
    <p className={styles.empty__title}>Nothing here yet</p>
    <p className={styles.empty__text}>{message}</p>
    <button type="button" className={styles.empty__action} onClick={onBrowse}>
      Browse the menu
      <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
    </button>
  </div>
);

CartEmpty.propTypes = {
  /** Copy from MESSAGES.CART_EMPTY. */
  message: PropTypes.string.isRequired,
  /** Closes the drawer and scrolls to the menu. */
  onBrowse: PropTypes.func.isRequired,
};

export default CartEmpty;
