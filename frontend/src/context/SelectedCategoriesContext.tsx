import { createContext, useState, ReactNode } from 'react';
import type Category from '../models/Category';

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

  const selectedCategoriesHandler = (selectedCategories: Category[]) => {
    setSelectedCategories(selectedCategories);
  };

  return (
    <SelectedCategoriesContext.Provider
      value={{ selectedCategories, selectedCategoriesHandler }}
    >
      {children}
    </SelectedCategoriesContext.Provider>
  );
};

export default SelectedCategoriesProvider;
