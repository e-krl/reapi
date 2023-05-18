import React, { useState } from 'react';

const SavedCallsDialog = ({ handleOpen, handleDeleteCall }) => {
  const [keys, setKeys] = useState(Object.keys(localStorage));

  const handleClick = (key) => {
    console.log(`Clicked: ${key}`);
    handleOpen(key);
  };

  const handleDelete = (key) => {
    console.log(`Clicked: ${key}`);
    handleDeleteCall(key);
    setKeys(keys.filter((k) => k !== key));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white border border-gray-300 rounded p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Saved Requests</h2>
        <ul className="text-center">
          {keys.map((key, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => handleClick(key)}>
                {key}
              </span>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(key)}>
                Delete
              </button>
            </li>
          ))}
          <li
            key="exit"
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={() => handleClick()}
          >
            Exit
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SavedCallsDialog;
