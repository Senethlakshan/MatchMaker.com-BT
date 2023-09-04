import React from "react";
import { FaTimes } from "react-icons/fa"; // Import the times icon

// MobileSidebarPopup component
const MobileSidebarPopup = ({ filters, handleFilterChange, onClose }) => {
  return (
    <div className="bg-yellow-400 fixed top-12 left-0 bottom-0 w-64 p-4 flex flex-col">
      {/* Add your filter bar code here */}
      <h2 className="text-blue-400 text-lg font-semibold mt-5 mb-2">Filter Options</h2>
      {/* Age Filter */}
      <div className="mb-4">
        <label className="text-blue-400 block">Age</label>
        <input
          type="text"
          name="age"
          value={filters.age}
          onChange={handleFilterChange}
          className="bg-blue-400 rounded p-2 text-white"
        />
      </div>
      {/* Religion Filter */}
      {/* ... (rest of the filter options code) */}

      {/* Add your close button */}
      <div className="bg-green-400 flex justify-center">
      <button
        className="text-white text-xl font-semibold mt-auto cursor-pointer bg-red-400 p-2 rounded-full "
        onClick={onClose}
      >
        <FaTimes className="text-blue-400" /> {/* Close button with times icon */}
      </button>
      </div>
     
    </div>
  );
};

export default MobileSidebarPopup;
