
import { Link } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";

function Blogs() {
  const { blogs, deleteBlog } = useBlogs();

  return (
    <div>
      <h2>All Blogs</h2>

      {blogs.length === 0 && <p>No blogs yet. Create one!</p>}

      {blogs.map(blog => (
        <div className="blog-card" key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.body.slice(0, 100)}</p>

          <Link to={`/blogs/${blog.id}`}>Read More</Link>{" "}
          <Link to={`/blogs/${blog.id}?edit=true`}>Edit</Link>{" "}
          <button onClick={() => deleteBlog(blog.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Blogs;
