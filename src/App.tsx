import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Posts from './routes/Posts';
import BlogPost from './routes/BlogPost';
import { Navigation } from './navigation';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="container mx-auto px-4">
      <Router>
        <Navigation isOpen={isOpen} toggleMenu={toggleMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<BlogPost />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
