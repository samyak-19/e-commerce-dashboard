import React, { useState } from "react";
import { FiSearch, FiBell, FiSettings } from "react-icons/fi";
import { MdOutlineGridView } from "react-icons/md";
import { motion } from "framer-motion";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Example of a loading state simulation
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer);
  }, []);

  const iconVariants = {
    hover: { scale: 1.2, rotate: 10 },
  };

  const bellVariants = {
    hover: { scale: 1.2, rotate: -10 },
    tap: { scale: 1 },
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-between bg-white p-4 shadow-md"
    >
      {/* Left Section: Dashboard Title */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <MdOutlineGridView size={24} className="text-indigo-500" />
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      </motion.div>

      {/* Center Section: Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-1/3">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent ml-2 w-full focus:outline-none text-gray-600"
        />
      </div>

      {/* Right Section: Icons and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <motion.button
          variants={bellVariants}
          whileHover="hover"
          whileTap="tap"
          className="relative text-gray-500 hover:text-indigo-500"
        >
          <FiBell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            2
          </span>
        </motion.button>

        {/* Settings */}
        <motion.button
          variants={iconVariants}
          whileHover="hover"
          className="text-gray-500 hover:text-indigo-500"
        >
          <FiSettings size={20} />
        </motion.button>

        {/* User Profile */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          {isLoading ? (
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          ) : (
            <img
              src="https://i.pravatar.cc/40?img=3" // Dummy profile image
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
