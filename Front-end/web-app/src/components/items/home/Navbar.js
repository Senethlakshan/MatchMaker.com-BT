import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import brandlogo from "../../../assests/home/b1.jpeg";
import ResponsiveDialog from "../home/alert";
import axiosInstance from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = localStorage.getItem("login");

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLogout = () => {
    // Handle logout logic
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    // Optionally, you can perform any additional logic after closing the dialog
    // For example, you can navigate to another page or execute specific actions
  };

  const logout = () => {
    // Make a POST request to the logout endpoint
    axiosInstance
      .get("/logout")
      .then((response) => {
        // Handle the response
        console.log(response.data); // Assuming the response contains a 'message' field
        // Handle logout logic
        toast.success("Logout successful");
        localStorage.removeItem("login");
        localStorage.removeItem("api_token");
        handleCloseDialog();
        window.location.href = "/";
      })
      .catch((error) => {
        // Handle the error
        console.error(error);

        // Perform any error handling or display error messages to the user
      });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex items-center">
            <Link to="/" className="text-yellow-600 text-lg font-bold">
              <img src={brandlogo} alt="logo" />
            </Link>
          </div>

          <div className="hidden md:flex">
            <Link
              to="/"
              className="ml-4 text-xl text-yellow-600 hover:text-yellow-500 relative group"
              style={{
                fontFamily: "Berkshire Swash, cursive",
                marginRight: "10px",
              }}
            >
              <span className="relative p-3">
                Home
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-800 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </Link>
            <Link
              to="/about"
              className="ml-4 text-xl text-yellow-600 hover:text-yellow-500 relative group"
              style={{
                fontFamily: "Berkshire Swash, cursive",
                marginRight: "10px",
              }}
            >
              <span className="relative p-3">
                About
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-800 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </Link>
            <Link
              to="/user-panel"
              className="ml-4 text-xl text-yellow-600 hover:text-yellow-500 relative group"
              style={{
                fontFamily: "Berkshire Swash, cursive",
                marginRight: "10px",
              }}
            >
              <span className="relative p-3">
                Contact
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-800 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="hidden md:flex">
            {login === "true" ? (
              <div>
                <button
                  className="ml-4 text-xl bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-1 px-4 rounded transition-all hover:bg-gradient-to-r hover:from-yellow-800 hover:to-yellow-600 transform-gpu hover:scale-110"
                  style={{ fontFamily: "Berkshire Swash, cursive" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>

                <ResponsiveDialog
                  open={dialogOpen}
                  onClose={handleCloseDialog}
                  contentText="Are you sure you want to logout? Logging out will end your current session."
                  contentTitle="Logout Confirmation"
                  actionButtonLabel="Logout"
                  onActionButtonClick={logout}
                />
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="ml-4 text-xl bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-1 px-4 rounded transition-all hover:bg-gradient-to-r hover:from-yellow-800 hover:to-yellow-600 transform-gpu hover:scale-110"
                  style={{ fontFamily: "Berkshire Swash, cursive" }}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="ml-4 text-xl bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-1 px-4 rounded transition-all hover:bg-gradient-to-r hover:from-yellow-800 hover:to-yellow-600 transform-gpu hover:scale-110"
                  style={{ fontFamily: "Berkshire Swash, cursive" }}
                >
                  Register
                </Link>
              </>
            )}

            {/* additinal button style  */}

            {/* <Link to="/login">
              <div class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-4 border-yellow-800 rounded-full shadow-md group">
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-yellow-600 to-yellow-800 group-hover:translate-x-0 ease">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span class="absolute flex items-center justify-center w-full h-full text-white text-xl transition-all duration-300 transform group-hover:translate-x-full ease"
                  style={{ fontFamily: 'Berkshire Swash, cursive' }}
                >Login</span>
                <span class="relative invisible">Button Text</span>
              </div>
            </Link>
            <Link to="/register">
              <div class=" ml-4 relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-4 border-yellow-800 rounded-full shadow-md group">
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-yellow-600 to-yellow-800 group-hover:translate-x-0 ease">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span class="absolute flex items-center justify-center w-full h-full text-white text-xl transition-all duration-300 transform group-hover:translate-x-full ease"
                  style={{ fontFamily: 'Berkshire Swash, cursive' }}
                >Register</span>
                <span class="relative invisible">Button Text</span>
              </div>
            </Link> */}
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col mt-2 py-2 px-4 bg-gray-700">
              <Link
                to="/"
                className="ml-4 text-xl text-yellow-600 hover:text-yellow-500 relative group"
                style={{
                  fontFamily: "Berkshire Swash, cursive",
                  marginRight: "10px",
                }}
              >
                <span className="relative">Home</span>
              </Link>
              <Link
                to="/about"
                className="ml-4 text-xl text-yellow-600 hover:text-yellow-500 relative group"
                style={{
                  fontFamily: "Berkshire Swash, cursive",
                  marginRight: "10px",
                }}
              >
                <span className="relative">About</span>
              </Link>
              <Link
                to="/contact"
                className="ml-4 text-xl text-yellow-600 hover:text-yellow-500 relative group"
                style={{
                  fontFamily: "Berkshire Swash, cursive",
                  marginRight: "10px",
                }}
              >
                <span className="relative">Contact</span>
              </Link>

              {/* logo and register button responsive */}

              {login === "true" ? (
                <div>
                  <button
                    className="ml-4 text-xl bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-1 px-4 rounded transition-all hover:bg-gradient-to-r hover:from-yellow-800 hover:to-yellow-600 transform-gpu hover:scale-110"
                    style={{ fontFamily: "Berkshire Swash, cursive" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                  <ResponsiveDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    contentText="Are you sure you want to logout? Logging out will end your current session."
                    contentTitle="Logout Confirmation"
                    actionButtonLabel="Logout"
                    onActionButtonClick={logout}
                  />
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mt-2 text-xl bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-1 px-4 rounded transition-all hover:bg-gradient-to-r hover:from-yellow-800 hover:to-yellow-600 transform-gpu hover:scale-110 text-white mb-2"
                    style={{ fontFamily: "Berkshire Swash, cursive" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className=" text-xl bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-1 px-4 rounded transition-all hover:bg-gradient-to-r hover:from-yellow-800 hover:to-yellow-600 transform-gpu hover:scale-110 text-white mb-2"
                    style={{ fontFamily: "Berkshire Swash, cursive" }}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
