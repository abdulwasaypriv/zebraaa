import { Page } from '../types';
import { motion } from 'framer-motion';
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
    color: '#f43f8f',
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
    color: '#0ea5e9',
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
    desc: 'Connect your Medium or Dev.to RSS feed. GitGloss generates a complete GitHub Actions workflow snippet that auto-updates your latest articles.',
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
  { feature: 'AI Bio Generation', GitGloss: true, gprm: false },
  { feature: 'One-Click GitHub Import', GitGloss: true, gprm: false },
  { feature: 'Real-Time Live Preview', GitGloss: true, gprm: false },
  { feature: 'Layout Presets (4 options)', GitGloss: true, gprm: false },
  { feature: 'Brand Color System', GitGloss: true, gprm: false },
  { feature: 'LeetCode Stats Widget', GitGloss: true, gprm: false },
  { feature: 'CodeWars Badge', GitGloss: true, gprm: false },
  { feature: 'Blog Post Automation', GitGloss: true, gprm: false },
  { feature: 'Tech Stack Icons', GitGloss: true, gprm: true },
  { feature: 'GitHub Stats Cards', GitGloss: true, gprm: true },
  { feature: 'Social Links', GitGloss: true, gprm: true },
  { feature: 'Export README.md', GitGloss: true, gprm: true },
];

export default function FeaturesPage({ onNavigate }: FeaturesPageProps) {
  useScrollReveal();
  return (
    <div className="relative z-10 pt-20">
      {/* Aurora orbs */}
      <div className="aurora-orb aurora-orb-1" style={{ top: '10%', right: '20%' }} />
      <div className="aurora-orb aurora-orb-2" style={{ top: '50%', left: '5%' }} />

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="section-label mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            // why GitGloss
          </motion.div>
          <motion.h1
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          >
            Everything You Need to{' '}
            <span className="gradient-text-static">Stand Out</span>
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Professional-grade tools that go far beyond what any other GitHub README generator offers. We built the features developers actually need.
          </motion.p>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mb-3">// feature breakdown</div>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
              12 Powerful Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl glass-card group"
                style={{ cursor: 'default' }}
                initial={{ opacity: 0, y: 30, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -6, boxShadow: `0 20px 60px ${f.color}15` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${f.color}12`, color: f.color }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {f.icon}
                  </motion.div>
                  <span
                    className="tag-badge"
                    style={{ background: `${f.color}10`, color: f.color }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                <p className="text-xs font-semibold italic" style={{ color: f.color }}>"{f.highlight}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Comparison Table */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="section-label mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            // vs the competition
          </motion.div>
          <motion.h2
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            GitGloss vs GPRM
          </motion.h2>
          <motion.p
            className="mb-12"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            See exactly what makes GitGloss the smarter choice.
          </motion.p>

          <motion.div
            className="rounded-2xl overflow-hidden glass-card"
            style={{ cursor: 'default' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="grid grid-cols-3 px-6 py-4 text-sm font-bold"
              style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-primary)' }}
            >
              <div style={{ color: 'var(--text-muted)' }}>Feature</div>
              <div className="text-center" style={{ color: 'var(--accent)' }}>GitGloss</div>
              <div className="text-center" style={{ color: 'var(--text-muted)' }}>GPRM</div>
            </div>
            {COMPARISON.map((row, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-3 px-6 py-4 text-sm"
                style={{ borderBottom: i < COMPARISON.length - 1 ? '1px solid var(--border-primary)' : 'none' }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <div style={{ color: 'var(--text-secondary)' }}>{row.feature}</div>
                <div className="text-center text-lg">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 + 0.15, type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {row.GitGloss ? '✅' : '❌'}
                  </motion.span>
                </div>
                <div className="text-center text-lg">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 + 0.2, type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {row.gprm ? '✅' : '❌'}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Build Your<br />
            <span className="gradient-text-static">Perfect Profile?</span>
          </motion.h2>
          <motion.p
            className="mb-8 text-base"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Join thousands of developers who use GitGloss to make their first impression count.
          </motion.p>
          <motion.button
            onClick={() => onNavigate('builder')}
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Start Building Free <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
