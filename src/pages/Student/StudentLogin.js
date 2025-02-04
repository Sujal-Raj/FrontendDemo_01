import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentLogin.css"; // Ensure this file exists for styling

const StudentLogin = ({ setIsLoggedIn, setUserRole }) => {
  const [logginguser, setLoggingUser] = useState("Student");
  // State variables for managing input, loading, and error messages
  const [studentID, setStudentID] = useState(""); // Student ID input state
  const [password, setPassword] = useState(""); // Password input state
  const [loading, setLoading] = useState(false); // Loading indicator state
  const [role, setRole] = useState("student"); // Role state
  const [error, setError] = useState(""); // Error message state

  const navigate = useNavigate(); // Hook to navigate between routes

  const API_URL =
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_URL
      : process.env.REACT_APP_DEVELOPMENT_URL;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true); // Show loading state
    setError(""); // Reset error state

    try {
      // Send login request to the backend API
      const response = await axios.post(`${API_URL}/api/student/auth/login`, {
        studentID, // Payload: Student ID
        password, // Payload: Password
      });

      console.log("Login successful. Response data:", response.data);

      // Store the JWT token and student data in localStorage
      localStorage.setItem("token", response.data.token);
      console.log("Token saved to localStorage:", response.data.token);

      const studentData = response.data.data; // Extract student data
      localStorage.setItem("studentInfo", JSON.stringify(studentData));
      console.log("Student data saved to localStorage:", studentData);

      // Update application state for logged-in status and user role
      setIsLoggedIn(true); // Set logged-in state
      setUserRole("student"); // Set role to "student"

      console.log("Navigating to student dashboard...");
      navigate("/student/student-dashboard"); // Redirect to student dashboard
    } catch (err) {
      console.error("Login failed. Error:", err);
      // Show error message from backend or a generic message
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false); // End loading state
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
                          value={studentID}
                          onChange={(e) => setStudentID(e.target.value)} // Update email state on change
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

export default StudentLogin;
