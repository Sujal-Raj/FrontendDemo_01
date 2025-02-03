import React from "react";
import {
  FaUserAlt,
  FaChartLine,
  FaClipboardList,
  FaRegBell,
  FaMoneyBill,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentDashboardPage.css";

const dashboardSections = [
  {
    title: "My Academics",
    description: "Access and manage academic-related information.",
    cards: [
      {
        icon: <FaChalkboardTeacher size={50} />,
        title: "My Class",
        page: "my-class",
      },
      {
        icon: <FaClipboardList size={50} />,
        title: "My Results",
        page: "my-results",
      },
      {
        icon: <FaChartLine size={50} />,
        title: "My Performance",
        page: "my-performance",
      },
    ],
  },
  {
    title: "My Schedule",
    description: "View and manage your schedule.",
    cards: [
      {
        icon: <FaCalendarAlt size={50} />,
        title: "My Time Table",
        page: "my-timetable",
      },
      {
        icon: <FaBook size={50} />,
        title: "My Syllabus",
        page: "my-syllabus",
      },
    ],
  },
  {
    title: "Financial & Notifications",
    description: "View your fee status and stay updated with notices.",
    cards: [
      {
        icon: <FaMoneyBill size={50} />,
        title: "My Fee Status",
        page: "my-fee-status",
      },
      {
        icon: <FaRegBell size={50} />,
        title: "Notice Board",
        page: "notice-board",
      },
    ],
  },
];

const StudentDashboardPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (page) => {
    navigate(`/student/${page}`);
  };

  const handleProfileClick = () => {
    navigate("/student/profile");
  };

  return (
    <div className="student-dashboard">
      <h2 className="text-center mb-5">Student Dashboard</h2>

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

export default StudentDashboardPage;
