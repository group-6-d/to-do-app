import { createContext, useState, ReactNode } from 'react';

interface SelectedCategoriesContextType {
  filters: string[] | null;
  filterTasksHandler: (selectedCategories: string[]) => void;
}

export const SelectedCategoriesContext =
  createContext<SelectedCategoriesContextType>({
    filters: null,
    filterTasksHandler: () => undefined,
  });

type SelectedCategoriesProviderProps = {
  children: ReactNode;
};

const SelectedCategoriesProvider = ({
  children,
}: SelectedCategoriesProviderProps) => {
  const [filters, setSelectedCategories] = useState<string[] | null>(null);

  const filterTasksHandler = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories);
  };

  console.log('filters in filter provider', filters);

  return (
    <SelectedCategoriesContext.Provider value={{ filters, filterTasksHandler }}>
      {children}
    </SelectedCategoriesContext.Provider>
  );
};

export default SelectedCategoriesProvider;
