// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { BlogPostPage } from './pages/BlogPostPage';
import { Home } from './pages/home';
// import { BlogList } from './pages/BlogList';
// import { About } from './pages/About';

// Wrapper component to extract slug from URL params
const BlogPostWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  return <BlogPostPage slug={slug} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/blog" element={<BlogList />} /> */}
        <Route path="/post/:slug" element={<BlogPostWrapper />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;