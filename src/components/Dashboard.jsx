import React, { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { authService } from "../services//auth/authService";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const updatedUser = { ...user, ...docSnap.data() };
        setUser(updatedUser);
        authService.updateLocalUser(updatedUser);
      }
      setLoading(false);
    };

    fetchRole();
  }, []);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Container className="text-center py-5">
      <h2>Welcome, {user.name || "User"} 👋</h2>
      <p>Email: {user.email}</p>
      <p>Role: <strong>{user.role || "Not selected"}</strong></p>

      <Button variant="danger" onClick={() => { authService.logout(); navigate("/login"); }}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
