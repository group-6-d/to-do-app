import { createContext, useState, ReactNode } from 'react';

interface SelectedPriorityContext {
  selectedPriority: string[];
  selectedPriorityHandler: (selectedPriority: string[]) => void;
}

export const SelectedPriorityContext = createContext<SelectedPriorityContext>({
  selectedPriority: [],
  selectedPriorityHandler: () => undefined,
});

interface SelectedPriorityProviderProps {
  children: ReactNode;
}

const SelectedPriorityProvider = ({
  children,
}: SelectedPriorityProviderProps) => {
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);

  const selectedPriorityHandler = (selectedPriority: string[]) => {
    setSelectedPriority(selectedPriority);
  };

  // console.log('provider priority', selectedPriority);

  return (
    <SelectedPriorityContext.Provider
      value={{ selectedPriority, selectedPriorityHandler }}
    >
      {children}
    </SelectedPriorityContext.Provider>
  );
};

export default SelectedPriorityProvider;
