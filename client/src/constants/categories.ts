/** Sentinel for the "show everything" filter chip. */
export const ALL_CATEGORIES = 'all' as const;

/**
 * Must stay in sync with server/config/constants.js MENU_CATEGORIES.
 * `emoji` reuses the icon language already established on the homepage.
 */
export const MENU_CATEGORIES = [
  { id: 'burger', label: 'Burger', emoji: '🍔' },
  { id: 'pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'sushi', label: 'Sushi', emoji: '🍣' },
  { id: 'drinks', label: 'Drinks', emoji: '🥤' },
  { id: 'dessert', label: 'Dessert', emoji: '🍰' },
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number]['id'];

export const CATEGORY_IDS = MENU_CATEGORIES.map((category) => category.id);

/** Filter chips = "All" followed by every real category. */
export const CATEGORY_FILTERS = [
  { id: ALL_CATEGORIES, label: 'All', emoji: '🍽️' },
  ...MENU_CATEGORIES,
];
