import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './Navbar.module.scss';

const MAX_BADGE_COUNT = 99;

/**
 * Cart icon with its item-count badge.
 *
 * TS: `interface CartButtonProps { count: number; onClick: () => void }`
 */
const CartButton = ({ count, onClick }) => {
  const label = count === 1 ? '1 item in cart' : `${count} items in cart`;

  return (
    <button type="button" className={styles.cart} onClick={onClick} aria-label={`Open cart, ${label}`}>
      <FontAwesomeIcon icon={faBagShopping} aria-hidden="true" />
      {count > 0 ? (
        // Keyed on the count so the bump animation replays on every add.
        <span key={count} className={styles.cart__badge}>
          {count > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : count}
        </span>
      ) : null}
    </button>
  );
};

CartButton.propTypes = {
  /** Total quantity across all cart lines. */
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(CartButton);
