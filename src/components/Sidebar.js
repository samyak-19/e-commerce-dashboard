import React, { useState } from "react";
import { FiShoppingCart, FiUsers, FiMail, FiCalendar, FiTag } from "react-icons/fi";
import { HiOutlineDocumentText, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import { MdMenu, MdClose } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex">
      {/* Hamburger Menu Button for Mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 text-gray-700 focus:outline-none"
        >
          <MdMenu size={30} />
        </button>
      </div>

      {/* Sidebar for Laptop */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 bg-white shadow-md h-screen w-60 p-4 z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 bg-indigo-500 rounded-full"></div>
          <h1 className="text-lg font-bold text-gray-800">Catalog</h1>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <h2 className="text-gray-400 text-xs uppercase mb-2">Home</h2>
          <div className="flex items-center space-x-2 text-indigo-500 mb-4">
            <FiShoppingCart />
            <span>eCommerce</span>
          </div>

          <h2 className="text-gray-400 text-xs uppercase mb-2">App</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
              <FiUsers />
              <span>Contacts</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
              <FiMail />
              <span>Chats</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
              <FiCalendar />
              <span>Calendar</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
              <HiOutlineDocumentText />
              <span>Email</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
              <FiTag />
              <span>Tickets</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div>
          <div className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500 mb-4">
            <HiOutlineCog />
            <span>Setting</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
            <HiOutlineLogout />
            <span>Log out</span>
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCloseSidebar}
          ></div>

          {/* Sidebar Content */}
          <div className="fixed inset-y-0 left-0 w-60 bg-white shadow-md z-50 p-4 flex flex-col justify-between">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-bold text-gray-800">Catalog</h1>
              <button onClick={() => setIsOpen(false)} className="focus:outline-none">
                <MdClose size={30} />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1">
              <h2 className="text-gray-400 text-xs uppercase mb-2">Home</h2>
              <div className="flex items-center space-x-2 text-indigo-500 mb-4">
                <FiShoppingCart />
                <span>eCommerce</span>
              </div>

              <h2 className="text-gray-400 text-xs uppercase mb-2">App</h2>
              <ul className="space-y-3 mb-4">
                <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
                  <FiUsers />
                  <span>Contacts</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
                  <FiMail />
                  <span>Chats</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
                  <FiCalendar />
                  <span>Calendar</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
                  <HiOutlineDocumentText />
                  <span>Email</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500">
                  <FiTag />
                  <span>Tickets</span>
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div>
              <div className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500 mb-4">
                <HiOutlineCog />
                <span>Setting</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
                <HiOutlineLogout />
                <span>Log out</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Area */}
      <div className="flex-1 lg:ml-60 p-0">
        
      </div>
    </div>
  );
};

export default Sidebar;
