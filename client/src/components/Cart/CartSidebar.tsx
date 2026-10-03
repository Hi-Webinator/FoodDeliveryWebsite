import { useCallback, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import OrderForm from "./OrderForm";
import { useCart } from "../../hooks/useCart";
import { useOrder } from "../../hooks/useOrder";
import { formatPrice } from "../../utils/formatPrice";
import { MESSAGES, SECTION_IDS } from "../../constants/config";

const ORDER_FORM_ID = "order-form";

/**
 * Slide-over cart: line items, delivery form and submission.
 */
const CartSidebar = () => {
  const {
    items,
    totalQuantity,
    totalPrice,
    isOpen,
    isEmpty,
    remove,
    setQuantity,
    clear,
    close,
  } = useCart();
  const { submitOrder, isSubmitting, error, fieldErrors, order, reset } =
    useOrder();

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the drawer, and body scroll is locked while it is open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  // Reopening the cart should not show the previous attempt's result.
  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const handleQuantityChange = useCallback(
    (id: string, quantity: number) => setQuantity(id, quantity),
    [setQuantity],
  );

  const handleBrowseMenu = useCallback(() => {
    close();
    document
      .getElementById(SECTION_IDS.MENU)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [close]);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="overlay"
        onClick={close}
        aria-label="Close cart"
        tabIndex={-1}
      />

      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className="drawer__header">
          <h2 className="drawer__title">
            Your cart
            {totalQuantity > 0 ? (
              <span className="drawer__count">{totalQuantity}</span>
            ) : null}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="drawer__close"
            onClick={close}
            aria-label="Close cart"
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
          </button>
        </header>

        <div className="drawer__body">
          {order ? (
            <p className="alert alert--success" role="status">
              <FontAwesomeIcon icon={faCircleCheck} aria-hidden="true" />
              <span>
                {MESSAGES.ORDER_SUCCESS} Order reference: {order.id}
              </span>
            </p>
          ) : null}

          {error ? (
            <p className="alert alert--error" role="alert">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                aria-hidden="true"
              />
              <span>{error}</span>
            </p>
          ) : null}

          {isEmpty ? (
            <CartEmpty
              message={MESSAGES.CART_EMPTY}
              onBrowse={handleBrowseMenu}
            />
          ) : (
            <>
              <ul className="items">
                {items.map((item) => (
                  <li key={item.id}>
                    <CartItem
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={remove}
                    />
                  </li>
                ))}
              </ul>

              <h3 className="drawer__subtitle">Delivery details</h3>
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
          <footer className="drawer__footer">
            <div className="summary">
              <span className="summary__label">Subtotal</span>
              <span className="summary__total">{formatPrice(totalPrice)}</span>
            </div>

            <div className="actions">
              <button
                type="button"
                className="actions__secondary"
                onClick={clear}
              >
                Clear
              </button>
              <button
                type="submit"
                form={ORDER_FORM_ID}
                className="actions__primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing order…" : "Place order"}
              </button>
            </div>
          </footer>
        ) : null}
      </aside>
    </>
  );
};

export default CartSidebar;
