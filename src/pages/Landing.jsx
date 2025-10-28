import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FaRobot,
  FaPenFancy,
  FaUserFriends,
  FaChartBar,
  FaRegLightbulb,
  FaSearch,
  FaRegBookmark,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// ✅ Accept darkMode as a prop (or set a default)
const Landing = ({ darkMode = false }) => {
  const navigate = useNavigate();

  return (
    <>
      <section className="landing-section py-5">
        <Container className="text-center">
          <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
          <h1 className="fw-bold mb-4 my-4">
            Welcome to <span className="text-primary">AI-BlogSphere</span>
          </h1></motion.div>
          <p className="lead text mb-4">
            Your intelligent content companion — create, explore, and get
            AI-powered blog recommendations effortlessly.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="mb-5"
            onClick={() => navigate("/signup")} // 👈 redirects to signup page
          >
            Get Started
          </Button>

          {/* FIRST ROW */}
          <Row className="g-4 mb-4 my-3">
            <Col md={3} sm={6}>
              <Card className="h-100 p-3 border-0 shadow-sm feature-card">
                <FaRobot className="fs-1 mb-3 text-primary" />
                <h5>AI-Powered Ideas</h5>
                <p>
                  Generate unique blog topics, summaries, and personalized
                  content suggestions using cutting-edge AI.
                </p>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="h-100 p-3 border-0 shadow-sm feature-card">
                <FaPenFancy className="fs-1 mb-3 text-success" />
                <h5>Easy Blog Management</h5>
                <p>
                  Create, edit, and manage your blogs with live preview,
                  autosave, and markdown support built-in.
                </p>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="h-100 p-3 border-0 shadow-sm feature-card">
                <FaUserFriends className="fs-1 mb-3 text-warning" />
                <h5>Community</h5>
                <p>
                  Follow writers, interact with readers, and grow your influence
                  through meaningful engagement.
                </p>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="h-100 p-3 border-0 shadow-sm feature-card">
                <FaChartBar className="fs-1 mb-3 text-danger" />
                <h5>Analytics Dashboard</h5>
                <p>
                  Track your post performance, engagement stats, likes, and
                  comments in real time.
                </p>
              </Card>
            </Col>
          </Row>

          {/* SECOND ROW */}
          <Row className="g-4 mb-4 my-3">
            <Col md={3} sm={6}>
              <Card className="h-100 p-3 border-0 shadow-sm feature-card">
                <FaRegLightbulb className="fs-1 mb-3 text-info" />
                <h5>Smart Recommendations</h5>
                <p>
                  Discover blogs curated based on your interests and reading
                  habits with AI-driven personalization.
                </p>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="h-100 p-3 border-0 shadow-sm feature-card">
                <FaSearch className="fs-1 mb-3 text-primary" />
                <h5>Advanced Search</h5>
                <p>
                  Find content easily with intelligent filters — search by
                  title, tag, author, or even topic relevance.
                </p>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="h-100 p-3 border-0 shadow-sm feature-card">
                <FaRegBookmark className="fs-1 mb-3 text-success" />
                <h5>Reader Experience</h5>
                <p>
                  Enjoy distraction-free reading with light/dark mode,
                  bookmarks, and comment sections for engagement.
                </p>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="h-100 p-3 border-0 shadow-sm feature-card">
                <FaUserShield className="fs-1 mb-3 text-danger" />
                <h5>Admin Panel</h5>
                <p>
                  Manage users, handle reports, and maintain content quality
                  through a secure admin control panel.
                </p>
              </Card>
            </Col>
          </Row>

          {/* ✅ AI Suggestions Section */}
          
      
    
        </Container>
      </section>

      {/* (Optional) If you want to repeat AI section outside container */}
      {/* <AISuggestions darkMode={darkMode} /> */}
    </>
  );
};

export default Landing;
