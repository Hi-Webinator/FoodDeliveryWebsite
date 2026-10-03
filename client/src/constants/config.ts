/**
 * Tolerates a host pasted without a scheme (which the browser would treat as a
 * relative path) and without the `/api` prefix the server mounts routes under.
 */
const normalizeBaseUrl = (raw: string): string => {
  const trimmed = raw.trim().replace(/\/+$/, '');
  if (trimmed.startsWith('/')) return trimmed;
  const url = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return new URL(url).pathname === '/' ? `${url}/api` : url;
};

/** API base URL. Vite inlines `import.meta.env` at build time. */
export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL || '/api');

export const API_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT) || 10_000;

export const IS_DEV = import.meta.env.DEV;

/** localStorage key holding the persisted cart. Versioned so shape changes
 *  can be rolled forward without crashing on stale data. */
export const CART_STORAGE_KEY = 'fd.cart.v1';

/** Quantity bounds, mirrored by the server's express-validator rules. */
export const QUANTITY_MIN = 1;
export const QUANTITY_MAX = 99;

export const CURRENCY = 'USD';
export const LOCALE = 'en-US';

/** Section ids used by the navbar's smooth-scroll links. */
export const SECTION_IDS = {
  HERO: 'hero',
  MENU: 'menu',
  HOW_IT_WORKS: 'how-it-works',
  TESTIMONIALS: 'testimonials',
  CONTACT: 'contact',
} as const;

export const NAV_LINKS = [
  { id: SECTION_IDS.MENU, label: 'menu' },
  { id: SECTION_IDS.HOW_IT_WORKS, label: 'how it works' },
  { id: SECTION_IDS.TESTIMONIALS, label: 'reviews' },
  { id: SECTION_IDS.CONTACT, label: 'contact' },
] as const;

/** User-facing copy kept out of the components. */
export const MESSAGES = {
  MENU_ERROR: 'We could not reach the kitchen. Showing our sample menu instead.',
  MENU_EMPTY: 'No dishes on the menu just yet. Please check back soon.',
  MENU_EMPTY_FILTERED: 'Nothing in this category right now. Try another one.',
  CART_EMPTY: 'Your cart is empty. Add something delicious from the menu.',
  ORDER_SUCCESS: 'Thanks! Your order is on its way.',
  ORDER_ERROR: 'We could not place your order. Please try again.',
} as const;
