import { useCallback } from 'react';
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
import { useAppDispatch, useAppSelector } from './hooks';

/**
 * Thin facade over the cart slice so components never import actions or
 * selectors directly. Every callback is memoized, which keeps memoized
 * children (MenuCard, CartItem) from re-rendering on unrelated state changes.
 */

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type UseCartResult = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isOpen: boolean;
  isEmpty: boolean;
  add: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCart = (): UseCartResult => {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);
  const isOpen = useAppSelector(selectIsCartOpen);
  const isEmpty = useAppSelector(selectIsCartEmpty);

  const add = useCallback(
    (item: Omit<CartItem, 'quantity'>, quantity = 1) => dispatch(addItem({ ...item, quantity })),
    [dispatch],
  );

  const remove = useCallback((id: string) => dispatch(removeItem(id)), [dispatch]);

  const setQuantity = useCallback(
    (id: string, quantity: number) => dispatch(updateQuantity({ id, quantity })),
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
