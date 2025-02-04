import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaUsers,
  FaUserGraduate,
} from "react-icons/fa"; // Importing icons for each role
import "./Signin.css"; // Custom styles for the Signin page
import { useState } from "react";

const Signin = ({ setIsLoggedIn, setUserRole }) => {
  const [logginguser, setLoggingUser] = useState("");
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [role, setRole] = useState(""); // Role state
  const [loading, setLoading] = useState(false); // Loading indicator state
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for programmatic navigation

  const API_URL = process.env.REACT_APP_NODE_ENV === "production"
  ? process.env.REACT_APP_PRODUCTION_URL
  : process.env.REACT_APP_DEVELOPMENT_URL;

  // Function to navigate to the respective login page based on role
  // const handleRoleClick = (role) => {
  //   navigate(`/${role}-login`); // Dynamically navigates to the respective login page
  // };

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
    <>
      <Container className="login-container">
        <Card className="login-card">
          <Card.Body>
            <h3>Login</h3>
            <Form>
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
                  <option value="admin" selected>Select a role</option>
                  <option value="admin">Admin</option>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
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
      {/* </Container>   */}
    </>
  );
};

export default Signin;
