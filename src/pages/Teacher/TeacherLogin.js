import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility toggle
import "./TeacherLogin.css";

const TeacherLogin = ({ setIsLoggedIn, setUserRole }) => {
  const [logginguser, setLoggingUser] = useState("Teacher");
  const [teacherID, setTeacherID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const navigate = useNavigate();

  const API_URL =
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_URL
      : process.env.REACT_APP_DEVELOPMENT_URL;

  // Validate inputs before submission
  const validateInputs = () => {
    if (!teacherID.trim()) {
      setError("Teacher ID is required.");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate inputs
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/teacher/auth/login`, {
        teacherID,
        password,
      });

      if (response.data && response.data.teacher) {
        const { teacher, token } = response.data;

        // Save the token and teacher info to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("teacherInfo", JSON.stringify(teacher));

        // Update app state
        setIsLoggedIn(true);
        setUserRole(teacher.role);

        // Navigate to the teacher dashboard
        navigate("/teacher/teacher-dashboard");
      } else {
        throw new Error("Invalid login response from the server.");
      }
    } catch (err) {
      // Set the error message based on the backend response or use a fallback message
      setError(
        err.response?.data?.message ||
          "Failed to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
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
                  value={teacherID}
                  onChange={(e) => setTeacherID(e.target.value)} // Update email state on change
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

export default TeacherLogin;
