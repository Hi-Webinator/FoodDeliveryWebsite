import { CART_STORAGE_KEY } from '../constants/config';

/**
 * localStorage throws in private-browsing modes and when site data is blocked,
 * so every access is guarded and falls back to "nothing stored".
 */
const readJson = <T>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or storage disabled — the cart simply will not persist.
  }
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

/** Shape guard: stale or hand-edited data must never crash the store. */
// TS: `(value: unknown) => value is CartItem[]`
const isValidCartItems = (value: unknown): boolean =>
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
export const loadCartItems = (): CartItem[] => {
  const stored = readJson(CART_STORAGE_KEY, null);
  return isValidCartItems(stored) ? stored : [];
};

// TS: `(items: CartItem[]) => void`
export const saveCartItems = (items: CartItem[]): void => writeJson(CART_STORAGE_KEY, items);

export const clearStoredCart = (): void => {
  try {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch {
    // Nothing to do — the next load falls back to an empty cart anyway.
  }
};
