import { useEffect, useRef, useState } from 'react';
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

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref, display } = useCountUp(target, 1800, suffix);
  void count;
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: '#00e5ff' }}>{display}</div>
      <div className="text-xs mt-1" style={{ color: '#7878aa', fontFamily: 'monospace', letterSpacing: '0.08em' }}>{label}</div>
    </div>
  );
}

const FEATURES_PREVIEW = [
  { icon: <Sparkles size={20} />, title: 'AI Bio Tuner', desc: 'Paste your resume, get 3 AI-crafted bio styles instantly.' },
  { icon: <Github size={20} />, title: 'One-Click GitHub Import', desc: 'Auto-fill tech stack and stats from any GitHub profile.' },
  { icon: <Eye size={20} />, title: 'Live Split-Screen Preview', desc: 'See your README update in real-time as you type.' },
  { icon: <Zap size={20} />, title: 'Dynamic Widgets', desc: 'LeetCode stats, blog posts, CodeWars ranks — all automated.' },
  { icon: <Star size={20} />, title: '300+ Tech Icons', desc: 'Select from a massive library with smart category filters.' },
  { icon: <Download size={20} />, title: 'One-Click Export', desc: 'Copy or download your README.md instantly.' },
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
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-8 animate-pulse animate-fade-up"
          style={{
            background: 'rgba(108,99,255,0.12)',
            border: '1px solid rgba(108,99,255,0.3)',
            color: '#00e5ff',
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
          }}
        >
          <span style={{ fontSize: '0.6rem' }}>◉</span>
          Free GitHub Profile README Generator — No Sign-up Required
        </div>

        <h1 className="font-extrabold tracking-tight leading-none mb-6" style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', letterSpacing: '-0.04em' }}>
          <span className="block" style={{ color: '#e8e8ff' }}>Craft Your</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, #6c63ff, #00e5ff, #ff6b9d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'shimmer 3s linear infinite',
              minHeight: '1.2em',
            }}
          >
            {typed}<span style={{ WebkitTextFillColor: '#00e5ff', animation: 'blink 1s step-end infinite' }}>|</span>
          </span>
        </h1>

        <p className="text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: '#7878aa' }}>
          Generate stunning, personalized GitHub profile READMEs in seconds. Flex your stats, showcase your stack, and stand out from 100 million developers — completely free.
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-20">
          <button
            onClick={() => onNavigate('builder')}
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
              color: '#fff',
              boxShadow: '0 0 40px rgba(108,99,255,0.5)',
            }}
          >
            Start Building Free <ArrowRight size={18} />
          </button>
          <button
            onClick={() => onNavigate('features')}
            className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:border-violet-500"
            style={{ background: 'transparent', color: '#e8e8ff', border: '1px solid rgba(120,120,255,0.2)' }}
          >
            See Features
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 md:gap-20 flex-wrap justify-center reveal">
          <StatCounter target={47000} suffix="+" label="Profiles Created" />
          <StatCounter target={300} suffix="+" label="Tech Options" />
          <StatCounter target={2400} suffix="+" label="GitHub Stars" />
        </div>
      </section>

      {/* Divider */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)', opacity: 0.3 }} />

      {/* FEATURE PREVIEW GRID */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs mb-3" style={{ color: '#00e5ff', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              // what makes us different
            </div>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.04em', color: '#e8e8ff' }}>
              Built for Developers,<br />
              <span style={{ background: 'linear-gradient(135deg, #6c63ff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                by Developers
              </span>
            </h2>
            <p className="text-base max-w-xl mx-auto mt-4" style={{ color: '#7878aa' }}>
              ProfileCraft goes beyond basic generators with AI-powered tools, live previews, and dynamic widgets that set your profile apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {FEATURES_PREVIEW.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{
                  background: '#0d0d14',
                  borderColor: 'rgba(120,120,255,0.12)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(120,120,255,0.12)')}
                onClick={() => onNavigate('builder')}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(108,99,255,0.15)', color: '#00e5ff' }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#e8e8ff' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7878aa' }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('builder')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
                color: '#fff',
                boxShadow: '0 0 40px rgba(108,99,255,0.4)',
              }}
            >
              Try the Builder Now <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)', opacity: 0.3 }} />

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs mb-3" style={{ color: '#00e5ff', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            // how it works
          </div>
          <h2 className="font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.04em', color: '#e8e8ff' }}>
            Ready in Under 60 Seconds
          </h2>
          <p className="mb-16 text-base" style={{ color: '#7878aa' }}>
            Three simple steps to a professional GitHub profile.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
            {[
              { step: '01', title: 'Import or Fill In', desc: 'Paste your GitHub username for one-click import, or fill in your details manually.' },
              { step: '02', title: 'Customize & Preview', desc: 'Choose your tech stack, enable stats widgets, and watch a live split-screen preview.' },
              { step: '03', title: 'Copy & Deploy', desc: 'Copy the markdown or download README.md and paste it into your GitHub profile repo.' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div
                  className="text-5xl font-extrabold mb-4"
                  style={{ background: 'linear-gradient(135deg, #6c63ff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.04em' }}
                >
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#e8e8ff' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7878aa' }}>{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-2xl" style={{ color: '#6c63ff', opacity: 0.5 }}>→</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14">
            <button
              onClick={() => onNavigate('builder')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
                color: '#fff',
                boxShadow: '0 0 40px rgba(108,99,255,0.4)',
              }}
            >
              Get Started Free <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials / social proof strip */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)', opacity: 0.3 }} />
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
            <span className="text-sm ml-2" style={{ color: '#7878aa' }}>Loved by developers worldwide</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal">
            {[
              { quote: '"Finally, a README generator that doesn\'t look like 2015. The live preview is incredible."', author: '@alexdev' },
              { quote: '"The AI bio generator saved me 30 minutes of staring at a blank text area."', author: '@sarah_codes' },
              { quote: '"One-click GitHub import is a game changer. My whole stack was selected in 2 seconds."', author: '@rustacean99' },
            ].map((t, i) => (
              <div key={i} className="p-5 rounded-xl border text-left" style={{ background: '#0d0d14', borderColor: 'rgba(120,120,255,0.12)' }}>
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#e8e8ff' }}>{t.quote}</p>
                <p className="text-xs" style={{ color: '#6c63ff' }}>{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* keyframes now in index.css */
      `}</style>
    </div>
  );
}
