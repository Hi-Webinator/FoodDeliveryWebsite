import type { Middleware } from '@reduxjs/toolkit';
import { saveCartItems } from '../utils/localStorage';
import type { RootState } from './types';

/** Only these actions can change `items`, so only they trigger a write. */
const PERSISTED_ACTIONS = new Set([
  'cart/addItem',
  'cart/removeItem',
  'cart/updateQuantity',
  'cart/clearCart',
]);

/** Redux's `Middleware` type leaves `action` as `unknown`, so narrow it ourselves. */
const isActionWithType = (action: unknown): action is { type: string } =>
  typeof action === 'object' && action !== null && typeof (action as { type?: unknown }).type === 'string';

/**
 * Writes the cart to localStorage after any action that mutates it.
 * A hand-rolled middleware is enough here — redux-persist would add a
 * dependency and a rehydration lifecycle for a single slice.
 */
const persistCartMiddleware: Middleware<object, RootState> =
  (store) =>
    (next) =>
      (action) => {
        const result = next(action);

        if (isActionWithType(action) && PERSISTED_ACTIONS.has(action.type)) {
          saveCartItems(store.getState().cart.items);
        }

        return result;
      };

export default persistCartMiddleware;