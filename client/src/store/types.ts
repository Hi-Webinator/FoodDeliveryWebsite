import { MenuCategory } from '../constants/categories';
import type { store, rootReducer } from './store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: MenuCategory;
    image: string;
    rating: number;
    available: boolean;
};

export type ValidationIssue = {
  [key: string]: unknown;
}