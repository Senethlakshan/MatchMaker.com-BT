import React, { useEffect, useState } from "react";
import { FaMale, FaFemale, FaGenderless, FaCross, FaOm, FaPrayingHands } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";


const Sidebar = ({ filters, handleFilterChange }) => {

  const [countryOptions, setCountryOptions] = useState([]);
  const [minAge, setMinAge] = useState(filters.minAge || 18); 
  const [maxAge, setMaxAge] = useState(filters.maxAge || 99); // Set the default maximum age to 99
  const [height, setHeight] = useState(filters.height || "");
  const [heightMeasurement, setHeightMeasurement] = useState("cm"); // Default measurement is cm



  const handleMinAgeChange = (event) => {
    setMinAge(Number(event.target.value));
  };

  const handleMaxAgeChange = (event) => {
    setMaxAge(Number(event.target.value));
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleHeightMeasurementChange = (event) => {
    setHeightMeasurement(event.target.value);
  };

  const applyFilters = () => {
    handleFilterChange("minAge", minAge);
    handleFilterChange("maxAge", maxAge);
    handleFilterChange("height", height);
    handleFilterChange("heightMeasurement", heightMeasurement);
  };

  useEffect(() => {
    // Fetch country information from the API
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        const countryOptions = response.data.map(country => ({
          value: country.cca2,
          label: country.name.common,
          icon: country.flags?.png ? (
            <img src={country.flags.png} alt={country.name.common} style={{ width: '20px', height: '20px' }} />
          ) : null,
        }));
        setCountryOptions(countryOptions);
      })
      .catch(error => {
        console.error("Error fetching country information:", error);
      });
  }, []);



  const religionOptions = [
    { value: "", label: "All" },
    { value: "catholic", label: "Catholic", icon: <FaCross className="mr-2 inline-block" /> },
    { value: "tamil", label: "Tamil", icon: <FaOm className="mr-2 inline-block" /> },
    { value: "hindu", label: "Hindu", icon: <FaPrayingHands className="mr-2 inline-block" /> },
    { value: "atheist", label: "Atheist", icon: <FaGenderless className="mr-2 inline-block" /> },
    // Add more religion options with icons
  ];

  const marriedStatusOptions = [
    { value: "", label: "All" },
    { value: "single", label: "Single", icon: <FaMale className="mr-2 inline-block" /> },
    { value: "married", label: "Married", icon: <FaFemale className="mr-2 inline-block" /> },
    { value: "divorced", label: "Divorced", icon: <FaGenderless className="mr-2 inline-block" /> },
    // Add more married status options with icons
  ];

  const languageOptions = [
    { value: "", label: "All" },
    { value: "english", label: "English" },
    { value: "tamil", label: "Tamil" },
    // Add more language options with icons
  ];


  return (
    <div className="bg-gray-200 shadow-md rounded-xl p-4 md:w-1/5">
      <h2 className="text-black text-lg font-semibold mb-2 ">Filter Options</h2>
      {/* div scrollbar */}
      <div className="p-1">
         {/* Gender Filter */}
      <div className="mb-4">
        <label className="text-black block">Gender</label>
        <div className="flex">
          <button
            className={`px-4 py-2 rounded-l-md ${
              filters.gender === "male" ? "bg-amber-600 text-white" : "bg-white text-gray-800"
            }`}
            onClick={() => handleFilterChange("gender", "male")}
          >
            <FaMale className="mr-2 inline-block" />
            Male
          </button>
          <button
            className={`px-4 py-2 ${
              filters.gender === "female" ? "bg-amber-600 text-white" : "bg-white text-gray-800"
            }`}
            onClick={() => handleFilterChange("gender", "female")}
          >
            <FaFemale className="mr-2 inline-block" />
            Female
          </button>
          <button
            className={`px-4 py-2 rounded-r-md ${
              filters.gender === "other" ? "bg-amber-600 text-white" : "bg-white text-gray-800"
            }`}
            onClick={() => handleFilterChange("gender", "other")}
          >
            <FaGenderless className="mr-2 inline-block" />
            Other
          </button>
        </div>
      </div>

      {/* Age Filter */}
      <div className="mb-4">
        <label className="text-black block">Age</label>
        <div className="flex justify-between items-center">
          <input
            type="number"
            name="minAge"
            min="18"
            max="99"
            value={minAge}
            onChange={handleMinAgeChange}
            className="bg-white rounded p-2 pr-6"
          />
          <span>to</span>
          <input
            type="number"
            name="maxAge"
            min="18"
            max="99"
            value={maxAge}
            onChange={handleMaxAgeChange}
            className="bg-white rounded p-2 pl-6"
          />
        </div>
        <button
          className="mt-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded"
          onClick={applyFilters}
        >
          Apply
        </button>
      </div>

      {/* Religion Filter */}
      <div className="mb-4">
        <label className="text-black block">Religion</label>
        <Select
          name="religion"
          value={religionOptions.find((option) => option.value === filters.religion)}
          onChange={(selectedOption) => handleFilterChange("religion", selectedOption?.value || "")}
          className="bg-white rounded"
          options={religionOptions}
          formatOptionLabel={({ label, icon }) => (
            <div>
              {icon}
              <span>{label}</span>
            </div>
          )}
        />
      </div>

     {/* Country Filter */}
      <div className="mb-4">
        <label className="text-black block">Country</label>
        <Select
          options={countryOptions}
          value={filters.country ? countryOptions.find((option) => option.value === filters.country) : null}
          onChange={(selectedOption) => handleFilterChange("country", selectedOption?.value || null)}
          isClearable
          isOptionSelected={(option) => filters.country === option.value}
          getOptionLabel={(option) => (
            <div>
              {option.icon} <span>{option.label}</span>
            </div>
          )}
          getOptionValue={(option) => option.value}
        />
      </div>

       {/* Height Filter */}
       <div className="mb-4">
        <label className="text-black block">Height</label>
        <div className="flex justify-between items-center">
          <input
            type="text"
            name="height"
            value={height}
            onChange={handleHeightChange}
            className="bg-white rounded py-2 px-1 mr-1"
          />
          <select
            value={heightMeasurement}
            onChange={handleHeightMeasurementChange}
            className="bg-white rounded p-2"
          >
            <option value="cm">cm</option>
            <option value="inches">inches</option>
          </select>
        </div>
      </div>

       {/* Married Status Filter */}
       <div className="mb-4">
        <label className="text-black block">Married Status</label>
        <Select
          name="marriedStatus"
          value={marriedStatusOptions.find((option) => option.value === filters.marriedStatus)}
          onChange={(selectedOption) => handleFilterChange("marriedStatus", selectedOption?.value || "")}
          className="bg-white rounded"
          options={marriedStatusOptions}
          formatOptionLabel={({ label, icon }) => (
            <div>
              {icon}
              <span>{label}</span>
            </div>
          )}
        />
      </div>

      {/* Native Language Filter */}
      <div className="mb-4">
        <label className="text-black block">Native Language</label>
        <Select
          name="nativeLanguage"
          value={languageOptions.find((option) => option.value === filters.nativeLanguage)}
          onChange={(selectedOption) => handleFilterChange("nativeLanguage", selectedOption?.value || "")}
          className="bg-white rounded"
          options={languageOptions}
          formatOptionLabel={({ label, icon }) => (
            <div>
              {icon}
              <span>{label}</span>
            </div>
          )}
        />
      </div>

      {/* Speaking Language Filter */}
      <div className="mb-4">
        <label className="text-black block">Speaking Language</label>
        <Select
          name="speakingLanguage"
          value={languageOptions.find((option) => option.value === filters.speakingLanguage)}
          onChange={(selectedOption) => handleFilterChange("speakingLanguage", selectedOption?.value || "")}
          className="bg-white rounded"
          options={languageOptions}
          formatOptionLabel={({ label, icon }) => (
            <div>
              {icon}
              <span>{label}</span>
            </div>
          )}
        />
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
