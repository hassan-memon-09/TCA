import React from "react";
import Layout from "../Component/Layout/layout";

const AboutPage = () => {
  return (
    <Layout title="About Us | Chat App">
      <div className="flex flex-col md:flex-row items-center justify-center bg-gray-900 text-white min-h-screen p-6">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="/images/about.jpeg"
            alt="About"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 border-b pb-2 border-gray-700 text-center">
            About Chat App
          </h1>
          <p className="text-gray-300 text-justify">
            Chat App is a real-time messaging platform designed for smooth and
            private communication. Built using the latest technologies like
            React, Node.js, and Socket.IO, we aim to deliver a seamless chatting
            experience to all our users. Our platform focuses on speed,
            reliability, and user privacy — making it the ideal choice for
            connecting with friends, family, or colleagues.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
