import { CART_STORAGE_KEY } from '../constants/config';

/**
 * localStorage throws in private-browsing modes and when site data is blocked,
 * so every access is guarded and falls back to "nothing stored".
 */

// TS: `<T>(key: string, fallback: T) => T`
const readJson = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

// TS: `(key: string, value: unknown) => void`
const writeJson = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or storage disabled — the cart simply will not persist.
  }
};

/** Shape guard: stale or hand-edited data must never crash the store. */
// TS: `(value: unknown) => value is CartItem[]`
const isValidCartItems = (value) =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      Number.isFinite(item.price) &&
      Number.isInteger(item.quantity),
  );

// TS: `() => CartItem[]`
export const loadCartItems = () => {
  const stored = readJson(CART_STORAGE_KEY, null);
  return isValidCartItems(stored) ? stored : [];
};

// TS: `(items: CartItem[]) => void`
export const saveCartItems = (items) => writeJson(CART_STORAGE_KEY, items);

export const clearStoredCart = () => {
  try {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch {
    // Nothing to do — the next load falls back to an empty cart anyway.
  }
};
