import React, { useState, useEffect } from "react";

const MiddleContent = ({ toggleFavorites }) => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("http://localhost:8009/food-items")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Filter the data to include only items with a photo and name
        const filteredData = data.filter((item) => item.photo && item.name);
        setFoodData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 md:w-1/2 mt-4 md:mt-0 md:overflow-y-auto">
      <h2 className="text-gray-800 text-xl font-semibold mb-2 bg-green-600">
        Food Items
      </h2>
      <div className="bg-gray-400 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodData.map((foodItem) => (
            <div key={foodItem._id} className="border border-gray-300 p-2">
              <img
                src={foodItem.photo}
                alt={foodItem.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {foodItem.name}
              </h3>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
                onClick={() => toggleFavorites(foodItem.name)}
              >
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleContent;
