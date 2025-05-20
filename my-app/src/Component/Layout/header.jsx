import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import { useAuthStore } from "../../store/useAuthStore";

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center text-white text-xl font-semibold">
            <CiChat1 className="mr-2 text-2xl" /> Chat-App
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-4">
            <NavLink to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
            <NavLink to="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</NavLink>
            <NavLink to="/policy" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</NavLink>
            <NavLink to="/chat" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Chat</NavLink>
            {!user ? (
              <>
                <NavLink to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</NavLink>
                <NavLink to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>
              </>
            ) : (
              <div className="relative">
                <button onClick={toggleDropdown} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {user?.name}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-10">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-800">
          <NavLink to="/" className="mobile-link">Home</NavLink>
          <NavLink to="/contact" className="mobile-link">Contact</NavLink>
          <NavLink to="/policy" className="mobile-link">About</NavLink>
          <NavLink to="/chat" className="mobile-link">Chat</NavLink>
          {!user ? (
            <>
              <NavLink to="/register" className="mobile-link">Register</NavLink>
              <NavLink to="/login" className="mobile-link">Login</NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="mobile-link text-left w-full">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
