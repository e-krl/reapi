import React, { useState } from 'react';

const DropdownSelector = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('post');

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue); // Pass the selected value to the parent component
  };

  const getOptionStyle = (optionValue) => {
    switch (optionValue) {
      case 'post':
        return { backgroundColor: '#00C853', color: '#FFFFFF' };
      case 'get':
        return { backgroundColor: '#1976D2', color: '#FFFFFF' };
      case 'put':
        return { backgroundColor: '#FFD600', color: '#000000' };
      case 'delete':
        return { backgroundColor: '#D32F2F', color: '#FFFFFF' };
      default:
        return {};
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        id="dropdown"
        className="px-2 py-1 border border-gray-300 rounded"
        style={getOptionStyle(selectedOption)}
        onChange={handleSelect}
        value={selectedOption}
      >
        <option value="post" style={getOptionStyle('post')}>
          POST
        </option>
        <option value="get" style={getOptionStyle('get')}>
          GET
        </option>
        <option value="delete" style={getOptionStyle('delete')}>
          DELETE
        </option>
      </select>
    </div>
  );
};

export default DropdownSelector;
