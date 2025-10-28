import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup, Alert, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/auth/authService";
import "../styles/FormStyles.css";

const Login = ({ darkMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const user = await authService.loginWithEmail(email, password);
      const idToken = await authService.getIdToken(user);
      localStorage.setItem("fb_token", idToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const user = await authService.loginWithGoogle();
      const idToken = await authService.getIdToken(user);
      localStorage.setItem("fb_token", idToken);
      navigate("/dashboard");
    } catch (e) {
      alert("Google login failed: " + e.message);
    }
  };

  const handleGithub = async () => {
    try {
      const user = await authService.loginWithGithub();
      const idToken = await authService.getIdToken(user);
      localStorage.setItem("fb_token", idToken);
      navigate("/dashboard");
    } catch (e) {
      alert("GitHub login failed: " + e.message);
    }
  };

  return (
    <section
      className={`d-flex align-items-center justify-content-center py-5 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card
              className={`shadow-lg border-0 p-4 ${
                darkMode ? "bg-secondary text-light" : "bg-white text-dark"
              }`}
            >
              <h3 className="text-center fw-bold mb-3">Welcome Back</h3>
              <p className="text-center text-muted mb-4">
                Login to <span className="text-primary fw-semibold">AI-BlogSphere</span>
              </p>

              <Form onSubmit={handleEmailLogin}>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                    className={darkMode ? "form-dark" : ""}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      required
                      className={darkMode ? "form-dark" : ""}
                    />
                    <Button
                      variant={darkMode ? "outline-light" : "outline-secondary"}
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                </Button>

                <div className="text-center mb-3">
                  <p className="mb-2">or login using</p>
                  <div className="d-flex justify-content-center gap-3">
                    <Button variant="danger" onClick={handleGoogle}>
                      <FaGoogle className="me-2" /> Google
                    </Button>
                    <Button variant="dark" onClick={handleGithub}>
                      <FaGithub className="me-2" /> GitHub
                    </Button>
                  </div>
                </div>

                <p className="text-center mt-3">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className={darkMode ? "text-info" : "text-primary"}
                    style={{ textDecoration: "none" }}
                  >
                    Sign up here
                  </Link>
                </p>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
