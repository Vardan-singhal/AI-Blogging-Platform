// src/pages/WriterDashboard.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import { authService } from "../services/auth/authService";
import { uploadImage } from "../services/uploadService"; // helper for image upload (we’ll add below)
import { saveBlogPost } from "../services/blogs/blogService"; // helper for saving blog (mock or Firebase)

const WriterDashboard = () => {
  const user = authService.getCurrentUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (publish = false) => {
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (coverImage) {
        imageUrl = await uploadImage(coverImage);
      }

      const newBlog = {
        id: Date.now(),
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
        category,
        imageUrl,
        author: user?.email || "Anonymous",
        status: publish ? "Published" : "Draft",
        date: new Date().toISOString(),
      };

      await saveBlogPost(newBlog);

      setBlogs([newBlog, ...blogs]);
      setTitle("");
      setContent("");
      setTags("");
      setCategory("");
      setCoverImage(null);
      setPreview(null);
      alert(publish ? "Blog published!" : "Draft saved!");
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Something went wrong while saving your blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <motion.h2
        className="text-center mb-4 fw-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ✍️ Writer Dashboard
      </motion.h2>

      <Card className="p-4 shadow-sm border-0 mb-5">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Blog Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Technology, AI, Lifestyle"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags (comma separated)</Form.Label>
            <Form.Control
              type="text"
              placeholder="AI, Innovation, Machine Learning"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Group>

          {preview && (
            <div className="text-center mb-3">
              <Image
                src={preview}
                alt="Preview"
                thumbnail
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
            </div>
          )}

          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="secondary"
              disabled={loading}
              onClick={() => handleSubmit(false)}
            >
              {loading ? <Spinner size="sm" /> : "Save Draft"}
            </Button>

            <Button
              variant="primary"
              disabled={loading}
              onClick={() => handleSubmit(true)}
            >
              {loading ? <Spinner size="sm" /> : "Publish Blog"}
            </Button>
          </div>
        </Form>
      </Card>

      <Row>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Col md={6} lg={4} key={blog.id} className="mb-4">
              <Card className="shadow-sm h-100">
                {blog.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={blog.imageUrl}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {blog.category} • {blog.status}
                  </Card.Text>
                  <Card.Text>{blog.content.slice(0, 100)}...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No blogs yet. Start writing!</p>
        )}
      </Row>
    </Container>
  );
};

export default WriterDashboard;
