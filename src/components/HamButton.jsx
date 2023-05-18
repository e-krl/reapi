import React, { useState, useEffect, useRef } from 'react';

const HamburgerButton = ({ handleSave, handleOpen, handleNewRequest, handleAbout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={buttonRef}>
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
        onClick={toggleMenu}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30">
          <div className="py-1 text-center">
            <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleOpen}>
              Open
            </button>
            <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleSave}>
              Save
            </button>
            <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleNewRequest}>
              New
            </button>
            <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleAbout}>
              SSS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerButton;
