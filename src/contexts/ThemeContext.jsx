// use hook Context to pass data to all components
import { useState, createContext } from "react";

export const ThemeContext = createContext();

function ThemeProvider(props) {
    // get theme from local storage
    const localTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState(localTheme);
    if (theme === null) {
        setTheme("dark");
    }
    localStorage.setItem("theme", theme);
    const handleTheme = () => {
        localStorage.setItem("theme", theme);
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{theme, handleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
    }

export default ThemeProvider;