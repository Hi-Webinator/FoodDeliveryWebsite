import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

import { formatPrice } from '../../utils/formatPrice';
import { decodeEntities } from '../../utils/sanitize';
import type { MenuItem } from '../../store/types';
import styles from './MenuCard.module.scss';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="4" height="3"/>';

interface MenuCardProps {
  item: MenuItem;
  /** How many of this dish are already in the cart. */
  quantity?: number;
  onAdd: (item: MenuItem) => void;
}

/**
 * One dish in the menu grid.
 *
 * Memoized because the grid re-renders on every cart change, while an
 * individual card only changes when its own quantity does.
 */
const MenuCard = ({ item, quantity = 0, onAdd }: MenuCardProps) => {
  const { name, description, price, category, image, rating } = item;

  const handleAdd = useCallback(() => onAdd(item), [onAdd, item]);

  // A broken remote image must not leave a broken-icon hole in the grid.
  const handleImageError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  }, []);

  const isInCart = quantity > 0;

  return (
    <article className={styles.card}>
      <div className={styles.card__media}>
        <img
          className={styles.card__image}
          src={image}
          alt={decodeEntities(name)}
          loading="lazy"
          onError={handleImageError}
        />
        <span className={styles.card__category}>{category}</span>
        {rating > 0 ? (
          <span className={styles.card__rating} aria-label={`Rated ${rating} out of 5`}>
            <FontAwesomeIcon icon={faStar} className={styles.card__star} aria-hidden="true" />
            {rating.toFixed(1)}
          </span>
        ) : null}
      </div>

      <div className={styles.card__body}>
        <h3 className={styles.card__name}>{decodeEntities(name)}</h3>
        <p className={styles.card__description}>{decodeEntities(description)}</p>

        <div className={styles.card__footer}>
          <span className={styles.card__price}>{formatPrice(price)}</span>
          <button
            type="button"
            className={`${styles.card__action} ${isInCart ? styles['card__action--added'] : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${decodeEntities(name)} to cart`}
          >
            {/* Keyed so the icon pops every time the quantity changes. */}
            <FontAwesomeIcon
              key={quantity}
              icon={isInCart ? faCheck : faPlus}
              className={styles.card__icon}
              aria-hidden="true"
            />
            {isInCart ? 'Added' : 'Add to cart'}
            {isInCart ? <span className={styles.card__count}>{quantity}</span> : null}
          </button>
        </div>
      </div>
    </article>
  );
};

export default React.memo(MenuCard);
