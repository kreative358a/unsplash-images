import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

// const getInitialDarkMode = () => {
//   const prefersDarkMode = window.matchMedia(
//     "(prefers-color-scheme:dark)"
//   ).matches;
//   const storedDarkMode = localStorage.getItem("darkTheme") === "true";

//   return storedDarkMode || prefersDarkMode;
// };

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const storedDarkMode = localStorage.getItem("darkTheme");

  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  return storedDarkMode === "true";
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  // const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("cat");
  const [searchPage, setSearchPage] = useState(1);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // const body = document.querySelector('body')
    // body.classList.toggle('dark-theme', newDarkTheme)
    // document.body.classList.toggle("dark-theme", newDarkTheme);
    // console.log('body: ', body)
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
        searchTerm,
        setSearchTerm,
        searchPage,
        setSearchPage,
      }}
      // value={{ isDarkTheme, toggleDarkTheme,  }}
    >
      {children}
    </AppContext.Provider>
  );
};

// export const AppProvider = ({ children }) => {
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   return (
//     <AppContext.Provider
//       value={{  }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

export const useGlobalContext = () => useContext(AppContext);
