import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import BlogPage from "./pages/BlogPage";
import SelectRole from "./pages/SelectRole";
import WriterDashboard from "./pages/WriterDashboard";
import ReaderDashboard from "./pages/ReaderDashboard";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>
      <NavbarComponent darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Landing darkMode={darkMode} />} />
        <Route path="/login" element={<Login darkMode={darkMode} />} />
        <Route path="/signup" element={<Signup darkMode={darkMode} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<BlogPage />} /> {/* ✅ New route */}
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/writer-dashboard" element={<WriterDashboard />} />
        <Route path="/reader-dashboard" element={<ReaderDashboard />} />
      </Routes>
      <Footer darkMode={darkMode} />
    </>
  );
}

export default App;
