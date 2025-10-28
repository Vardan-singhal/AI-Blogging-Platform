import React from "react";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card className="shadow-sm h-100">
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>{blog.summary || blog.content.slice(0, 100)}...</Card.Text>
          <Button variant="primary" size="sm">
            Read More
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
