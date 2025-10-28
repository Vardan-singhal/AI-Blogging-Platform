// src/services/blogService.js

export const saveBlogPost = async (blog) => {
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  blogs.unshift(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));
};

export const getAllBlogs = async () => {
  return JSON.parse(localStorage.getItem("blogs") || "[]");
};

export const addComment = async (blogId, comment) => {
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  const updatedBlogs = blogs.map((b) =>
    b.id === blogId ? { ...b, comments: [...(b.comments || []), comment] } : b
  );
  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
};
