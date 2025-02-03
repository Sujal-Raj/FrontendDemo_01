import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ParentLogin.css"; // Ensure this file exists for styling

const ParentLogin = ({ setIsLoggedIn, setUserRole }) => {
  // State variables
  const [parentID, setParentID] = useState(""); // Parent ID input
  const [password, setPassword] = useState(""); // Password input
  const [loading, setLoading] = useState(false); // Loading indicator
  const [error, setError] = useState(""); // Error message

  const navigate = useNavigate(); // Hook for navigation

  const API_URL =
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_URL
      : process.env.REACT_APP_DEVELOPMENT_URL;

  // Function to handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true);
    setError(""); // Reset error before new request

    console.log("Submitting Parent Login...");
    console.log("ParentID:", parentID);

    try {
      // Send login request to backend
      const response = await axios.post(`${API_URL}/api/parent/auth/login`, {
        parentID,
        password,
      });

      console.log("Login successful:", response.data);

      // Store the JWT token in localStorage
      localStorage.setItem("token", response.data.token);
      console.log("Token stored successfully.");

      // Save parent data in localStorage
      const parentData = response.data.data;
      localStorage.setItem("parentInfo", JSON.stringify(parentData));
      console.log("Parent data stored:", parentData);

      // Update authentication state
      setIsLoggedIn(true);
      setUserRole("parent"); // Explicitly setting role to "parent"

      console.log("Redirecting to Parent Dashboard...");
      navigate("/parent/parent-dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
      console.log("Login request completed.");
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h3>Parent Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formParentID">
              <Form.Label>Parent ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Parent ID"
                value={parentID}
                onChange={(e) => setParentID(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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

export default ParentLogin;
