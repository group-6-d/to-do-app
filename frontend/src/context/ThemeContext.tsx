import { useState, createContext, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  darkModeHandler: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  darkModeHandler: () => undefined,
});

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [isDarkMode, setDarkMode] = useState(false);

  const darkModeHandler = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, darkModeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};
