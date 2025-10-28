// src/pages/ReaderDashboard.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaCommentDots } from "react-icons/fa";
import { authService } from "../services/auth/authService";
import { getAllBlogs, addComment } from "../services/blogs/blogService";

const ReaderDashboard = () => {
  const user = authService.getCurrentUser();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      const allBlogs = await getAllBlogs();
      setBlogs(allBlogs.filter((b) => b.status === "Published"));
      setLoading(false);
    };
    loadBlogs();
  }, []);

  const handleLike = (id) => {
    setLikedBlogs((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleBookmark = (id) => {
    setBookmarkedBlogs((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleComment = async (id) => {
    if (!commentText[id]) return;
    await addComment(id, {
      user: user?.email || "Anonymous",
      text: commentText[id],
      date: new Date().toISOString(),
    });
    setCommentText((prev) => ({ ...prev, [id]: "" }));
    alert("Comment added!");
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      (selectedCategory === "All" || blog.category === selectedCategory) &&
      blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container className="py-5">
      <motion.h2
        className="text-center fw-bold mb-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        📚 Reader Dashboard
      </motion.h2>

      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {[...new Set(blogs.map((b) => b.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <p className="text-center">Loading blogs...</p>
      ) : filteredBlogs.length > 0 ? (
        <Row>
          {filteredBlogs.map((blog) => (
            <Col md={6} lg={4} key={blog.id} className="mb-4">
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <Card className="shadow-sm h-100 border-0">
                  {blog.imageUrl && (
                    <Card.Img
                      variant="top"
                      src={blog.imageUrl}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {blog.category} • {blog.author}
                    </Card.Subtitle>
                    <Card.Text>
                      {blog.content.length > 120
                        ? blog.content.slice(0, 120) + "..."
                        : blog.content}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button
                          variant="link"
                          className="text-danger p-0 me-2"
                          onClick={() => handleLike(blog.id)}
                        >
                          {likedBlogs.includes(blog.id) ? (
                            <FaHeart />
                          ) : (
                            <FaRegHeart />
                          )}
                        </Button>
                        <Button
                          variant="link"
                          className="text-warning p-0 me-2"
                          onClick={() => handleBookmark(blog.id)}
                        >
                          {bookmarkedBlogs.includes(blog.id) ? (
                            <FaBookmark />
                          ) : (
                            <FaRegBookmark />
                          )}
                        </Button>
                        <FaCommentDots className="text-primary" />
                      </div>
                      <small className="text-muted">
                        {new Date(blog.date).toLocaleDateString()}
                      </small>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-3">
                      <Form.Control
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText[blog.id] || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [blog.id]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        className="mt-2"
                        size="sm"
                        variant="primary"
                        onClick={() => handleComment(blog.id)}
                      >
                        Comment
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No blogs available right now.</p>
      )}
    </Container>
  );
};

export default ReaderDashboard;
