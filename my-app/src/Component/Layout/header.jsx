import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import { useAuthStore } from "../../store/useAuthStore";

const Header = () => {
  const { user, clearAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For logout dropdown

  const handleLogout = () => {
    logout(); 
    navigate("/login");   };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMobileMenu} // Toggle the mobile menu
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="text-white text-xl font-semibold flex items-center">
              <CiChat1 className="mr-2 text-2xl" /> Chat-App
            </Link>
          </div>

          {/* Navbar Links (Desktop and Mobile) */}
          <div className={`flex items-center justify-center sm:ml-6 ${isMobileMenuOpen ? "block" : "hidden"} sm:block`}>
            <div className="flex space-x-4">
              <NavLink
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </NavLink>
              <NavLink
                to="/contact"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </NavLink>
              {!user ? (
                <>
                  <NavLink
                    to="/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <div className="relative">
                  <button
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onClick={toggleDropdown} // Toggle the dropdown visibility
                    aria-haspopup="true"
                  >
                    {user?.name}
                  </button>
                  {/* Dropdown Menu for Logout */}
                  {isDropdownOpen && (
                    <div className="absolute bg-gray-800 shadow-md rounded-md mt-1 right-0 w-40 z-10">
                      <button
                        onClick={handleLogout}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
              <NavLink
                to="/policy"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Policy
              </NavLink>
              <NavLink
                to="/chat"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Chat
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
