import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth/authService"; // your existing auth
import { updateUserRole } from "../services/userService"; // new helper we’ll create

const SelectRole = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [loading, setLoading] = useState(false);

  const handleRoleSelection = async (role) => {
    if (!user) return;

    setLoading(true);
    try {
      // Update role in DB or local storage
      await updateUserRole(user.uid, role);

      // update in local storage (for instant reflection)
      authService.updateLocalUser({ ...user, role });

      // Redirect to dashboard
      if (role === "Writer") {
        navigate("/writer-dashboard");
      } else {
        navigate("/reader-dashboard");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Something went wrong while updating role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 text-center">
      <h2 className="fw-bold mb-4">Select Your Role</h2>
      <p className="text-muted mb-5">
        Choose how you want to explore <span className="text-primary">AI-BlogSphere</span>.
      </p>

      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="p-4 shadow-sm border-0 mb-3">
            <h4 className="mb-3">🧠 Writer</h4>
            <p>Create blogs, share ideas, and inspire readers with your content.</p>
            <Button
              variant="primary"
              disabled={loading}
              onClick={() => handleRoleSelection("Writer")}
              
            >
              {loading ? "Saving..." : "Continue as Writer"}
            </Button>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-4 shadow-sm border-0 mb-3">
            <h4 className="mb-3">📚 Reader</h4>
            <p>Explore AI-curated blogs and follow your favorite writers.</p>
            <Button
              variant="success"
              disabled={loading}
              onClick={() => handleRoleSelection("Reader")}
            >
              {loading ? "Saving..." : "Continue as Reader"}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectRole;
