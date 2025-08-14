import { Routes, Route, useParams, BrowserRouter } from "react-router-dom";
import { Post } from "./pages/Post";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Disclaimer } from "./pages/Disclaimer";
import { Tools } from "./pages/Tools";

// Wrapper component to extract slug from URL params
const BlogPostWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Post slug={slug} />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/posts/:slug" element={<BlogPostWrapper />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
