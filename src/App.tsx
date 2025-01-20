import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, RouteProps, Navigate, Outlet } from 'react-router-dom';
import { Navigation } from './navigation';
import { useAuth } from './modules/auth/useAuth';
import { db } from './modules/auth/data';
import { Login } from './modules/auth/auth';

const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const Home = React.lazy(() => simulateDelay(0).then(() => import('./routes/Home')));
const Posts = React.lazy(() => simulateDelay(0).then(() => import('./routes/Posts')));
const BlogPost = React.lazy(() => simulateDelay(0).then(() => import('./routes/BlogPost')));

const FullPageSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <svg
          className="animate-spin h-10 w-10 text-gray-600 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <p className="text-gray-600 mt-2">Loading...</p>
      </div>
    </div>
  );
};

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/posts', text: 'Posts' },
  { to: '/login', text: 'Login' },
];



export const InstantAuth = () => {
  const { isLoading, user, error } = db.useAuth();
  if (isLoading) return <FullPageSkeleton />;
  if (error) return <h1>Error: {error.message}</h1>;
  if (user) return <Navigate to="/posts" />;
  return <Login />;
};

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu: () => void = (): void => setIsOpen((prev) => !prev);
  const { user } = useAuth();

  return (
    <Router>
      <div className="container mx-auto px-4 flex flex-col min-h-screen">
        <Navigation isOpen={isOpen} toggleMenu={toggleMenu} navLinks={navLinks} email={user?.email} />
        <div className="flex-grow">
          <Suspense fallback={<FullPageSkeleton />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<InstantAuth />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:id" element={<BlogPost />} />
              </Route>
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;
