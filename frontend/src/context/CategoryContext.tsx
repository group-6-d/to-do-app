import { createContext, useContext, ReactNode } from 'react';
import useCategories from '../hooks/useCategories';
import type Category from '../models/Category';

interface CategoriesContextType {
  categories: Category[] | null;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: null,
});

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
