// src/pages/Recommendations.jsx
import React, { useEffect, useState } from "react";
import { Container, Spinner, Card, ListGroup } from "react-bootstrap";
import { aiService } from "../services/ai/aiService";

const Recommendations = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInterests = user?.interests || ["technology", "creativity", "AI"];

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data = await aiService.personalizedRecommendations(userInterests);
      setRecommendations(data);
      setLoading(false);
    };
    fetchRecommendations();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">🧠 Personalized Recommendations</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Card className="p-3 shadow-sm">
          <ListGroup variant="flush">
            {recommendations.map((item, idx) => (
              <ListGroup.Item key={idx}>{item}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </Container>
  );
};

export default Recommendations;
