import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <h1 className="font-display text-6xl font-bold mb-4 text-primary">404</h1>
          <p className="text-xl text-muted mb-8">Oops! Page not found</p>
          <p className="text-base text-muted mb-8">The page you're looking for doesn't exist. Please continue prompting to fill in this page contents if you want it.</p>
          <Link to="/" className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5">
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
