import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../lib/useScrollReveal';
import { Page } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface ToolsPageProps {
  onNavigate: (page: Page) => void;
  githubUsername: string;
  statsTheme: string;
}

const TOOLS = [
  {
    id: 'stats',
    icon: '📊',
    tag: 'Dynamic',
    title: 'GitHub Stats Card',
    desc: 'Stars, commits, PRs, issues, and contribution count in a beautiful card.',
    getUrl: (u: string, t: string) => `https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${t}`,
  },
  {
    id: 'langs',
    icon: '🗂',
    tag: 'Dynamic',
    title: 'Top Languages',
    desc: 'Visual breakdown of your most-used programming languages.',
    getUrl: (u: string, t: string) => `https://github-readme-stats.vercel.app/api/top-langs?username=${u}&layout=compact&theme=${t}`,
  },
  {
    id: 'streak',
    icon: '🔥',
    tag: 'Dynamic',
    title: 'Streak Stats',
    desc: 'Show your current streak, total contributions, and longest streak.',
    getUrl: (u: string, t: string) => `https://streak-stats.demolab.com/?user=${u}&theme=${t}`,
  },
  {
    id: 'trophies',
    icon: '🏆',
    tag: 'Dynamic',
    title: 'Profile Trophies',
    desc: 'Virtual trophies awarded based on your GitHub achievements.',
    getUrl: (u: string, t: string) => `https://github-profile-trophy.vercel.app/?username=${u}&theme=${t}`,
  },
  {
    id: 'activity',
    icon: '📈',
    tag: 'Dynamic',
    title: 'Activity Graph',
    desc: 'Beautiful contribution graph showing your coding activity over time.',
    getUrl: (u: string) => `https://github-readme-activity-graph.vercel.app/graph?username=${u}&theme=react-dark`,
  },
  {
    id: 'quote',
    icon: '💬',
    tag: 'Random',
    title: 'Random Dev Quote',
    desc: 'A new inspirational programming quote every time your profile loads.',
    getUrl: () => 'https://quotes-github-readme.vercel.app/api?type=horizontal&theme=tokyonight',
  },
  {
    id: 'leetcode',
    icon: '🏅',
    tag: 'Competitive',
    title: 'LeetCode Stats',
    desc: 'Dynamic LeetCode stats card showing your rank, solved problems, and streak.',
    getUrl: (u: string) => `https://leetcard.jacoblin.cool/${u}?theme=dark`,
  },
  {
    id: 'visitor',
    icon: '👁',
    tag: 'Counter',
    title: 'Visitor Counter',
    desc: 'Track how many developers have visited your GitHub profile.',
    getUrl: (u: string) => `https://komarev.com/ghpvc/?username=${u}&label=Profile%20views&color=0e75b6&style=flat`,
  },
];

const FAQS = [
  {
    q: 'Do I need to fill all sections?',
    a: 'Not at all! Only your GitHub username is mandatory. All other sections — bio, social links, tech stack, stats — are completely optional. Customize your profile exactly how you want it.',
  },
  {
    q: 'Do I need to know Markdown or HTML?',
    a: 'No coding knowledge needed. GitGloss is a complete no-code solution. Fill in the fields, toggle your preferences, and copy or download the generated README.',
  },
  {
    q: 'How do I use the generated README?',
    a: '1. Go to github.com/new and create a repo with the EXACT same name as your GitHub username. 2. Make it public and initialize with a README. 3. Paste your generated code into the README.md file. 4. Commit — your profile is live!',
  },
  {
    q: 'Are the stats cards real-time?',
    a: 'Yes! The stats cards are powered by the GitHub API and update dynamically every time someone views your profile. They always reflect your current GitHub activity.',
  },
  {
    q: 'What does the AI Bio Tuner do?',
    a: 'Paste your resume bullet points or a description of your experience into the AI Bio Tuner, and it generates three distinct bio styles: Professional (for job applications), Creative (shows personality), and Minimalist (clean and concise). Pick the one that fits you best or use them as inspiration.',
  },
  {
    q: 'How does One-Click GitHub Import work?',
    a: 'Enter your GitHub username and click Fetch. We call the public GitHub API to pull your display name, bio, location, website, Twitter handle, and your most-used programming languages. We then auto-select the matching tech stack icons for you.',
  },
  {
    q: 'Is this tool completely free?',
    a: 'Completely free, forever. No account required, no watermarks, no limitations. GitGloss is open source and will always remain free for the community.',
  },
  {
    q: 'How do the blog post dynamic widgets work?',
    a: 'Connect your Medium RSS feed URL or Dev.to username. GitGloss will include a GitHub Actions workflow YAML snippet in your markdown. Paste this into your repository\'s .github/workflows/ folder and your README will auto-update with your latest posts on a schedule.',
  },
  {
    q: 'Can I use LeetCode and CodeWars stats?',
    a: 'Yes! Enter your LeetCode or CodeWars username in the Dynamic Widgets section. A live stats card or badge will be embedded in your README, auto-updating with your current progress.',
  },
  {
    q: 'What are the layout presets?',
    a: 'Choose from Center (content aligned to center — great for a polished look), Left (traditional left alignment), Grid (content displayed in a compact grid format), or Side-by-Side (stats and info next to each other). Apply with one click in the Design Controls section.',
  },
];

export default function ToolsPage({ onNavigate, githubUsername, statsTheme }: ToolsPageProps) {
  useScrollReveal();
  const [activeTool, setActiveTool] = useState('stats');
  const [previewUsername, setPreviewUsername] = useState(githubUsername || '');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const activeToolData = TOOLS.find(t => t.id === activeTool);
  const previewUrl = activeToolData?.getUrl(previewUsername || 'torvalds', statsTheme || 'tokyonight');

  return (
    <div className="relative z-10 pt-20">
      {/* Aurora orb */}
      <div className="aurora-orb aurora-orb-3" style={{ top: '30%', right: '10%' }} />

      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="section-label mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            // integrated tools
          </motion.div>
          <motion.h1
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            Powerful Stats Tools
          </motion.h1>
          <motion.p
            className="text-base"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            All the GitHub stat widgets you need, integrated and previewed right here.
          </motion.p>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Tools Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="rounded-2xl p-6 mb-6 glass-card"
            style={{ cursor: 'default' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>GitHub Stats Tools</h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Click any tool to preview it. Enter a GitHub username to see live data.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={previewUsername}
                  onChange={e => { setPreviewUsername(e.target.value); setImgLoaded(false); }}
                  placeholder="GitHub username to preview"
                  className="px-4 py-2.5 rounded-xl text-sm outline-none glass-input"
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    width: '220px',
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {TOOLS.map((tool, i) => (
                <motion.button
                  key={tool.id}
                  onClick={() => { setActiveTool(tool.id); setImgLoaded(false); }}
                  className="p-4 rounded-xl text-left transition-all duration-200 relative overflow-hidden"
                  style={{
                    background: activeTool === tool.id ? 'var(--accent-lighter)' : 'var(--bg-input)',
                    border: `1.5px solid ${activeTool === tool.id ? 'var(--accent)' : 'var(--border-primary)'}`,
                    cursor: 'pointer',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeTool === tool.id && (
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent), var(--cyan))',
                        borderRadius: 'inherit',
                      }}
                      layoutId="tool-active-bg"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span
                    className="absolute top-2 right-2 tag-badge"
                    style={{ background: 'var(--accent-lighter)', color: 'var(--accent)' }}
                  >
                    {tool.tag}
                  </span>
                  <div className="text-xl mb-2 relative z-10">{tool.icon}</div>
                  <div className="text-sm font-bold mb-1 relative z-10" style={{ color: 'var(--text-primary)' }}>{tool.title}</div>
                  <div className="text-xs leading-relaxed relative z-10" style={{ color: 'var(--text-muted)' }}>{tool.desc}</div>
                </motion.button>
              ))}
            </div>

            {/* Preview Box */}
            <motion.div
              className="rounded-xl p-5"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}
              layout
            >
              <div className="text-xs mb-4" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                // preview — {activeToolData?.title.toLowerCase()}
              </div>
              {previewUrl ? (
                <div className="relative">
                  {!imgLoaded && (
                    <div className="skeleton" style={{ width: '100%', height: '200px' }} />
                  )}
                  <motion.img
                    key={previewUrl}
                    src={previewUrl}
                    alt={`${activeTool} preview`}
                    style={{ maxWidth: '100%', borderRadius: '10px', display: imgLoaded ? 'block' : 'none' }}
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imgLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              ) : (
                <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>
                  Enter a GitHub username above to preview this tool.
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* CTA */}
          <div className="text-center">
            <motion.button
              onClick={() => onNavigate('builder')}
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add These to Your Profile <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* FAQ */}
      <section className="py-16 px-6" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              className="section-label mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              // help & faq
            </motion.div>
            <motion.h2
              className="font-extrabold tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden glass-card"
                style={{
                  cursor: 'pointer',
                  borderColor: openFaq === i ? 'var(--border-hover)' : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between transition-colors duration-200"
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: 'var(--text-primary)' }}>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ChevronDown
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: openFaq === i ? 'var(--accent)' : 'var(--text-muted)' }}
                    />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Still have questions?</p>
            <motion.button
              onClick={() => onNavigate('builder')}
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try the Builder <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
