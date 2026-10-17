
import { Routes, Route, Link } from "react-router-dom";
import CreateBlog from "./pages/CreateBlog";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <div className="container">
      <nav>
        <h2>My Blog</h2>
        <Link to="/blogs">All Blogs</Link>
        <Link to="/createblog">Create Blog</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </div>
  );
}

export default App;
