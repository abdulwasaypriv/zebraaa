import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../types';
import { Menu, X } from 'lucide-react';

interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'builder', label: 'Builder' },
  { page: 'features', label: 'Features' },
  { page: 'tools', label: 'Tools & FAQ' },
];

export default function Nav({ currentPage, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
        style={{
          boxShadow: scrolled ? '0 4px 30px rgba(108,99,255,0.08)' : 'none',
          borderBottomColor: scrolled ? 'rgba(108,99,255,0.15)' : 'rgba(108,99,255,0.08)',
          transition: 'box-shadow 0.3s, border-color 0.3s',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => handleNav('home')}
              className="text-xl font-extrabold tracking-tight"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #6c63ff, #0ea5e9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Profile<span style={{ WebkitTextFillColor: '#f43f8f' }}>Craft</span>
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(({ page, label }) => (
                <motion.button
                  key={page}
                  onClick={() => handleNav(page)}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                  style={{
                    color: currentPage === page ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {label}
                  {currentPage === page && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--accent), var(--cyan))' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* CTA */}
              <motion.button
                onClick={() => handleNav('builder')}
                className="hidden sm:block btn-primary text-sm px-5 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Profile →
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                className="md:hidden p-2 rounded-lg"
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                style={{ color: 'var(--text-primary)' }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 p-6 pt-20"
              style={{
                background: 'var(--bg-secondary)',
                boxShadow: '-8px 0 40px rgba(108,99,255,0.1)',
                borderLeft: '1px solid var(--border-primary)',
              }}
            >
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map(({ page, label }, i) => (
                  <motion.button
                    key={page}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={() => handleNav(page)}
                    className="text-left px-4 py-3 rounded-xl text-base font-medium transition-colors"
                    style={{
                      color: currentPage === page ? 'var(--accent)' : 'var(--text-secondary)',
                      background: currentPage === page ? 'var(--accent-lighter)' : 'transparent',
                    }}
                  >
                    {label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35, type: 'spring', stiffness: 300, damping: 25 }}
                  onClick={() => handleNav('builder')}
                  className="btn-primary text-sm px-5 py-3 mt-4"
                >
                  Create Profile →
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
