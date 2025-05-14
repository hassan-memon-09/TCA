import React from "react";
import Layout from "../Component/Layout/layout";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { FaComments, FaLock, FaMobileAlt, FaBolt } from "react-icons/fa";

const HomePage = () => {
  // const { user, clearAuth } = useAuthStore();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   clearAuth();
  //   navigate("/login");
  // };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <FaComments className="text-6xl text-blue-500 animate-pulse mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-400">Chat-App</span>
        </h1>

        <p className="text-lg text-gray-300 max-w-xl mb-6">
          Connect instantly, securely, and easily with your friends and community using our modern chat application.
        </p>
{/* 
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-semibold text-white transition transform hover:scale-105 duration-200"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-4">
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold transition transform hover:scale-105 duration-200">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition transform hover:scale-105 duration-200">
                Register
              </button>
            </Link>
          </div>
        )} */}
      </div>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Choose Chat-App?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white shadow-lg hover:shadow-xl rounded-xl p-6 min-h-[18rem] flex flex-col items-center text-center transition duration-300 transform hover:-translate-y-1">
              <FaBolt className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Realtime Chat</h3>
              <p className="text-gray-600">
                Send and receive messages instantly. Stay connected with zero delay using our fast backend.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg hover:shadow-xl rounded-xl p-6 min-h-[18rem] flex flex-col items-center text-center transition duration-300 transform hover:-translate-y-1">
              <FaLock className="text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your chats are encrypted and safe. We prioritize your privacy and data security.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg hover:shadow-xl rounded-xl p-6 min-h-[18rem] flex flex-col items-center text-center transition duration-300 transform hover:-translate-y-1">
              <FaMobileAlt className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">
                Whether you're on desktop or mobile, our chat app is fully responsive and works everywhere.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
