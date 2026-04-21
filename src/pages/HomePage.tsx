import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../lib/useScrollReveal';
import { Page } from '../types';
import { Zap, Star, ArrowRight, Github, Sparkles, Eye, Download } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

function useCountUp(target: number, duration = 2000, suffix = '') {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(interval); }
          setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref, display: count.toLocaleString() + suffix };
}

function StatCounter({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
  const { ref, display } = useCountUp(target, 1800, suffix);
  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <div
        className="text-3xl md:text-4xl font-extrabold tracking-tight gradient-text-static"
      >
        {display}
      </div>
      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
        {label}
      </div>
    </motion.div>
  );
}

const FEATURES_PREVIEW = [
  { icon: <Sparkles size={20} />, title: 'AI Bio Tuner', desc: 'Paste your resume, get 3 AI-crafted bio styles instantly.', color: '#f43f8f' },
  { icon: <Github size={20} />, title: 'One-Click GitHub Import', desc: 'Auto-fill tech stack and stats from any GitHub profile.', color: '#6c63ff' },
  { icon: <Eye size={20} />, title: 'Live Split-Screen Preview', desc: 'See your README update in real-time as you type.', color: '#0ea5e9' },
  { icon: <Zap size={20} />, title: 'Dynamic Widgets', desc: 'LeetCode stats, blog posts, CodeWars ranks — all automated.', color: '#10b981' },
  { icon: <Star size={20} />, title: '300+ Tech Icons', desc: 'Select from a massive library with smart category filters.', color: '#f59e0b' },
  { icon: <Download size={20} />, title: 'One-Click Export', desc: 'Copy or download your README.md instantly.', color: '#8b5cf6' },
];

const TESTIMONIALS = [
  { quote: '"Finally, a README generator that doesn\'t look like 2015. The live preview is incredible."', author: '@alexdev' },
  { quote: '"The AI bio generator saved me 30 minutes of staring at a blank text area."', author: '@sarah_codes' },
  { quote: '"One-click GitHub import is a game changer. My whole stack was selected in 2 seconds."', author: '@rustacean99' },
  { quote: '"This tool is miles ahead of GPRM. The design and UX are on another level."', author: '@devguru_js' },
  { quote: '"My profile looks so professional now. Got compliments from two recruiters already!"', author: '@carla_dev' },
  { quote: '"Clean, fast, free. What more could you ask for? Thank you ProfileCraft team!"', author: '@open_src_fan' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  useScrollReveal();
  const [typed, setTyped] = useState('');
  const phrases = ['GitHub Identity', 'Developer Brand', 'Profile README', 'First Impression'];
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function type() {
      const phrase = phrases[phraseIndex.current];
      if (!deleting.current) {
        setTyped(phrase.slice(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === phrase.length) {
          deleting.current = true;
          timeout = setTimeout(type, 1800);
        } else {
          timeout = setTimeout(type, 80);
        }
      } else {
        setTyped(phrase.slice(0, charIndex.current - 1));
        charIndex.current--;
        if (charIndex.current === 0) {
          deleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
          timeout = setTimeout(type, 300);
        } else {
          timeout = setTimeout(type, 45);
        }
      }
    }
    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative z-10">
      {/* Aurora orbs */}
      <div className="aurora-orb aurora-orb-1" style={{ top: '5%', left: '15%' }} />
      <div className="aurora-orb aurora-orb-2" style={{ top: '20%', right: '10%' }} />
      <div className="aurora-orb aurora-orb-3" style={{ top: '60%', left: '50%' }} />

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs mb-8"
          style={{
            background: 'var(--accent-lighter)',
            border: '1px solid rgba(108,99,255,0.2)',
            color: 'var(--accent)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Free GitHub Profile README Generator — No Sign-up Required
        </motion.div>

        <motion.h1
          className="font-extrabold tracking-tight leading-none mb-6"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', letterSpacing: '-0.04em' }}
        >
          <motion.span
            className="block"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, type: 'spring', stiffness: 150 }}
          >
            Craft Your
          </motion.span>
          <motion.span
            className="block gradient-text"
            style={{ minHeight: '1.2em' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 150 }}
          >
            {typed}<span style={{ color: 'var(--accent)', animation: 'blink 1s step-end infinite' }}>|</span>
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          Generate stunning, personalized GitHub profile READMEs in seconds. Flex your stats, showcase your stack, and stand out from 100 million developers — completely free.
        </motion.p>

        <motion.div
          className="flex gap-4 flex-wrap justify-center mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <motion.button
            onClick={() => onNavigate('builder')}
            className="btn-primary flex items-center gap-2 px-8 py-4 text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Building Free <ArrowRight size={18} />
          </motion.button>
          <motion.button
            onClick={() => onNavigate('features')}
            className="btn-secondary px-8 py-4 text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See Features
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="flex gap-12 md:gap-20 flex-wrap justify-center">
          <StatCounter target={47000} suffix="+" label="Profiles Created" delay={0.9} />
          <StatCounter target={300} suffix="+" label="Tech Options" delay={1.0} />
          <StatCounter target={2400} suffix="+" label="GitHub Stars" delay={1.1} />
        </div>
      </section>

      {/* Divider */}
      <div className="gradient-divider" />

      {/* FEATURE PREVIEW GRID */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              className="section-label mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              // what makes us different
            </motion.div>
            <motion.h2
              className="font-extrabold tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Built for Developers,<br />
              <span className="gradient-text-static">by Developers</span>
            </motion.h2>
            <motion.p
              className="text-base max-w-xl mx-auto mt-4"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ProfileCraft goes beyond basic generators with AI-powered tools, live previews, and dynamic widgets that set your profile apart.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES_PREVIEW.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(108,99,255,0.12)' }}
                className="p-6 rounded-2xl cursor-pointer glass-card"
                onClick={() => onNavigate('builder')}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}15`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => onNavigate('builder')}
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try the Builder Now <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div className="section-label mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            // how it works
          </motion.div>
          <motion.h2
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready in Under 60 Seconds
          </motion.h2>
          <motion.p
            className="mb-16 text-base"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Three simple steps to a professional GitHub profile.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Import or Fill In', desc: 'Paste your GitHub username for one-click import, or fill in your details manually.' },
              { step: '02', title: 'Customize & Preview', desc: 'Choose your tech stack, enable stats widgets, and watch a live split-screen preview.' },
              { step: '03', title: 'Copy & Deploy', desc: 'Copy the markdown or download README.md and paste it into your GitHub profile repo.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
              >
                <div
                  className="text-5xl font-extrabold mb-4 gradient-text-static"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-2xl" style={{ color: 'var(--accent)', opacity: 0.4 }}>→</div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => onNavigate('builder')}
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials marquee */}
      <div className="gradient-divider" />
      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
            <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>Loved by developers worldwide</span>
          </motion.div>

          <div className="marquee-container">
            <div className="marquee-track">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-80 p-5 rounded-2xl glass-card"
                  style={{ cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-primary)' }}>{t.quote}</p>
                  <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
