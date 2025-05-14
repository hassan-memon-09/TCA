import React from "react";
import Layout from "../Component/Layout/layout";

const AboutPage = () => {
  return (
    <Layout title="About Us | Chat App">
      <div className="bg-gray-900 text-white min-h-screen py-12 px-4 md:px-20">
        {/* Hero Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Chat App</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover how Chat App revolutionizes communication with modern tech, privacy-first features, and real-time speed.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image */}
          <div className="lg:w-1/2">
            <img
              src="/images/web 2.jpg"
              alt="About Chat App"
              className="w-full h-full max-h-[500px] object-cover rounded-xl shadow-2xl"
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2 border-gray-600">
              Our Mission
            </h2>
            <p className="text-gray-300 text-justify">
              At <span className="text-blue-400 font-semibold">Chat App</span>, our goal is to create a fast, reliable, and private messaging platform tailored for today’s digital world. Whether you're connecting with loved ones or collaborating professionally, we strive to make communication effortless.
            </p>

            <h2 className="text-2xl font-semibold border-b pb-2 border-gray-600">
              Technologies We Use
            </h2>
            <p className="text-gray-300 text-justify">
              Built with <span className="text-green-400 font-semibold">React.js</span>, <span className="text-yellow-400 font-semibold">Node.js</span>, <span className="text-purple-400 font-semibold">MongoDB</span>, and <span className="text-pink-400 font-semibold">Socket.IO</span>, our application is designed for performance and scalability.
            </p>

            <h2 className="text-2xl font-semibold border-b pb-2 border-gray-600">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>🔒 Privacy-first design — your chats are secure</li>
              <li>⚡ Real-time messaging with low latency</li>
              <li>📱 Responsive and mobile-friendly UI</li>
              <li>💬 Simple, intuitive chat experience</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
