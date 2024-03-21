import { useState, createContext, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  darkModeHandler: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  darkModeHandler: () => undefined,
});

type ThemeProvider = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProvider) => {
  const [isDarkMode, setDarkMode] = useState(false);

  const darkModeHandler = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
    console.log('isDarkMode', isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, darkModeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};
