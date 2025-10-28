import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/auth/authService";
import "../styles/FormStyles.css";

const Signup = ({ darkMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Handle Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirmPassword.value;

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const user = await authService.signupWithEmail(name, email, password);
      const idToken = await authService.getIdToken(user);
      localStorage.setItem("fb_token", idToken); // Demo storage

      navigate("/select-role");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Google OAuth Signup
  const handleGoogle = async () => {
    try {
      setLoading(true);
      const user = await authService.loginWithGoogle();
      const idToken = await authService.getIdToken(user);
      localStorage.setItem("fb_token", idToken);
      navigate("/select-role");
    } catch (err) {
      alert("Google signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle GitHub OAuth Signup
  const handleGithub = async () => {
    try {
      setLoading(true);
      const user = await authService.loginWithGithub();
      const idToken = await authService.getIdToken(user);
      localStorage.setItem("fb_token", idToken);
      navigate("/select-role");
    } catch (err) {
      alert("GitHub signup failed. Please try again.");
    } finally {
      setLoading(false);
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
              <h3 className="text-center fw-bold mb-3">Create an Account</h3>
              <p className="text-center text-muted mb-4">
                Join{" "}
                <span className="text-primary fw-semibold">
                  AI-BlogSphere
                </span>{" "}
                today.
              </p>

              <Form onSubmit={handleSignup}>
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Full Name */}
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className={darkMode ? "form-dark" : ""}
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                    className={darkMode ? "form-dark" : ""}
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      required
                      className={darkMode ? "form-dark" : ""}
                    />
                    <Button
                      variant={
                        darkMode ? "outline-light" : "outline-secondary"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm password"
                      required
                      className={darkMode ? "form-dark" : ""}
                    />
                    <Button
                      variant={
                        darkMode ? "outline-light" : "outline-secondary"
                      }
                      onClick={() => setShowConfirm(!showConfirm)}
                      type="button"
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
                </Button>

                {/* OAuth Buttons */}
                <div className="text-center mb-3">
                  <p className="mb-2">or sign up using</p>
                  <div className="d-flex justify-content-center gap-3">
                    <Button
                      variant="danger"
                      onClick={handleGoogle}
                      disabled={loading}
                    >
                      <FaGoogle className="me-2" /> Google
                    </Button>
                    <Button
                      variant="dark"
                      onClick={handleGithub}
                      disabled={loading}
                    >
                      <FaGithub className="me-2" /> GitHub
                    </Button>
                  </div>
                </div>

                {/* Redirect Link */}
                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className={darkMode ? "text-info" : "text-primary"}
                    style={{ textDecoration: "none" }}
                  >
                    Login here
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

export default Signup;
