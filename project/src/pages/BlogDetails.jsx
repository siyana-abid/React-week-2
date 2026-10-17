
import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";

function BlogDetails() {
  const { id } = useParams();
  const { blogs, editBlog } = useBlogs();

  const blog = blogs.find(item => item.id === Number(id));

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(blog?.title || "");
  const [body, setBody] = useState(blog?.body || "");

  const [editing, setEditing] = useState(
    searchParams.get("edit") === "true"
  );

  if (!blog) return <p>Blog not found!</p>;

  function handleEdit(e) {
    e.preventDefault();
    editBlog(blog.id, title, body);
    setEditing(false);
    navigate(`/blogs/${blog.id}`);
  }

  return (
    <div className="blog-card">
      {editing ? (
        <form onSubmit={handleEdit}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
          />

          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
          <button onClick={() => setEditing(true)}>Edit Blog</button>
        </>
      )}
    </div>
  );
}

export default BlogDetails;
