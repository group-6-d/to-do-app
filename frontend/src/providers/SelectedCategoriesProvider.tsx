import { createContext, useState, ReactNode } from 'react';
import type Category from '../models/Category';

interface SelectedCategoriesContextType {
  selectedCategories: Category[];
  selectedCategoriesHandler: (selectedCategories: Category[]) => void;
}

export const SelectedCategoriesContext =
  createContext<SelectedCategoriesContextType>({
    selectedCategories: [],
    selectedCategoriesHandler: () => undefined,
  });

type SelectedCategoriesProviderProps = {
  children: ReactNode;
};

const SelectedCategoriesProvider = ({
  children,
}: SelectedCategoriesProviderProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const selectedCategoriesHandler = (selectedCategories: Category[]) => {
    setSelectedCategories(selectedCategories);
  };

  console.log('selectedCategories in filter provider', selectedCategories);

  return (
    <SelectedCategoriesContext.Provider
      value={{ selectedCategories, selectedCategoriesHandler }}
    >
      {children}
    </SelectedCategoriesContext.Provider>
  );
};

export default SelectedCategoriesProvider;
