import React from 'react';

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form name="loginForm" className="space-y-4" onFinish={onFinish}>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Log in
            </button>
          </div>
          <div className='w-full rounded-md '>
            <h2 className='text-blue-500 hover:text-blue-600 text-center'>Forget Password ?</h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
