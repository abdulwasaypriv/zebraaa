import { Page } from '../types';
import { useScrollReveal } from '../lib/useScrollReveal';
import { ArrowRight, Sparkles, Github, Eye, Rss, Trophy, Sword, Palette, Zap, BarChart3, Link2, Star, Coffee } from 'lucide-react';

interface FeaturesPageProps {
  onNavigate: (page: Page) => void;
}

const FEATURES = [
  {
    icon: <Sparkles size={22} />,
    tag: 'AI-Powered',
    title: 'AI Bio Tuner',
    desc: 'Paste your resume or bullet points and get three AI-crafted bio styles instantly — Professional, Creative, and Minimalist. No more staring at a blank text area.',
    highlight: 'Solves writer\'s block for every developer.',
    color: '#ff6b9d',
  },
  {
    icon: <Github size={22} />,
    tag: 'One-Click',
    title: 'GitHub Profile Import',
    desc: 'Enter your GitHub username and hit Fetch. We automatically pull your top languages, auto-select your tech stack icons, and pre-fill your location and links.',
    highlight: 'Saves 10+ minutes of manual setup.',
    color: '#6c63ff',
  },
  {
    icon: <Eye size={22} />,
    tag: 'Real-Time',
    title: 'Live Split-Screen Preview',
    desc: 'As you type your name or toggle a widget, your README updates instantly on the right side with smooth transitions. Experience premium SaaS-level editing.',
    highlight: 'Feels like building a website, not filling a form.',
    color: '#00e5ff',
  },
  {
    icon: <Palette size={22} />,
    tag: 'Visual',
    title: 'Advanced Design Controls',
    desc: 'Choose from 4 layout presets (Center, Left, Grid, Side-by-Side), pick a brand color that updates your entire profile, and select from 3 banner styles.',
    highlight: 'Your profile, your aesthetic.',
    color: '#10b981',
  },
  {
    icon: <Rss size={22} />,
    tag: 'Automated',
    title: 'Dynamic Blog Post Widget',
    desc: 'Connect your Medium or Dev.to RSS feed. ProfileCraft generates a complete GitHub Actions workflow snippet that auto-updates your latest articles.',
    highlight: 'Your README stays fresh automatically.',
    color: '#f59e0b',
  },
  {
    icon: <Trophy size={22} />,
    tag: 'Competitive',
    title: 'LeetCode Stats Card',
    desc: 'Show off your LeetCode rank, solved problems, and contest rating with a beautiful dynamic stats card. Perfect for competitive programmers.',
    highlight: 'Stand out to technical interviewers.',
    color: '#ef4444',
  },
  {
    icon: <Sword size={22} />,
    tag: 'Competitive',
    title: 'CodeWars Badge',
    desc: 'Display your CodeWars rank and honor badge directly in your profile. One input field — your username — and it\'s done.',
    highlight: 'Show your kata mastery.',
    color: '#8b5cf6',
  },
  {
    icon: <Zap size={22} />,
    tag: '300+ Icons',
    title: 'Smart Tech Stack Builder',
    desc: 'Browse 300+ tech icons organized by category — Languages, Frontend, Backend, DevOps, Database, and Tools. With smart filtering and multi-select.',
    highlight: 'Every technology you know, beautifully displayed.',
    color: '#06b6d4',
  },
  {
    icon: <BarChart3 size={22} />,
    tag: 'Dynamic',
    title: 'GitHub Stats Suite',
    desc: 'Stats cards, top languages, streak counters, and trophy showcases — all with 9+ beautiful themes including Tokyo Night, Dracula, Synthwave and more.',
    highlight: 'Your contributions, beautifully visualized.',
    color: '#3b82f6',
  },
  {
    icon: <Link2 size={22} />,
    tag: 'Social',
    title: '8+ Social Platforms',
    desc: 'Add Twitter, LinkedIn, YouTube, Dev.to, Discord, email, website, and Instagram with auto-generated badge links.',
    highlight: 'Connect across every platform.',
    color: '#ec4899',
  },
  {
    icon: <Star size={22} />,
    tag: 'Fun',
    title: 'Fun Widgets',
    desc: 'Random dev quotes, memes, contribution snakes, and Spotify now playing cards. Make your profile memorable and show your personality.',
    highlight: 'Because profiles should have personality.',
    color: '#84cc16',
  },
  {
    icon: <Coffee size={22} />,
    tag: 'Monetize',
    title: 'Support / Donation Links',
    desc: 'Add Buy Me a Coffee, Ko-fi, and PayPal donation buttons to your profile. Let the community support your open source work.',
    highlight: 'Turn your profile into a landing page.',
    color: '#f97316',
  },
];

const COMPARISON = [
  { feature: 'AI Bio Generation', profilecraft: true, gprm: false },
  { feature: 'One-Click GitHub Import', profilecraft: true, gprm: false },
  { feature: 'Real-Time Live Preview', profilecraft: true, gprm: false },
  { feature: 'Layout Presets (4 options)', profilecraft: true, gprm: false },
  { feature: 'Brand Color System', profilecraft: true, gprm: false },
  { feature: 'LeetCode Stats Widget', profilecraft: true, gprm: false },
  { feature: 'CodeWars Badge', profilecraft: true, gprm: false },
  { feature: 'Blog Post Automation', profilecraft: true, gprm: false },
  { feature: 'Tech Stack Icons', profilecraft: true, gprm: true },
  { feature: 'GitHub Stats Cards', profilecraft: true, gprm: true },
  { feature: 'Social Links', profilecraft: true, gprm: true },
  { feature: 'Export README.md', profilecraft: true, gprm: true },
];

export default function FeaturesPage({ onNavigate }: FeaturesPageProps) {
  useScrollReveal();
  return (
    <div className="relative z-10 pt-20">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs mb-3" style={{ color: '#00e5ff', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            // why profilecraft
          </div>
          <h1 className="font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', color: '#e8e8ff' }}>
            Everything You Need to{' '}
            <span style={{ background: 'linear-gradient(135deg, #6c63ff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Stand Out
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#7878aa' }}>
            Professional-grade tools that go far beyond what any other GitHub README generator offers. We built the features developers actually need.
          </p>
        </div>
      </section>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)', opacity: 0.3 }} />

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs mb-3" style={{ color: '#00e5ff', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              // feature breakdown
            </div>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', color: '#e8e8ff' }}>
              12 Powerful Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border transition-all duration-300 group"
                style={{ background: '#0d0d14', borderColor: 'rgba(120,120,255,0.12)', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${f.color}66`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(120,120,255,0.12)')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${f.color}18`, color: f.color }}
                  >
                    {f.icon}
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${f.color}15`, color: f.color, fontFamily: 'monospace' }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#e8e8ff' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#7878aa' }}>{f.desc}</p>
                <p className="text-xs font-semibold italic" style={{ color: f.color }}>"{f.highlight}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)', opacity: 0.3 }} />

      {/* Comparison Table */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs mb-3" style={{ color: '#00e5ff', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            // vs the competition
          </div>
          <h2 className="font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', color: '#e8e8ff' }}>
            ProfileCraft vs GPRM
          </h2>
          <p className="mb-12" style={{ color: '#7878aa' }}>See exactly what makes ProfileCraft the smarter choice.</p>

          <div className="rounded-2xl border overflow-hidden" style={{ background: '#0d0d14', borderColor: 'rgba(120,120,255,0.12)' }}>
            <div className="grid grid-cols-3 px-6 py-4 text-sm font-bold" style={{ background: '#12121c', borderBottom: '1px solid rgba(120,120,255,0.12)' }}>
              <div style={{ color: '#7878aa' }}>Feature</div>
              <div className="text-center" style={{ color: '#00e5ff' }}>ProfileCraft</div>
              <div className="text-center" style={{ color: '#7878aa' }}>GPRM</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 px-6 py-4 text-sm border-b last:border-b-0"
                style={{ borderColor: 'rgba(120,120,255,0.08)' }}
              >
                <div style={{ color: '#9090cc' }}>{row.feature}</div>
                <div className="text-center text-lg">{row.profilecraft ? '✅' : '❌'}</div>
                <div className="text-center text-lg">{row.gprm ? '✅' : '❌'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)', opacity: 0.3 }} />

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', color: '#e8e8ff' }}>
            Ready to Build Your<br />
            <span style={{ background: 'linear-gradient(135deg, #6c63ff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Perfect Profile?
            </span>
          </h2>
          <p className="mb-8 text-base" style={{ color: '#7878aa' }}>
            Join thousands of developers who use ProfileCraft to make their first impression count.
          </p>
          <button
            onClick={() => onNavigate('builder')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
              color: '#fff',
              boxShadow: '0 0 40px rgba(108,99,255,0.4)',
            }}
          >
            Start Building Free <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
