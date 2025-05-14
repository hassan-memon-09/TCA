import React from "react";
import Layout from "../Component/Layout/layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title="Contact Us | Chat App">
      <div className="bg-gray-900 text-white min-h-screen py-10 px-4 md:px-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
          <p className="text-gray-400">We’re here to help and answer any questions you might have.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img
              src="/images/Web.jpg"
              alt="Contact"
              className="w-full h-[400px] object-cover rounded-xl shadow-2xl"
            />
          </div>

          {/* Contact Form + Info */}
          <div className="lg:w-1/2 bg-gray-800 p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-gray-600">
              Contact Information
            </h2>

            <div className="space-y-4 text-gray-300 mb-8">
              <p className="flex items-center gap-2">
                <BiMailSend className="text-xl text-blue-400" />
                help@chatapp.com
              </p>
              <p className="flex items-center gap-2">
                <BiPhoneCall className="text-xl text-green-400" />
                0310-8434140
              </p>
              <p className="flex items-center gap-2">
                <BiSupport className="text-xl text-purple-400" />
                1800-0000-0000 (Toll Free)
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-600">
              Send us a message
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
