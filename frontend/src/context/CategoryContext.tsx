// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createContext, useContext, ReactNode } from 'react';
import useCategories from '../hooks/useCategories';
import type Category from '../models/Category';

interface CategoriesContextType {
  categories: Category[];
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
});

// const CategoriesContext = createContext<CategoriesContextType | null>(null);

interface CategoriesProviderProps {
  children: ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const token = localStorage.getItem('token');
  const { categories } = useCategories(token);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => useContext(CategoriesContext);
