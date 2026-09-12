import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalPrice,
  selectIsCartOpen,
  selectIsCartEmpty,
} from '../features/cart/cartSlice';

/**
 * Thin facade over the cart slice so components never import actions or
 * selectors directly. Every callback is memoized, which keeps memoized
 * children (MenuCard, CartItem) from re-rendering on unrelated state changes.
 *
 * TS: `(): UseCartResult`
 */
export const useCart = () => {
  // TS: type this dispatch as `AppDispatch`
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const isOpen = useSelector(selectIsCartOpen);
  const isEmpty = useSelector(selectIsCartEmpty);

  // TS: `(item: MenuItem, quantity?: number) => void`
  const add = useCallback(
    (item, quantity = 1) => dispatch(addItem({ ...item, quantity })),
    [dispatch],
  );

  const remove = useCallback((id) => dispatch(removeItem(id)), [dispatch]);

  const setQuantity = useCallback(
    (id, quantity) => dispatch(updateQuantity({ id, quantity })),
    [dispatch],
  );

  const clear = useCallback(() => dispatch(clearCart()), [dispatch]);
  const open = useCallback(() => dispatch(openCart()), [dispatch]);
  const close = useCallback(() => dispatch(closeCart()), [dispatch]);
  const toggle = useCallback(() => dispatch(toggleCart()), [dispatch]);

  return {
    items,
    totalQuantity,
    totalPrice,
    isOpen,
    isEmpty,
    add,
    remove,
    setQuantity,
    clear,
    open,
    close,
    toggle,
  };
};

export default useCart;
