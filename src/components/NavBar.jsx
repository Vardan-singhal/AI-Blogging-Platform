import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaHome, FaSignInAlt, FaUserPlus, FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Navbar
      expand="lg"
      className={`shadow-sm py-3 ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
      sticky="top"
    >
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 d-flex align-items-center"
        >
          🧠 AI-BlogSphere
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-center gap-3">
            {/* Home Link */}
            <Nav.Link as={Link} to="/" className="d-flex align-items-center">
              <FaHome className="me-2" /> Home
            </Nav.Link>

            <Button
  variant="outline-primary"
  className="ms-2"
  onClick={() => navigate("/blogs")}
>
  Blogs
</Button>

            {/* Login Button */}
            <Button
              variant={darkMode ? "outline-light" : "outline-dark"}
              size="sm"
              onClick={() => navigate("/login")}
            >
              <FaSignInAlt className="me-2" /> Login
            </Button>

            {/* Signup Button */}
            <Button
              variant={darkMode ? "light" : "dark"}
              size="sm"
              onClick={() => navigate("/signup")}
            >
              <FaUserPlus className="me-1" /> Sign Up
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="link"
              onClick={toggleTheme}
              className="ms-2 p-0"
              style={{ textDecoration: "none" }}
            >
              {darkMode ? (
                <FaSun size={20} color="white" />
              ) : (
                <FaMoon size={20} color="black" />
              )}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
