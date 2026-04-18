import { useState } from 'react';
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
    a: 'No coding knowledge needed. ProfileCraft is a complete no-code solution. Fill in the fields, toggle your preferences, and copy or download the generated README.',
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
    a: 'Completely free, forever. No account required, no watermarks, no limitations. ProfileCraft is open source and will always remain free for the community.',
  },
  {
    q: 'How do the blog post dynamic widgets work?',
    a: 'Connect your Medium RSS feed URL or Dev.to username. ProfileCraft will include a GitHub Actions workflow YAML snippet in your markdown. Paste this into your repository\'s .github/workflows/ folder and your README will auto-update with your latest posts on a schedule.',
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

  const activeToolData = TOOLS.find(t => t.id === activeTool);
  const previewUrl = activeToolData?.getUrl(previewUsername || 'torvalds', statsTheme || 'tokyonight');

  return (
    <div className="relative z-10 pt-20">
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs mb-3" style={{ color: '#00e5ff', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            // integrated tools
          </div>
          <h1 className="font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.04em', color: '#e8e8ff' }}>
            Powerful Stats Tools
          </h1>
          <p className="text-base" style={{ color: '#7878aa' }}>
            All the GitHub stat widgets you need, integrated and previewed right here.
          </p>
        </div>
      </section>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)', opacity: 0.3 }} />

      {/* Tools Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border p-6 mb-6" style={{ background: '#0d0d14', borderColor: 'rgba(120,120,255,0.12)' }}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="font-bold text-lg mb-1" style={{ color: '#e8e8ff' }}>GitHub Stats Tools</h2>
                <p className="text-sm" style={{ color: '#7878aa' }}>Click any tool to preview it. Enter a GitHub username to see live data.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={previewUsername}
                  onChange={e => setPreviewUsername(e.target.value)}
                  placeholder="GitHub username to preview"
                  className="px-4 py-2 rounded-lg text-sm outline-none"
                  style={{
                    background: '#12121c',
                    border: '1px solid rgba(120,120,255,0.2)',
                    color: '#e8e8ff',
                    fontFamily: 'monospace',
                    width: '220px',
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {TOOLS.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className="p-4 rounded-xl border text-left transition-all duration-200 relative"
                  style={{
                    background: activeTool === tool.id ? 'rgba(108,99,255,0.1)' : '#12121c',
                    borderColor: activeTool === tool.id ? '#6c63ff' : 'rgba(120,120,255,0.12)',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,229,255,0.1)', color: '#00e5ff', fontFamily: 'monospace', fontSize: '0.6rem' }}
                  >
                    {tool.tag}
                  </span>
                  <div className="text-xl mb-2">{tool.icon}</div>
                  <div className="text-sm font-bold mb-1" style={{ color: '#e8e8ff' }}>{tool.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#7878aa' }}>{tool.desc}</div>
                </button>
              ))}
            </div>

            {/* Preview Box */}
            <div className="rounded-xl border p-5" style={{ background: '#08080e', borderColor: 'rgba(120,120,255,0.12)' }}>
              <div className="text-xs mb-4 font-mono" style={{ color: '#00e5ff' }}>
                // preview — {activeToolData?.title.toLowerCase()}
              </div>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={`${activeTool} preview`}
                  style={{ maxWidth: '100%', borderRadius: '10px' }}
                  loading="lazy"
                />
              ) : (
                <p className="text-sm text-center py-8" style={{ color: '#7878aa' }}>
                  Enter a GitHub username above to preview this tool.
                </p>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => onNavigate('builder')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
                color: '#fff',
                boxShadow: '0 0 30px rgba(108,99,255,0.4)',
              }}
            >
              Add These to Your Profile <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)', opacity: 0.3 }} />

      {/* FAQ */}
      <section className="py-16 px-6" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs mb-3" style={{ color: '#00e5ff', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              // help & faq
            </div>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', color: '#e8e8ff' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{
                  background: '#0d0d14',
                  borderColor: openFaq === i ? 'rgba(108,99,255,0.4)' : 'rgba(120,120,255,0.12)',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between transition-colors duration-200 hover:bg-white/[0.02]"
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: '#e8e8ff' }}>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: openFaq === i ? '#00e5ff' : '#7878aa',
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#7878aa' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm mb-4" style={{ color: '#7878aa' }}>Still have questions?</p>
            <button
              onClick={() => onNavigate('builder')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
                color: '#fff',
                boxShadow: '0 0 30px rgba(108,99,255,0.4)',
              }}
            >
              Try the Builder <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
