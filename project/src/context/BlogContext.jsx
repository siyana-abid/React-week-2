
import { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);

  function addBlog(title, body) {
    setBlogs([
      ...blogs,
      { id: Date.now(), title, body }
    ]);
  }

  function deleteBlog(id) {
    setBlogs(blogs.filter(blog => blog.id !== id));
  }

  function editBlog(id, title, body) {
    setBlogs(
      blogs.map(blog =>
        blog.id === id ? { ...blog, title, body } : blog
      )
    );
  }

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, editBlog }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogs() {
  return useContext(BlogContext);
}
