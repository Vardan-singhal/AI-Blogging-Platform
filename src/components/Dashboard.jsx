import React, { useEffect, useState } from "react";
import { authService } from "../services/auth/authService";
import { Button, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      // Redirect if not logged in
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) {
    // Optional: show a loader while checking authentication
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your dashboard...</p>
      </Container>
    );
  }

  return (
    <Container className="text-center py-5">
      <h2>Welcome, {user.name || "User"} 👋</h2>
      <p>Email: {user.email}</p>
      

      <Button
        variant="danger"
        onClick={() => {
          authService.logout();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
