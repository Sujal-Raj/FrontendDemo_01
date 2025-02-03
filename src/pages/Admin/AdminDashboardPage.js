import React from "react";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsersCog,
  FaRegCalendarAlt,
  FaBell,
  FaUserAlt,
} from "react-icons/fa";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboardPage.css";

const dashboardSections = [
  {
    title: "User Registration",
    description: "Manage registrations for admins, teachers, and students.",
    cards: [
      {
        icon: <FaUserShield size={50} />,
        title: "Admin Register",
        page: "register-admin",
      },
      {
        icon: <FaChalkboardTeacher size={50} />,
        title: "Teacher Register",
        page: "register-teacher",
      },
      {
        icon: <FaUserGraduate size={50} />,
        title: "Student Register",
        page: "register-student",
      },
    ],
  },
  {
    title: "Academic Management",
    description: "Manage classes, teacher assignments, and student details.",
    cards: [
      {
        icon: <FaRegCalendarAlt size={50} />,
        title: "Class Management",
        page: "class-management",
      },
      {
        icon: <FaUsersCog size={50} />,
        title: "Teacher Management",
        page: "teacher-management",
      },
      {
        icon: <FaUserGraduate size={50} />,
        title: "Student Management",
        page: "student-management",
      },
    ],
  },

  {
    title: "Notification Management",
    description:
      "Send and manage important notifications to staff and students.",
    cards: [
      {
        icon: <FaBell size={50} />,
        title: "Create Notification",
        page: "notifications",
      },
    ],
  },
];

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (page) => {
    navigate(`/admin/${page}`);
  };

  const handleProfileClick = () => {
    navigate("/admin/profile");
  };

  return (
    <div className="admin-dashboard">
      <h2 className="text-center mb-5">Admin Dashboard</h2>

      {/* Profile Management */}
      <Row className="justify-content-center mb-3">
        <Col xs={12} sm={6} md={3}>
          <Card
            className="dashboard-card shadow-sm"
            onClick={handleProfileClick}
            style={{
              cursor: "pointer",
              padding: "1px",
              textAlign: "match-parent",
            }}
          >
            <Card.Body className="text-center p-3">
              <div className="card-icon mb-2">
                <FaUserAlt size={30} /> {/* Reduced icon size */}
              </div>
              <h5 className="card-title mb-2">Profile Management</h5>
              <Button
                variant="primary"
                className="dashboard-btn"
                style={{ padding: "8px 16px", fontSize: "14px" }}
              >
                Go to Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Dashboard Sections */}
      {dashboardSections.map((section, index) => (
        <div
          key={index}
          className="category-section mb-5 p-3"
          style={{
            background: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 className="category-title">{section.title}</h3>
          <p className="category-description">{section.description}</p>
          <Row className="justify-content-center">
            {section.cards.map((card, cardIndex) => (
              <Col key={cardIndex} xs={12} sm={6} md={3}>
                <Card
                  className="dashboard-card shadow-sm"
                  onClick={() => handleCardClick(card.page)}
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Card.Body className="text-center">
                    <div className="card-icon mb-3">{card.icon}</div>
                    <h5 className="card-title">{card.title}</h5>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboardPage;
