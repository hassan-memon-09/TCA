import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import AboutPage from "./Pages/AboutPage";
import PagenotFound from "./Pages/PagenotFound";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ChatPage from "./Pages/Chat";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route
          path="/chat"
          element={token ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<PagenotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;