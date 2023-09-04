import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import LottieAnimation from "lottie-react";
import animationData from "../../../assests/home/bg-remover/lottie/login.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link } from "react-router-dom";
import axiosInstance from '../../../api';

function LoginPage() {
  const fadeAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 500 },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform email and password validation
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Make API call to login endpoint
    // Create data object to send to the backend API
const data = {
  email: email,
  password: password,
};

// Make Axios POST request to backend API for login
axiosInstance
  .post('/login', data)
  .then((response) => {
    console.log(response.data);
    // Get the token from the response
    const token = response.data.token;

    localStorage.setItem('api_token', token);
    // Display success message
    toast.success('Login successful');
    localStorage.setItem('login', 'true');
    // Do something after a successful login, such as redirecting to the next page
    window.location.href = '/user-panel';
  })
  .catch((error) => {
    // Check if the error response contains validation errors
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessages = error.response.data.errors;
      // Display the error message for the 'email' field
      if (errorMessages.email && errorMessages.email.length > 0) {
        toast.error(errorMessages.email[0]);
      } else if (errorMessages.password && errorMessages.password.length > 0) {
        toast.error(errorMessages.password[0]);
      } else {
        toast.error('Login failed');
      }
    } else if (error.response && error.response.data && error.response.data.message) {
      // Display the error message from the response
      toast.error(error.response.data.message);
    } else {
      // Handle other types of errors
      toast.error('Login failed');
    }
  });

  };

  const validateEmail = (email) => {
    // Use a regular expression to validate email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-amber-900 to-yellow-300">
      <animated.div className="" style={fadeAnimation}>
        {/* animated svg */}
        <div className="flex h-screen">
          <div className="w-1/2 flex items-center justify-center">
            <LottieAnimation
              lottieRef={(ref) => ref && ref.setSpeed(0.5)}
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          {/* login form */}
          <div className="w-1/2 flex items-center justify-center  ">
            <div className="p-6 max-w-sm w-full border-2 border-solid border-gray-300 rounded-lg bg-white">
              <h2 className="text-2xl font-semibold  flex items-center justify-center mb-6">
                <FaUserAlt className="mr-2" />
                Login
              </h2>
              <form onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none mb-4"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none pr-10 mb-4"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-tr from-amber-900 to-yellow-300 text-white font-bold "
                >
                  Login
                </button>
                {/* Remember me forget password */}
                <div className="flex items-center justify-between mt-6 mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-500"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className="ml-2 text-gray-700">Remember me</span>
                  </label>
                  {/* forget password */}
                  <Link to="/forget-password">
                    <div className="text-m text-blue-500 hover:text-blue-700">
                      Forgot password?
                    </div>
                  </Link>
                </div>
                
                {/* create new register : need help?  */}
                <div className="flex mt-6 bg-slate-200 p-3 rounded-xl justify-between">
                <Link to="/register">
                <div className="text-black text-sm">
                    <p>Create New An Account</p>
                  </div>
                  </Link>
                  <div className="text-black text-sm">
                    <h2>Need Help?</h2>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </animated.div>
    </div>
  );
}

export default LoginPage;
