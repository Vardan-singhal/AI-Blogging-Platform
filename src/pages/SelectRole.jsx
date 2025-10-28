// src/pages/SelectRole.jsx
import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth/authService";
import { updateUserRole } from "../services/userService"; // make sure this exists

const SelectRole = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [loading, setLoading] = useState(false);

  // helper to extract uid from various user shapes
  const getUidFromUser = (u) => {
    if (!u) return null;
    // common shapes:
    // - Firebase User object: u.uid
    // - Some wrappers: u.user.uid
    // - Local-storage saved plain object: u.uid
    return u.uid || (u.user && u.user.uid) || null;
  };

  const handleRoleSelection = async (role) => {
    const uid = getUidFromUser(user);
    if (!uid) {
      // No user available — send them to login (or show message)
      alert("You must be logged in to select a role. Redirecting to login...");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // 1) Update role in DB if the helper exists
      if (typeof updateUserRole === "function") {
        try {
          await updateUserRole(uid, role);
        } catch (dbErr) {
          // Log DB error but don't block UX — we'll still update local cache and navigate
          console.error("Failed to update role in DB:", dbErr);
        }
      } else {
        console.warn("updateUserRole is not a function — skipping DB update.");
      }

      // 2) Update local user cache for instant reflection
      // merge existing user object with new role, keep all other fields
      const updatedUser = { ...(user || {}), role };
      authService.updateLocalUser(updatedUser);

      // 3) Redirect based on selected role
      if (role === "Writer") {
        navigate("/writer-dashboard");
      } else {
        navigate("/reader-dashboard");
      }
    } catch (error) {
      console.error("Error in handleRoleSelection:", error);
      alert("Something went wrong while updating role. Redirecting to dashboard.");
      // attempt redirect anyway for better UX
      if (role === "Writer") navigate("/writer-dashboard");
      else navigate("/reader-dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 text-center">
      <h2 className="fw-bold mb-4">Select Your Role</h2>
      <p className="text-muted mb-5">
        Choose how you want to explore{" "}
        <span className="text-primary">AI-BlogSphere</span>.
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
