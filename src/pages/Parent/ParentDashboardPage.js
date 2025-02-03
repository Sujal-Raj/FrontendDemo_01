import React from "react";
import {
  FaUserAlt,
  FaChartLine,
  FaFileAlt,
  FaCalendarAlt,
  FaClock,
  FaClipboardList,
  FaMoneyBillWave,
  FaBell,
} from "react-icons/fa";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ParentDashboardPage.css";

const dashboardSections = [
  {
    title: "Child Management",
    description: "View and manage your child's profile and performance.",
    cards: [
      {
        icon: <FaUserAlt size={50} />,
        title: "My Child's Profile",
        page: "child-profile",
      },
      {
        icon: <FaChartLine size={50} />,
        title: "My Child's Performance",
        page: "child-performance",
      },
      {
        icon: <FaFileAlt size={50} />,
        title: "Result",
        page: "result",
      },
    ],
  },
  {
    title: "Academic Information",
    description: "Stay updated with academic schedules and events.",
    cards: [
      {
        icon: <FaCalendarAlt size={50} />,
        title: "Academic Calendar",
        page: "academic-calendar",
      },
      {
        icon: <FaClock size={50} />,
        title: "Timetable",
        page: "timetable",
      },
      {
        icon: <FaClipboardList size={50} />,
        title: "Exam Schedule",
        page: "exam-schedule",
      },
    ],
  },
  {
    title: "Finance & Notifications",
    description: "Manage fees and get important updates.",
    cards: [
      {
        icon: <FaMoneyBillWave size={50} />,
        title: "Pay Fee",
        page: "pay-fee",
      },
      {
        icon: <FaBell size={50} />,
        title: "Notifications",
        page: "notifications",
      },
    ],
  },
];

const ParentDashboardPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (page) => {
    navigate(`/parent/${page}`);
  };

  const handleProfileClick = () => {
    navigate("/parent/profile");
  };

  return (
    <div className="parent-dashboard">
      <h2 className="text-center mb-5">Parent Dashboard</h2>

      {/* Parent Profile Section */}
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
              <h5 className="card-title mb-2">My Profile</h5>
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

export default ParentDashboardPage;
