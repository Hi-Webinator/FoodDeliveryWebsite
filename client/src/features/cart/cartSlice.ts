import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { loadCartItems } from '../../utils/localStorage';
import { roundMoney } from '../../utils/formatPrice';
import { QUANTITY_MIN, QUANTITY_MAX } from '../../constants/config';
import { CartItem } from '../../hooks/useCart';
import type { RootState } from '../../store/types';

type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isOpen: boolean;
};

/** Keeps a quantity inside the bounds the API also enforces. */
const clampQuantity = (value: number): number => {
  const quantity = Math.trunc(Number(value));
  if (!Number.isFinite(quantity)) return QUANTITY_MIN;
  return Math.min(Math.max(quantity, QUANTITY_MIN), QUANTITY_MAX);
};

/** Totals are derived from `items`, never tracked independently. */
const deriveTotals = (items: CartItem[]) => ({
  totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: roundMoney(items.reduce((sum, item) => sum + item.price * item.quantity, 0)),
});

/** Rehydrates from localStorage so a refresh does not empty the cart. */
const buildInitialState = (): CartState => {
  const items = loadCartItems();
  return { items, ...deriveTotals(items), isOpen: false };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: buildInitialState(),
  reducers: {
    /** payload: MenuItem (+ optional quantity). Immer lets us "mutate" safely. */
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const { id, name, price, image, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        existing.quantity = clampQuantity(existing.quantity + quantity);
      } else {
        state.items.push({ id, name, price, image, quantity: clampQuantity(quantity) });
      }

      Object.assign(state, deriveTotals(state.items));
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      Object.assign(state, deriveTotals(state.items));
    },

    /** Setting a quantity to 0 (or less) removes the line entirely. */
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const target = state.items.find((item) => item.id === id);
      if (!target) return;

      if (Number(quantity) < QUANTITY_MIN) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        target.quantity = clampQuantity(quantity);
      }

      Object.assign(state, deriveTotals(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      Object.assign(state, deriveTotals(state.items));
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart } =
  cartSlice.actions;

// --- Selectors (co-located with the slice) ---------------------------------
export const selectCart = (state: RootState): CartState => state.cart;
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;
export const selectTotalQuantity = (state: RootState): number => state.cart.totalQuantity;
export const selectTotalPrice = (state: RootState): number => state.cart.totalPrice;
export const selectIsCartOpen = (state: RootState): boolean => state.cart.isOpen;

export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0,
);

/** Quantity of one dish, so a MenuCard can show its current count. */
export const makeSelectQuantityById = (id: string) =>
  createSelector([selectCartItems], (items) => items.find((item) => item.id === id)?.quantity ?? 0);

/** The exact `items` array POST /api/orders expects. */
export const selectOrderItems = createSelector([selectCartItems], (items) =>
  items.map(({ id, quantity }) => ({ menuItemId: id, quantity })),
);

export default cartSlice.reducer;
