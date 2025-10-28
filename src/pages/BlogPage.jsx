import React, { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAISuggestions } from "../services/ai/aiSlice";
import { fetchBlogs } from "../services/blogs/blogSlice";
import AISuggestions from "../components/AISuggestions";
import BlogCard from "../components/BlogCard"; // You can reuse or create this
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const BlogPage = () => {
  const dispatch = useDispatch();
  const { aiSuggestions, loading: aiLoading } = useSelector((state) => state.ai);
  const { blogs, loading: blogLoading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchAISuggestions());
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">
        Explore Blogs & AI Suggestions
      </h2>

      {/* AI Suggestions */}
      <section className="mb-5">
        <h4 className="mb-3 text-primary">AI Recommended Topics</h4>
        {aiLoading ? (
          <Spinner animation="border" />
        ) : (
          <motion.div
            className="d-flex flex-wrap gap-3 justify-content-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            {aiSuggestions && aiSuggestions.length > 0 ? (
              aiSuggestions.map((idea, id) => (
                <AISuggestions key={id} suggestion={idea} />
              ))
            ) : (
              <p>No AI suggestions available.</p>
            )}
          </motion.div>
        )}
      </section>

      {/* Blogs */}
      <section>
        <h4 className="mb-3 text-success">All Blogs</h4>
        {blogLoading ? (
          <Spinner animation="border" />
        ) : (
          <motion.div
            className="row g-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <Col key={blog.id} md={4}>
                  <BlogCard blog={blog} />
                </Col>
              ))
            ) : (
              <p>No blogs available yet.</p>
            )}
          </motion.div>
        )}
      </section>
      <AISuggestions />
    </Container>
  );
};

export default BlogPage;
