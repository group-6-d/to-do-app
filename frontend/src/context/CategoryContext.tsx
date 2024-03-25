// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createContext, useContext, ReactNode } from 'react';
import useCategories from '../hooks/useCategories';
import type Category from '../models/Category';

interface CategoriesContextType {
  categories: Category[];
  refreshCategories: () => void;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  refreshCategories: () => null,
});

interface CategoriesProviderProps {
  children: ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const token = localStorage.getItem('token');
  const { categories, fetchAllCategories } = useCategories(token);

  const refreshCategories = () => {
    const token = localStorage.getItem('token');
    fetchAllCategories(token);
  };
  return (
    <CategoriesContext.Provider value={{ categories, refreshCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = (): CategoriesContextType =>
  useContext(CategoriesContext);
