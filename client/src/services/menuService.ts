import api from './api';
import type { MenuItem } from '../store/types';
import { ALL_CATEGORIES, MenuCategory } from '../constants/categories';

export const fetchMenu = async (): Promise<MenuItem[]> => {
  const menu = await api.get<MenuItem[]>('/menu');
  return menu ?? [];
};

export const fetchMenuByCategory = async (category: MenuCategory | 'all'): Promise<MenuItem[]> => {
  if (!category || category === ALL_CATEGORIES) {
    return fetchMenu();
  }

  const menu = await api.get<MenuItem[]>(`/menu/${encodeURIComponent(category)}`);
  return menu ?? [];
};
