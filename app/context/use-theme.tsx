import { type ReactNode } from "react";
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = Cookies.get("lmn-theme");

    // If there's a saved theme, use it
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    // If no saved theme, default to dark (no need to check system preference)
    else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      // Set the default theme in cookies
      Cookies.set("lmn-theme", "dark", { expires: 365, path: "/" });
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      // Set the theme in cookies (expires in 1 year)
      Cookies.set("lmn-theme", newTheme, { expires: 365, path: "/" });
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
