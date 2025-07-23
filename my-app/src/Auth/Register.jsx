import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../Component/Layout/layout";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { useAuthStore } from "../store/useAuthStore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        const loginRes = await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/v1/auth/login`, {
          email,
          password,
        });

        if (loginRes.data.success) {
          setAuth(loginRes.data.user, loginRes.data.token);
          navigate("/");
        } else {
          toast.error(loginRes.data.message);
          navigate("/login");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
        <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name Field */}
            <div className="relative">
  <HiOutlineUser className="absolute left-4 top-3.5 text-gray-400 text-xl" />
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Enter Your Name"
    className="w-full pl-14 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
    autoFocus
  />
</div>

            {/* Email Field */}
            <div className="relative">
  <HiOutlineMail className="absolute left-4 top-3.5 text-gray-400 text-xl" />
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter Your Email"
    className="w-full pl-14 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
</div>

            {/* Password Field */}
          <div className="relative">
  <HiOutlineLockClosed className="absolute left-4 top-3.5 text-gray-400 text-xl" />
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter Your Password"
    className="w-full pl-14 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
</div>

            {/* Phone Field */}
      <div className="relative">
  <HiOutlinePhone className="absolute left-4 top-3.5 text-gray-400 text-xl" />
  <input
    type="text"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Enter Your Phone Number"
    className="w-full pl-14 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
</div>

            {/* Address Field */}
            <div className="relative">
  <HiOutlineLocationMarker className="absolute left-4 top-3.5 text-gray-400 text-xl" />
  <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="Enter Your Address"
    className="w-full pl-14 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
</div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
