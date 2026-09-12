import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { formatPrice } from '../../utils/formatPrice';
import { decodeEntities } from '../../utils/sanitize';
import { QUANTITY_MAX } from '../../constants/config';
import styles from './CartItem.module.scss';

/**
 * One line in the cart, with a bounded quantity stepper.
 *
 * TS: `interface CartItemProps { item: CartItem;
 *      onQuantityChange: (id: string, quantity: number) => void;
 *      onRemove: (id: string) => void }`
 */
const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const { id, name, price, image, quantity } = item;

  const decrease = useCallback(
    () => onQuantityChange(id, quantity - 1),
    [id, quantity, onQuantityChange],
  );

  const increase = useCallback(
    () => onQuantityChange(id, quantity + 1),
    [id, quantity, onQuantityChange],
  );

  const handleRemove = useCallback(() => onRemove(id), [id, onRemove]);

  const safeName = decodeEntities(name);

  return (
    <div className={styles.item}>
      <img className={styles.item__image} src={image} alt={safeName} loading="lazy" />

      <div className={styles.item__body}>
        <div className={styles.item__header}>
          <div className={styles.item__info}>
            <p className={styles.item__name}>{safeName}</p>
            <span className={styles.item__price}>{formatPrice(price)} each</span>
          </div>

          <button
            type="button"
            className={styles.item__remove}
            onClick={handleRemove}
            aria-label={`Remove ${safeName} from cart`}
          >
            <FontAwesomeIcon icon={faTrashCan} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.item__controls}>
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.stepper__button}
              onClick={decrease}
              aria-label={`Decrease quantity of ${safeName}`}
            >
              <FontAwesomeIcon icon={faMinus} aria-hidden="true" />
            </button>
            <span className={styles.stepper__value} aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              className={styles.stepper__button}
              onClick={increase}
              // The API rejects anything above 99, so stop the user here first.
              disabled={quantity >= QUANTITY_MAX}
              aria-label={`Increase quantity of ${safeName}`}
            >
              <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
            </button>
          </div>

          <span className={styles.item__subtotal}>{formatPrice(price * quantity)}</span>
        </div>
      </div>
    </div>
  );
};

// TS: extract this into a shared `CartItem` type
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  /** Receives the clamped quantity; below QUANTITY_MIN removes the line. */
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
