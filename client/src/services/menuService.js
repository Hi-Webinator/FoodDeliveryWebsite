import api from './api';
import { ALL_CATEGORIES } from '../constants/categories';

// TS: `(): Promise<MenuItem[]>`
export const fetchMenu = async () => {
  const response = await api.get('/menu');
  return response?.data ?? [];
};

// TS: `(category: MenuCategory | 'all'): Promise<MenuItem[]>`
export const fetchMenuByCategory = async (category) => {
  if (!category || category === ALL_CATEGORIES) {
    return fetchMenu();
  }

  const response = await api.get(`/menu/${encodeURIComponent(category)}`);
  return response?.data ?? [];
};
