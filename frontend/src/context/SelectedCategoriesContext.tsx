import { createContext, useState, ReactNode, useEffect } from 'react';
import type Category from '../models/Category';
import { useCategoriesContext } from './CategoryContext';

interface SelectedCategoriesContext {
  selectedCategories: Category[];
  selectedCategoriesHandler: (selectedCategories: Category[]) => void;
}

export const SelectedCategoriesContext =
  createContext<SelectedCategoriesContext>({
    selectedCategories: [],
    selectedCategoriesHandler: () => undefined,
  });

interface SelectedCategoriesProviderProps {
  children: ReactNode;
}

const SelectedCategoriesProvider = ({
  children,
}: SelectedCategoriesProviderProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const categories = useCategoriesContext();
  const arrСategories = Object.values(categories).flat();

  useEffect(() => {
    const arrСategories = Object.values(categories).flat();
    setSelectedCategories(arrСategories);
  }, [categories]);

  const selectedCategoriesHandler = (selectedCategories: Category[]) => {
    setSelectedCategories(selectedCategories);
  };

  console.log('categories ctx', categories);

  console.log('arrСategories ctx', arrСategories);

  console.log('selectedCategories ctx', selectedCategories);

  return (
    <SelectedCategoriesContext.Provider
      value={{ selectedCategories, selectedCategoriesHandler }}
    >
      {children}
    </SelectedCategoriesContext.Provider>
  );
};

export default SelectedCategoriesProvider;
