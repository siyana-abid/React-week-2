
import { useState } from "react";
import { useBlogs } from "../context/BlogContext";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { addBlog } = useBlogs();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    addBlog(title, body);
    navigate("/blogs");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Blog</h2>

      <input
        placeholder="Blog title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your blog..."
        value={body}
        onChange={e => setBody(e.target.value)}
      />

      <button type="submit">Create Blog</button>
    </form>
  );
}

export default CreateBlog;
