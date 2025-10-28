import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`pt-4 pb-3 mt-5 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold">🧠 AI-BlogSphere</h5>
            <p className="mb-0 small">
              Empowering creators with AI-driven blogging and personalized content discovery.
            </p>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="fw-semibold mb-2">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="footer-link">About</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
            </ul>
          </Col>

          <Col md={4} className="text-md-end">
            <h6 className="fw-semibold mb-2">Connect with Us</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="footer-icon"><FaGithub size={22} /></a>
              <a href="#" className="footer-icon"><FaLinkedin size={22} /></a>
              <a href="#" className="footer-icon"><FaTwitter size={22} /></a>
              <a href="#" className="footer-icon"><FaGlobe size={22} /></a>
            </div>
          </Col>
        </Row>

        <hr className={darkMode ? "border-light my-3" : "border-dark my-3"} />

        <div className="text-center small">
          © {currentYear} <strong>AI-BlogSphere</strong>. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
