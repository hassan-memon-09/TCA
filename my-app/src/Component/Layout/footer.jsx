import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl font-semibold mb-4">All Rights Reserved</h1>
        <p className="text-lg">
          <Link to="/about" className="hover:text-indigo-400 transition duration-300 ease-in-out mx-2">
            About
          </Link>
          | 
          <Link to="/contact" className="hover:text-indigo-400 transition duration-300 ease-in-out mx-2">
            Contact
          </Link>
          | 
          <Link to="/policy" className="hover:text-indigo-400 transition duration-300 ease-in-out mx-2">
            Privacy Policy
          </Link>
        </p>
        <p className="text-sm mt-4 text-gray-400">
          &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
