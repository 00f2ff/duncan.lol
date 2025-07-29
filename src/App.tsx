import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  BrowserRouter,
} from "react-router-dom";
import { Post } from "./pages/Post";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";

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
        <Route path="/posts/:slug" element={<BlogPostWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
