import React from "react";

const RightSidebar = ({ showFavorites, toggleFavorites, favorites }) => {
  return (
    <div className="bg-blue-400 p-4 md:w-1/4 mt-4 md:mt-0">
      {/* ... (favorites and web ads code) */}
      <div>
        {/* favorites */}
        <h2 className="text-white text-lg font-semibold mb-2">Favorites</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={toggleFavorites}
        >
          {showFavorites ? "Hide Favorites" : "Show Favorites"}
        </button>
        {showFavorites && (
          <div className="border border-gray-300 p-2 mt-2">
            {/* Display favorites here */}
            {favorites.length === 0 ? (
              <p>No favorites added yet.</p>
            ) : (
              <ul>
                {favorites.map((userName, index) => (
                  <li key={index}>{userName}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {/* Web Ads Section */}
      <div className="mt-4">
        <h2 className="text-white text-lg font-semibold mb-2">Web Ads</h2>
        {/* Add your web banner content here */}
        {/* For example: Advertisements, Promotions, etc. */}
      </div>
    </div>
  );
};

export default RightSidebar;
