import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoadingPage from './components/LoadingPage';
import MainPortfolio from './components/MainPortfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ContactForm from './components/ContactForm';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/portfolio" element={<MainPortfolio />} />
      <Route path="/contact" element={<ContactForm />} />
    </Routes>
  );
}

export default App;