import { useState, createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
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
