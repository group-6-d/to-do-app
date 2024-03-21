import { createContext, useState, ReactNode } from 'react';

interface SelectedCategoriesContextType {
  selectedCategories: string[];
  selectedCategoriesHandler: (selectedCategories: string[]) => void;
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'personal',
    'hobbies',
    'movies',
    'shopping',
    'work',
    'other',
  ]);

  const selectedCategoriesHandler = (selectedCategories: string[]) => {
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
