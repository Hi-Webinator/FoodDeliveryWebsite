import api from './api';
import type { ApiEnvelope, MenuItem } from '../store/types';
import { ALL_CATEGORIES, MenuCategory } from '../constants/categories';

export const fetchMenu = async (): Promise<MenuItem[]> => {
  const response = await api.get<ApiEnvelope<MenuItem[]>>('/menu');
  return response.data ?? [];
};

export const fetchMenuByCategory = async (category: MenuCategory | 'all'): Promise<MenuItem[]> => {
  if (!category || category === ALL_CATEGORIES) {
    return fetchMenu();
  }

  const response = await api.get<ApiEnvelope<MenuItem[]>>(`/menu/${encodeURIComponent(category)}`);
  return response.data ?? [];
};
