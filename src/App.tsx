import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingProvider } from './contexts/LoadingContext';
import GlobalLoader from './components/GlobalLoader';
import HireMeModal from './components/HireMeModal';
import ErrorBoundary from './components/ErrorBoundary';
import { useHireMe } from './hooks/useHireMe';
import ParticleBackground from './components/ParticleBackground';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Blog from './components/Blog/Blog';
import Games from './components/Games/Games';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NDAPolicy from './pages/NDAPolicy';
import CookiesPolicy from './pages/CookiesPolicy';

function App() {
  const { showHireMe, hideHireMeModal, showHireMeModal } = useHireMe();

  useEffect(() => {
    // Listen for hire me modal trigger
    const handleShowHireMe = () => {
      showHireMeModal();
    };

    document.addEventListener('showHireMe', handleShowHireMe);

    return () => {
      document.removeEventListener('showHireMe', handleShowHireMe);
    };
  }, [showHireMeModal]);

  return (
    <LoadingProvider>
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div 
                className="min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ParticleBackground particleCount={20} type="nature" />
                <ThemeToggle />
                
                <main>
                  <Hero />
                  <About />
                  <Portfolio />
                  <Blog />
                  <Games />
                  <Services />
                  <Contact />
                </main>
                
                <Footer />
              </motion.div>
            } />
            <Route path="/privacy" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PrivacyPolicy />
              </motion.div>
            } />
            <Route path="/terms" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <TermsConditions />
              </motion.div>
            } />
            <Route path="/nda" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <NDAPolicy />
              </motion.div>
            } />
            <Route path="/cookies" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <CookiesPolicy />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
        <GlobalLoader />
        <HireMeModal isVisible={showHireMe} onClose={hideHireMeModal} />
      </ErrorBoundary>
    </LoadingProvider>
  );
}

export default App;