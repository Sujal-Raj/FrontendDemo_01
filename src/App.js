import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//Page imports

//
import Home from "./pages/Home"; // Import Home Page
import Signin from "./pages/Signin"; // Import Signin Page
import AdminLogin from "./pages/Admin/AdminLogin"; // Import Admin Login Page (if separate)
import TeacherLogin from "./pages/Teacher/TeacherLogin"; // Import Admin Login Page (if separate)
import StudentLogin from "./pages/Student/StudentLogin"; // Import Admin Login Page (if separate)
import ParentLogin from "./pages/Parent/ParentLogin"; // Import Admin Login Page (if separate)

import AdminDashboardPage from "./pages/Admin/AdminDashboardPage"; // Admin Dashboard Page
import TeacherDashboardPage from "./pages/Teacher/TeacherDashboardPage"; // Admin Dashboard Page
import StudentDashboardPage from "./pages/Student/StudentDashboardPage"; // Admin Dashboard Page
import ParentDashboardPage from "./pages/Parent/ParentDashboardPage"; // Admin Dashboard Page

import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // To store user's role
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state to wait for token validation

  // Ensure correct environment variable setup
  const API_URL =
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_URL
      : process.env.REACT_APP_DEVELOPMENT_URL;
  useEffect(() => {
    console.log("Checking for token in local storage...");
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found, validating...");
      validateToken(token); // Validate token before assuming login
    } else {
      console.log("No token found, setting loading to false.");
      setIsLoggedIn(false);
      setLoading(false); // No token, done loading
    }
  }, []);

  const validateToken = async (token) => {
    console.log("Validating token...");
    try {
      const response = await fetch(`${API_URL}/api/admin/auth/validate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Token is valid.");
        const data = await response.json();
        setIsLoggedIn(true);
        setUserRole(data.role);
        setUser(data);
        console.log("User data set:", data);
      } else {
        console.error("Token validation failed. Logging out.");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
        setUserRole(null);
      }
    } catch (error) {
      console.error("Error validating token:", error);
      setIsLoggedIn(false);
      setUser(null);
      setUserRole(null);
    } finally {
      console.log("Token validation complete.");
      setLoading(false); // Finished loading
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); // Clear role
    setIsLoggedIn(false);
    setUser(null);
    setUserRole(null);
  };

  if (loading) {
    console.log("Loading state: true");
    return <div>Loading...</div>; // Show loading state while validating the token
  }

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        user={user} // Pass user data to Navbar
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Home />} />
        <Route
          path="/signin"
          element={
            <Signin setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
          }
        />
        <Route
          path="/admin-login"
          element={
            <AdminLogin
              setIsLoggedIn={setIsLoggedIn}
              setUserRole={setUserRole}
            />
          }
        />
        <Route
          path="/teacher-login"
          element={
            <TeacherLogin
              setIsLoggedIn={setIsLoggedIn}
              setUserRole={setUserRole}
            />
          }
        />
        <Route
          path="/student-login"
          element={
            <StudentLogin
              setIsLoggedIn={setIsLoggedIn}
              setUserRole={setUserRole}
            />
          }
        />
        <Route
          path="/parent-login"
          element={
            <ParentLogin
              setIsLoggedIn={setIsLoggedIn}
              setUserRole={setUserRole}
            />
          }
        />
        {/* Admin Dashboard Route */}
        <Route
          path="admin/admin-dashboard"
          element={
            isLoggedIn && userRole === "admin" ? (
              <AdminDashboardPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/teacher/teacher-dashboard"
          element={
            isLoggedIn ? (
              <TeacherDashboardPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/student/student-dashboard"
          element={
            isLoggedIn && userRole === "student" ? (
              <StudentDashboardPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/parent/parent-dashboard"
          element={
            isLoggedIn && userRole === "parent" ? (
              <ParentDashboardPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* ======================================================================================================= */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
