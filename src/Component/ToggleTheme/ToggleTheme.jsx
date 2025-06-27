import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion"; 

const ToggleTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-full flex items-center gap-2 font-medium text-sm text-gray-700 dark:text-gray-300 shadow-md transition-all duration-300 hover:shadow-lg hover:border-gray-400 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <motion.span
          key="light-icon"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <FaSun className="text-yellow-500 text-lg" />
          <span className="hidden md:inline">Light Mode</span>
        </motion.span>
      ) : (
        <motion.span
          key="dark-icon"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <FaMoon className="text-gray-400 text-lg" />
          <span className="hidden md:inline">Dark Mode</span>
        </motion.span>
      )}
    </motion.button>
  );
};

export default ToggleTheme;