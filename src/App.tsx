import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Page, ProfileData } from './types';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import FeaturesPage from './pages/FeaturesPage';
import ToolsPage from './pages/ToolsPage';

const DEFAULT_DATA: ProfileData = {
  username: '', name: '', tagline: '', bio: '', working: '', learning: '',
  askme: '', funfact: '', showStats: true, showLangs: true, showStreak: true,
  showTrophies: false, showVisitors: false, statsTheme: 'tokyonight', hideStats: '',
  twitter: '', linkedin: '', instagram: '', discord: '', email: '', website: '',
  youtube: '', devto: '', selectedTechs: new Set<number>(),
  showQuote: false, showMeme: false, showSnake: false, showSpotify: false, spotify: '',
  bmc: '', kofi: '', paypal: '',
  layout: 'center', brandColor: '#6c63ff', bannerStyle: 'gradient',
  mediumRss: '', devtoWidget: '', leetcodeUsername: '', codewarsUsername: '',
  showBlogPosts: false, showLeetcode: false, showCodewars: false,
};

const pageVariants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, scale: 0.99, transition: { duration: 0.3, ease: 'easeIn' } },
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [data, setData] = useState<ProfileData>(DEFAULT_DATA);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Cursor glow follower
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const navigate = (p: Page) => {
    if (p === page) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsTransitioning(false), 450);
    }, 280);
  };

  return (
    <div className="min-h-screen relative" style={{ background: 'transparent', color: 'var(--text-primary)' }}>
      {/* Cursor glow follower */}
      <div ref={cursorRef} className="cursor-glow hidden md:block" />

      {/* Progress bar */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, var(--accent), var(--cyan), var(--pink))',
              transformOrigin: 'left',
              zIndex: 100,
              borderRadius: 2,
            }}
          />
        )}
      </AnimatePresence>

      <ThreeBackground />
      <Nav currentPage={page} onNavigate={navigate} />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {page === 'home' && <HomePage onNavigate={navigate} />}
            {page === 'builder' && <BuilderPage data={data} setData={setData} />}
            {page === 'features' && <FeaturesPage onNavigate={navigate} />}
            {page === 'tools' && (
              <ToolsPage
                onNavigate={navigate}
                githubUsername={data.username}
                statsTheme={data.statsTheme}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
