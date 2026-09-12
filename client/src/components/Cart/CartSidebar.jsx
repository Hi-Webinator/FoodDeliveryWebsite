import React, { useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

import CartItem from './CartItem';
import CartEmpty from './CartEmpty';
import OrderForm from './OrderForm';
import { useCart } from '../../hooks/useCart';
import { useOrder } from '../../hooks/useOrder';
import { formatPrice } from '../../utils/formatPrice';
import { MESSAGES, SECTION_IDS } from '../../constants/config';
import styles from './CartSidebar.module.scss';

const ORDER_FORM_ID = 'order-form';

/**
 * Slide-over cart: line items, delivery form and submission.
 *
 * TS: this component takes no props — no interface needed.
 */
const CartSidebar = () => {
  const { items, totalQuantity, totalPrice, isOpen, isEmpty, remove, setQuantity, clear, close } =
    useCart();
  const { submitOrder, isSubmitting, error, fieldErrors, order, reset } = useOrder();

  const closeButtonRef = useRef(null);

  // Escape closes the drawer, and body scroll is locked while it is open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  // Reopening the cart should not show the previous attempt's result.
  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const handleQuantityChange = useCallback(
    (id, quantity) => setQuantity(id, quantity),
    [setQuantity],
  );

  const handleBrowseMenu = useCallback(() => {
    close();
    document.getElementById(SECTION_IDS.MENU)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [close]);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className={styles.overlay}
        onClick={close}
        aria-label="Close cart"
        tabIndex={-1}
      />

      <aside className={styles.drawer} role="dialog" aria-modal="true" aria-label="Shopping cart">
        <header className={styles.drawer__header}>
          <h2 className={styles.drawer__title}>
            Your cart
            {totalQuantity > 0 ? <span className={styles.drawer__count}>{totalQuantity}</span> : null}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.drawer__close}
            onClick={close}
            aria-label="Close cart"
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.drawer__body}>
          {order ? (
            <p className={`${styles.alert} ${styles['alert--success']}`} role="status">
              <FontAwesomeIcon icon={faCircleCheck} aria-hidden="true" />
              <span>
                {MESSAGES.ORDER_SUCCESS} Order reference: {order.id}
              </span>
            </p>
          ) : null}

          {error ? (
            <p className={`${styles.alert} ${styles['alert--error']}`} role="alert">
              <FontAwesomeIcon icon={faTriangleExclamation} aria-hidden="true" />
              <span>{error}</span>
            </p>
          ) : null}

          {isEmpty ? (
            <CartEmpty message={MESSAGES.CART_EMPTY} onBrowse={handleBrowseMenu} />
          ) : (
            <>
              <ul className={styles.items}>
                {items.map((item) => (
                  <li key={item.id}>
                    <CartItem item={item} onQuantityChange={handleQuantityChange} onRemove={remove} />
                  </li>
                ))}
              </ul>

              <h3 className={styles.drawer__subtitle}>Delivery details</h3>
              <OrderForm
                formId={ORDER_FORM_ID}
                onSubmit={submitOrder}
                isSubmitting={isSubmitting}
                fieldErrors={fieldErrors}
              />
            </>
          )}
        </div>

        {!isEmpty ? (
          <footer className={styles.drawer__footer}>
            <div className={styles.summary}>
              <span className={styles.summary__label}>Subtotal</span>
              <span className={styles.summary__total}>{formatPrice(totalPrice)}</span>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.actions__secondary} onClick={clear}>
                Clear
              </button>
              <button
                type="submit"
                form={ORDER_FORM_ID}
                className={styles.actions__primary}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing order…' : 'Place order'}
              </button>
            </div>
          </footer>
        ) : null}
      </aside>
    </>
  );
};

export default CartSidebar;
