import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';


const MAX_BADGE_COUNT = 99;

interface CartButtonProps {
  /** Total quantity across all cart lines. */
  count: number;
  onClick: () => void;
}

/**
 * Cart icon with its item-count badge.
 */
const CartButton = ({ count, onClick }: CartButtonProps) => {
  const label = count === 1 ? '1 item in cart' : `${count} items in cart`;

  return (
    <button type="button" className="cart" onClick={onClick} aria-label={`Open cart, ${label}`}>
      <FontAwesomeIcon icon={faBagShopping} aria-hidden="true" />
      {count > 0 ? (
        // Keyed on the count so the bump animation replays on every add.
        <span key={count} className="cart__badge">
          {count > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : count}
        </span>
      ) : null}
    </button>
  );
};

export default React.memo(CartButton);
