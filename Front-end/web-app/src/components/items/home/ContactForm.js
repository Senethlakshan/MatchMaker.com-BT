import React from 'react';

function ContactForm() {
  return (
    <div>
          
    <div className="flex justify-center mt-5 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-xl">
      <div className="w-1/2 p-8">
        {/* Left side: Form */}
        <div className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-2xl">Get Started</h2>
        </div>
      </div>
      <div className="w-1/2 p-8">
        {/* Right side: "Get Started" text */}

        <div className='bg-white p-5 rounded-xl'>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tel" className="block text-lg mb-2">
              Telephone:
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your telephone number"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-tr from-amber-900 to-yellow-300 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        </div>
      </div>
    </div>
   </div> 
  );
}

export default ContactForm;