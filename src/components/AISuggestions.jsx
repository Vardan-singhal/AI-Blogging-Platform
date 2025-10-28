import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAISuggestions } from "../services/ai/aiSlice";
import { Card, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";

const AISuggestions = ({ darkMode }) => {
  const dispatch = useDispatch();
  const { aiSuggestions, loading } = useSelector((state) => state.ai);

  useEffect(() => {
    // Example user interests — replace with real user data later
    dispatch(fetchAISuggestions(["technology", "ai", "productivity"]));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Generating AI-powered blog ideas...</p>
      </div>
    );
  }

  return (
    <section className={`py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="container text-center">
        <h2 className="mb-4 fw-bold">✨ AI Recommended Topics</h2>
        <div className="row justify-content-center">
          {aiSuggestions.length > 0 ? (
            aiSuggestions.map((idea, index) => (
              <motion.div
                key={index}
                className="col-md-4 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-100 shadow-sm border-0 p-3">
                  <Card.Body>
                    <Card.Title>{idea.title}</Card.Title>
                    <Card.Text>{idea.summary}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            ))
          ) : (
            <p>No AI suggestions yet. Try refreshing.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AISuggestions;
