import React, { useState } from "react";
import Sidebar from "../../items/userpanelpages/Sidebar";
import MiddleContent from "../../items/userpanelpages/MiddleContent";
import RightSidebar from "../../items/userpanelpages/RightSidebar";
import MobileSidebarPopup from "../../items/userpanelpages/MobileSidebarPopup";
// import Footer from "../../items/home/Footer";

import { FaFilter, FaArrowLeft } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const UserDashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [filters, setFilters] = useState({
    age: "",
    religion: "",
    country: "",
    caste: "",
    height: "",
    education: "",
    gender: "",
  });

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);

  const toggleLeftSidebar = () => {
    setShowLeftSidebar((prevState) => !prevState);
  };

  const handleCloseMobileSidebar = () => {
    setShowLeftSidebar(false);
  };

  return (
    <div className="bg-gray-400 min-h-screen">
      {/* Show/Hide Sidebar Button for Mobile View */}
      {isMobile && (
        <button
          className="fixed top-30 right-4 bg-red-500 m-1 text-white rounded p-2 flex items-center z-10"
          onClick={toggleLeftSidebar}
        >
          {showLeftSidebar ? (
            <>
              <FaArrowLeft className="mr-1" /> Hide Filter Bar
            </>
          ) : (
            <>
              <FaFilter className="mr-1" /> Filter Bar
            </>
          )}
        </button>
      )}

      {/* Main Content */}
      <div className="container mx-auto p-4 md:flex md:flex-row md:justify-between xl:w-820 xl:h-1180 xl:mx-auto relative">
        {/* Left Sidebar Popup Box for Mobile View */}
        {isMobile && showLeftSidebar && (
          <MobileSidebarPopup
            filters={filters}
            handleFilterChange={handleFilterChange}
            onClose={handleCloseMobileSidebar}
          />
        )}

        {/* Left Sidebar (Hide in mobile view) */}
        {!isMobile && <Sidebar filters={filters} handleFilterChange={handleFilterChange} />}

        {/* Middle Section - User Profiles/Feed */}
        <MiddleContent
          toggleFavorites={toggleFavorites}
          showFavorites={showFavorites}
        />

        {/* Right Sidebar */}
        <RightSidebar showFavorites={showFavorites} toggleFavorites={toggleFavorites} favorites={favorites} />
      </div>
    </div>
  );
};

export default UserDashboard;
