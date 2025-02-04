import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css"; // Ensure this file exists for styling

const AdminLogin = ({ setIsLoggedIn, setUserRole }) => {
  // State variables to manage form inputs, loading state, and error messages
  const[role, setRole] = useState("admin");
  const[logginguser, setLoggingUser] = useState("Admin");
  const [adminID, setAdminID] = useState(""); // Admin ID input state
  const [password, setPassword] = useState(""); // Password input state
  const [loading, setLoading] = useState(false); // Loading indicator state
  const [error, setError] = useState(""); // Error message state

  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  const API_URL =
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_URL
      : process.env.REACT_APP_DEVELOPMENT_URL;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true to indicate process is ongoing
    setError(""); // Reset error message before submission

    console.log("Submitting login form..."); // Log form submission
    console.log("AdminID:", adminID); // Log AdminID entered by the user
    console.log("Password:", password); // Log Password entered by the user

    try {
      // Send login request to the backend API
      const response = await axios.post(
        `${API_URL}/api/admin/auth/login`, // Corrected URL with backticks
        {
          adminID, // Payload: AdminID
          password, // Payload: Password
        }
      );

      console.log("Login successful. Response data:", response.data); // Log success response

      // Store the JWT token in localStorage for authentication purposes
      localStorage.setItem("token", response.data.token);
      console.log("Token saved to localStorage:", response.data.token); // Log token storage

      // Save admin data (excluding sensitive info) to localStorage
      const adminData = response.data.data; // Extract admin data from the response
      localStorage.setItem("adminInfo", JSON.stringify(adminData));
      console.log("Admin data saved to localStorage:", adminData); // Log admin data storage

      // Update application state for logged-in status and user role
      setIsLoggedIn(true); // Update state to reflect logged-in status
      setUserRole(adminData.role); // Update state with the admin's role

      console.log("Navigating to admin dashboard..."); // Log navigation action
      navigate("/admin/admin-dashboard"); // Redirect user to admin dashboard
    } catch (err) {
      console.error("Login failed. Error:", err); // Log the error

      // Extract error message from the backend or show a generic message
      setError(err.response?.data?.message || "An error occurred during login");
      console.log("Error message displayed to user:", error); // Log the error message shown to user
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
      console.log("Login request process completed."); // Log the end of the process
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value); // Update role state on change
    switch (e.target.value) {
      case "admin":
        setLoggingUser("Admin");
        break;
      case "teacher":
        setLoggingUser("Teacher");
        break;
      case "parent":
        setLoggingUser("Parent");
        break;
      case "student":
        setLoggingUser("Student");
        break;
      default:
        setLoggingUser("Admin");
    }

    handleRoleNavigation(e.target.value);
  }

  const handleRoleNavigation = (selectedRole) => {
    switch (selectedRole) {
      case "admin":
        navigate("/admin-login");
        break;
      case "teacher":
        navigate("/teacher-login");
        break;
      case "student":
        navigate("/student-login");
        break;
      case "parent":
        navigate("/parent-login");
        break;
      default:
        navigate("/admin-login");
    }
  };

  return (
    <Container className="login-container">
            <Card className="login-card">
              <Card.Body>
                <h3>Login</h3>
                <Form onSubmit={handleSubmit}>
                  {" "}
                  {/* Login form */}
                  <Form.Group controlId="formRole" className="mt-3">
                    <Form.Label>Role</Form.Label> {/* Label for Role */}
                    <Form.Select
                      required
                      value={role}
                      // onChange={(e) => setRole(e.target.value)}
                      onChange={handleRoleChange}
                    >
                      {/* <option value="">Select a role</option> */}
                      <option value="admin" selected>Admin</option>
                      <option value="teacher">Teacher</option>
                      <option value="parent">Parent</option>
                      <option value="student">Student</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>{logginguser} ID</Form.Label> {/* Label for Email */}
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={adminID}
                      onChange={(e) => setAdminID(e.target.value)} // Update email state on change
                      required // Make this field mandatory
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label> {/* Label for Password */}
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update password state on change
                      required // Make this field mandatory
                    />
                  </Form.Group>
                  
                  <Button type="submit" disabled={loading} className="w-100 mt-3">
                    {loading ? "Logging in..." : "Login"}{" "}
                    {/* Show loading text if processing */}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
  );
};

export default AdminLogin;
