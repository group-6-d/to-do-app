import { createContext, useContext } from 'react';
import useCategories from '../hooks/useCategories';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const { categories } = useCategories(token);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => useContext(CategoriesContext);
