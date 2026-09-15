import { useCallback, useEffect, useMemo, useState } from 'react';

import { fetchMenu } from '../services/menuService';
import MOCK_MENU from '../data/mockMenu';
import { ALL_CATEGORIES, type MenuCategory } from '../constants/categories';
import { MESSAGES } from '../constants/config';
import type { MenuItem } from '../store/types';

/**
 * Loads the menu once and filters it in memory.
 *
 * Filtering client-side (rather than re-calling /api/menu/:category on every
 * chip click) keeps the UI instant and the request count low; the category
 * endpoint still exists and is used by menuService when needed.
 */

export type UseMenu = {
  items: MenuItem[];
  allItems: MenuItem[];
  isLoading: boolean;
  error: string | null;
  isFallback: boolean;
  category: MenuCategory | 'all';
  setCategory: (c: MenuCategory | 'all') => void;
  refetch: () => void;
};

export const useMenu = (): UseMenu => {
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [category, setCategory] = useState<MenuCategory | 'all'>(ALL_CATEGORIES);

  const load = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchMenu();
      if (signal?.aborted) return;

      setAllItems(data);
      setIsFallback(false);
    } catch (apiError) {
      if (signal?.aborted) return;

      // A portfolio demo should still render, so fall back to static data.
      setAllItems(MOCK_MENU);
      setIsFallback(true);
      setError(apiError instanceof Error ? apiError.message : MESSAGES.MENU_ERROR);
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);

    // Cleanup: stop the unmounted component from setting state.
    return () => controller.abort();
  }, [load]);

  const items = useMemo(() => {
    if (category === ALL_CATEGORIES) return allItems;
    return allItems.filter((item) => item.category === category);
  }, [allItems, category]);

  const refetch = useCallback(() => load(), [load]);

  return { items, allItems, isLoading, error, isFallback, category, setCategory, refetch };
};

export default useMenu;
