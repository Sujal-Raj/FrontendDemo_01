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
  const [teacherID, setTeacherID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <Container className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h3>Teacher Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTeacherID">
              <Form.Label>Teacher ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Teacher ID"
                value={teacherID}
                onChange={(e) => setTeacherID(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button type="submit" disabled={loading} className="w-100 mt-3">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TeacherLogin;
