import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileData } from '../types';
import { TECH } from '../lib/techData';
import { generateMarkdown } from '../lib/generateMarkdown';
import {
  Copy, Check, Download, RefreshCw, ChevronDown,
  Sparkles, Github, Palette, BarChart3, Link2, Zap, Coffee, Rss
} from 'lucide-react';

interface BuilderPageProps {
  data: ProfileData;
  setData: (d: ProfileData) => void;
}

const THEMES = [
  'tokyonight', 'radical', 'merko', 'gruvbox', 'onedark',
  'cobalt', 'synthwave', 'highcontrast', 'dracula', 'nord',
  'nightowl', 'buefy', 'algolia', 'great-gatsby', 'dark',
];

const CATEGORIES = ['All', 'Language', 'Frontend', 'Backend', 'DevOps', 'Database', 'Tool'];

function SectionCard({ title, icon, children, defaultOpen = true }: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="rounded-2xl mb-4 overflow-hidden glass-card"
      style={{ cursor: 'default' }}
      initial={false}
      layout
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left group"
        style={{ color: 'var(--text-primary)' }}
      >
        <div className="flex items-center gap-3 font-semibold text-sm">
          <span style={{ color: 'var(--accent)' }}>{icon}</span>
          {title}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-6" style={{ borderTop: '1px solid var(--border-primary)' }}>
              <div className="pt-4">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none glass-input"
        style={{ color: 'var(--text-primary)' }}
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none glass-input"
        style={{ color: 'var(--text-primary)' }}
      />
    </div>
  );
}

function Toggle({ label, checked, onChange, desc }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; desc?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-3">
      <div>
        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</div>
        {desc && <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className="toggle-track"
        style={{ background: checked ? 'var(--accent)' : 'rgba(108,99,255,0.15)' }}
      >
        <span
          className="toggle-thumb"
          style={{ transform: checked ? 'translateX(22px)' : 'translateX(2px)' }}
        />
      </button>
    </div>
  );
}

export default function BuilderPage({ data, setData }: BuilderPageProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown'>('preview');
  const [techCategory, setTechCategory] = useState('All');
  const [githubImporting, setGithubImporting] = useState(false);
  const [aiBioInput, setAiBioInput] = useState('');
  const [aiBios, setAiBios] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const update = useCallback(<K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setData({ ...data, [key]: value });
  }, [data, setData]);

  const markdown = generateMarkdown(data);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGitHubImport = async () => {
    if (!data.username) return;
    setGithubImporting(true);
    try {
      const res = await fetch(`https://api.github.com/users/${data.username}`);
      const user = await res.json();
      if (user.name) update('name', user.name);
      if (user.bio) update('bio', user.bio);
      if (user.twitter_username) update('twitter', user.twitter_username);
      if (user.blog) update('website', user.blog.replace(/^https?:\/\//, ''));
    } catch {
      // silently fail
    } finally {
      setGithubImporting(false);
    }
  };

  const generateFallbackBios = (input: string, name: string): string[] => {
    const firstLine = input.split('\n').find(l => l.trim().length > 5)?.replace(/^[•\-*]\s*/, '') || input.slice(0, 80);
    const techs = input.match(/\b(React|Vue|Angular|Node|Python|TypeScript|JavaScript|Go|Rust|Java|AWS|Docker|Kubernetes|GraphQL|Next\.js|Django|Laravel|Spring|Flutter|Swift|Kotlin)\b/gi);
    const techStr = techs ? [...new Set(techs)].slice(0, 3).join(', ') : 'modern technologies';
    const yearsMatch = input.match(/(\d+)\+?\s*years?/i);
    const years = yearsMatch ? `${yearsMatch[1]}+ years of` : '';
    return [
      `Results-driven software developer with ${years} experience building scalable systems. Specializing in ${techStr}. ${firstLine ? firstLine + '.' : 'Always focused on writing clean, efficient code.'}`,
      `Code poet & problem solver ✨ I turn complex challenges into elegant solutions using ${techStr}. ${firstLine ? firstLine + ' 🚀' : 'Building things that matter, one commit at a time.'}`,
      `${name || 'Developer'}. ${techStr} specialist. ${firstLine ? firstLine + '.' : 'Open source enthusiast.'}`,
    ];
  };

  const handleAIBio = async () => {
    if (!aiBioInput.trim()) return;
    setAiLoading(true);
    setAiBios([]);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    try {
      if (supabaseUrl && supabaseKey) {
        const res = await fetch(`${supabaseUrl}/functions/v1/generate-bio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'apikey': supabaseKey,
          },
          body: JSON.stringify({ resume: aiBioInput, name: data.name }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.professional && json.creative && json.minimalist) {
            setAiBios([json.professional, json.creative, json.minimalist]);
            return;
          }
          if (Array.isArray(json) && json.length >= 3) {
            setAiBios(json.slice(0, 3));
            return;
          }
        }
      }
      setAiBios(generateFallbackBios(aiBioInput, data.name));
    } catch {
      setAiBios(generateFallbackBios(aiBioInput, data.name));
    } finally {
      setAiLoading(false);
    }
  };

  const toggleTech = (idx: number) => {
    const next = new Set(data.selectedTechs);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    update('selectedTechs', next);
  };

  const filteredTech = TECH.map((t, i) => ({ ...t, i }))
    .filter(t => techCategory === 'All' || t.category === techCategory);

  return (
    <div className="pt-20 pb-16 px-4 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 gradient-text-static"
          >
            Profile Builder
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Fill in your details on the left — see your README update live on the right.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ===== LEFT PANEL ===== */}
          <motion.div
            className="w-full lg:w-[420px] flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >

            {/* GitHub Import */}
            <SectionCard title="GitHub Import" icon={<Github size={16} />}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={data.username}
                  onChange={e => update('username', e.target.value)}
                  placeholder="your-github-username"
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none glass-input"
                  style={{ color: 'var(--text-primary)' }}
                />
                <motion.button
                  onClick={handleGitHubImport}
                  disabled={!data.username || githubImporting}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: data.username ? 'var(--accent-lighter)' : 'rgba(108,99,255,0.05)',
                    color: data.username ? 'var(--accent)' : 'var(--text-muted)',
                    border: '1.5px solid var(--border-primary)',
                  }}
                  whileHover={data.username ? { scale: 1.03 } : {}}
                  whileTap={data.username ? { scale: 0.97 } : {}}
                >
                  {githubImporting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <RefreshCw size={14} />
                    </motion.div>
                  ) : (
                    <Github size={14} />
                  )}
                  Fetch
                </motion.button>
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                Auto-fills your name, bio, and social links from GitHub.
              </p>
            </SectionCard>

            {/* Basic Info */}
            <SectionCard title="Basic Info" icon={<Sparkles size={16} />}>
              <InputField label="Display Name" value={data.name} onChange={v => update('name', v)} placeholder="Ada Lovelace" />
              <InputField label="Tagline / Subtitle" value={data.tagline} onChange={v => update('tagline', v)} placeholder="Full-stack developer & open source enthusiast" />
              <TextareaField label="Bio" value={data.bio} onChange={v => update('bio', v)} placeholder="Tell the world who you are..." rows={3} />
              <InputField label="🔭 Currently Working On" value={data.working} onChange={v => update('working', v)} placeholder="🔭 I'm currently working on ..." />
              <InputField label="🌱 Currently Learning" value={data.learning} onChange={v => update('learning', v)} placeholder="🌱 I'm currently learning ..." />
              <InputField label="💬 Ask Me About" value={data.askme} onChange={v => update('askme', v)} placeholder="React, TypeScript, system design" />
              <InputField label="⚡ Fun Fact" value={data.funfact} onChange={v => update('funfact', v)} placeholder="⚡ Fun fact: ..." />
            </SectionCard>

            {/* AI Bio Tuner */}
            <SectionCard title="AI Bio Tuner" icon={<Sparkles size={16} />} defaultOpen={false}>
              <TextareaField
                label="Paste your resume or bullet points"
                value={aiBioInput}
                onChange={setAiBioInput}
                placeholder="5 years full-stack dev, React/Node expert, built SaaS products, open source contributor..."
                rows={4}
              />
              <motion.button
                onClick={handleAIBio}
                disabled={!aiBioInput.trim() || aiLoading}
                className="w-full py-2.5 rounded-xl text-sm font-semibold mb-4 transition-all"
                style={{
                  background: aiBioInput.trim() ? 'linear-gradient(135deg, #6c63ff, #8b5cf6)' : 'rgba(108,99,255,0.08)',
                  color: aiBioInput.trim() ? '#fff' : 'var(--text-muted)',
                }}
                whileHover={aiBioInput.trim() ? { scale: 1.02 } : {}}
                whileTap={aiBioInput.trim() ? { scale: 0.98 } : {}}
              >
                {aiLoading ? 'Generating...' : '✦ Generate Bio Styles'}
              </motion.button>
              <AnimatePresence>
                {aiBios.length > 0 && (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {['Professional', 'Creative', 'Minimalist'].map((style, i) => (
                      aiBios[i] ? (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                          className="p-4 rounded-xl glass-card"
                          style={{ cursor: 'default' }}
                        >
                          <div className="text-xs font-semibold mb-1" style={{ color: 'var(--accent)' }}>{style}</div>
                          <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-primary)' }}>{aiBios[i]}</p>
                          <motion.button
                            onClick={() => update('bio', aiBios[i])}
                            className="text-xs px-3 py-1.5 rounded-lg font-medium"
                            style={{ background: 'var(--accent-lighter)', color: 'var(--accent)' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Use this
                          </motion.button>
                        </motion.div>
                      ) : null
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </SectionCard>

            {/* Design */}
            <SectionCard title="Design & Layout" icon={<Palette size={16} />} defaultOpen={false}>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Layout</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['center', 'left', 'grid', 'side'] as const).map(l => (
                    <motion.button
                      key={l}
                      onClick={() => update('layout', l)}
                      className="py-2.5 rounded-xl text-xs font-medium capitalize transition-all"
                      style={{
                        background: data.layout === l ? 'var(--accent-lighter)' : 'var(--bg-input)',
                        color: data.layout === l ? 'var(--accent)' : 'var(--text-muted)',
                        border: `1.5px solid ${data.layout === l ? 'var(--border-hover)' : 'var(--border-primary)'}`,
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Stats Theme</label>
                <select
                  value={data.statsTheme}
                  onChange={e => update('statsTheme', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none glass-input"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Brand Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={data.brandColor}
                    onChange={e => update('brandColor', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer"
                    style={{ background: 'none', border: '1.5px solid var(--border-primary)', padding: '2px' }}
                  />
                  <span className="text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{data.brandColor}</span>
                </div>
              </div>
            </SectionCard>

            {/* GitHub Stats */}
            <SectionCard title="GitHub Stats" icon={<BarChart3 size={16} />} defaultOpen={false}>
              <Toggle label="Stats Card" checked={data.showStats} onChange={v => update('showStats', v)} desc="Stars, commits, PRs, issues" />
              <Toggle label="Top Languages" checked={data.showLangs} onChange={v => update('showLangs', v)} desc="Visual language breakdown" />
              <Toggle label="Streak Stats" checked={data.showStreak} onChange={v => update('showStreak', v)} desc="Current & longest streak" />
              <Toggle label="Profile Trophies" checked={data.showTrophies} onChange={v => update('showTrophies', v)} desc="Achievement trophies" />
              <Toggle label="Visitor Counter" checked={data.showVisitors} onChange={v => update('showVisitors', v)} desc="Profile view count badge" />
            </SectionCard>

            {/* Social Links */}
            <SectionCard title="Social Links" icon={<Link2 size={16} />} defaultOpen={false}>
              <InputField label="Twitter / X username" value={data.twitter} onChange={v => update('twitter', v)} placeholder="username" />
              <InputField label="LinkedIn username" value={data.linkedin} onChange={v => update('linkedin', v)} placeholder="username" />
              <InputField label="Instagram username" value={data.instagram} onChange={v => update('instagram', v)} placeholder="username" />
              <InputField label="YouTube channel" value={data.youtube} onChange={v => update('youtube', v)} placeholder="@channel or channel-id" />
              <InputField label="Dev.to username" value={data.devto} onChange={v => update('devto', v)} placeholder="username" />
              <InputField label="Discord username" value={data.discord} onChange={v => update('discord', v)} placeholder="username#0000" />
              <InputField label="Email" value={data.email} onChange={v => update('email', v)} placeholder="you@example.com" type="email" />
              <InputField label="Website" value={data.website} onChange={v => update('website', v)} placeholder="yoursite.com" />
            </SectionCard>

            {/* Tech Stack */}
            <SectionCard title="Tech Stack" icon={<Zap size={16} />} defaultOpen={false}>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {CATEGORIES.map(cat => (
                  <motion.button
                    key={cat}
                    onClick={() => setTechCategory(cat)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: techCategory === cat ? 'var(--accent-lighter)' : 'var(--bg-input)',
                      color: techCategory === cat ? 'var(--accent)' : 'var(--text-muted)',
                      border: `1.5px solid ${techCategory === cat ? 'var(--border-hover)' : 'var(--border-primary)'}`,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
                {filteredTech.map(({ name, i }) => (
                  <motion.button
                    key={i}
                    onClick={() => toggleTech(i)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all text-left"
                    style={{
                      background: data.selectedTechs.has(i) ? 'var(--accent-lighter)' : 'var(--bg-input)',
                      color: data.selectedTechs.has(i) ? 'var(--text-primary)' : 'var(--text-muted)',
                      border: `1.5px solid ${data.selectedTechs.has(i) ? 'var(--border-hover)' : 'var(--border-primary)'}`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="w-3.5 h-3.5 rounded flex-shrink-0 flex items-center justify-center"
                      style={{ background: data.selectedTechs.has(i) ? 'var(--accent)' : 'rgba(108,99,255,0.15)' }}
                      animate={data.selectedTechs.has(i) ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {data.selectedTechs.has(i) && (
                        <Check size={8} color="white" strokeWidth={3} />
                      )}
                    </motion.span>
                    {name}
                  </motion.button>
                ))}
              </div>
              {data.selectedTechs.size > 0 && (
                <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                  {data.selectedTechs.size} tech{data.selectedTechs.size > 1 ? 's' : ''} selected
                </p>
              )}
            </SectionCard>

            {/* Competitive */}
            <SectionCard title="Competitive Programming" icon={<BarChart3 size={16} />} defaultOpen={false}>
              <Toggle label="LeetCode Stats" checked={data.showLeetcode} onChange={v => update('showLeetcode', v)} />
              {data.showLeetcode && (
                <InputField label="LeetCode Username" value={data.leetcodeUsername} onChange={v => update('leetcodeUsername', v)} placeholder="your_leetcode_username" />
              )}
              <Toggle label="CodeWars Badge" checked={data.showCodewars} onChange={v => update('showCodewars', v)} />
              {data.showCodewars && (
                <InputField label="CodeWars Username" value={data.codewarsUsername} onChange={v => update('codewarsUsername', v)} placeholder="your_codewars_username" />
              )}
            </SectionCard>

            {/* Blog Posts */}
            <SectionCard title="Blog Posts" icon={<Rss size={16} />} defaultOpen={false}>
              <Toggle label="Show Latest Blog Posts" checked={data.showBlogPosts} onChange={v => update('showBlogPosts', v)} desc="Via GitHub Actions auto-update" />
              {data.showBlogPosts && (
                <>
                  <InputField label="Medium RSS Feed URL" value={data.mediumRss} onChange={v => update('mediumRss', v)} placeholder="https://medium.com/feed/@username" />
                  <InputField label="Dev.to username (for feed)" value={data.devtoWidget} onChange={v => update('devtoWidget', v)} placeholder="username" />
                </>
              )}
            </SectionCard>

            {/* Fun Widgets */}
            <SectionCard title="Fun Widgets" icon={<Sparkles size={16} />} defaultOpen={false}>
              <Toggle label="Random Dev Quote" checked={data.showQuote} onChange={v => update('showQuote', v)} />
              <Toggle label="Contribution Snake" checked={data.showSnake} onChange={v => update('showSnake', v)} />
              <Toggle label="Random Meme" checked={data.showMeme} onChange={v => update('showMeme', v)} />
              <Toggle label="Spotify Now Playing" checked={data.showSpotify} onChange={v => update('showSpotify', v)} />
              {data.showSpotify && (
                <InputField label="Spotify User ID" value={data.spotify} onChange={v => update('spotify', v)} placeholder="spotify_user_id" />
              )}
            </SectionCard>

            {/* Support */}
            <SectionCard title="Support / Donations" icon={<Coffee size={16} />} defaultOpen={false}>
              <InputField label="Buy Me a Coffee username" value={data.bmc} onChange={v => update('bmc', v)} placeholder="username" />
              <InputField label="Ko-fi username" value={data.kofi} onChange={v => update('kofi', v)} placeholder="username" />
              <InputField label="PayPal username / link" value={data.paypal} onChange={v => update('paypal', v)} placeholder="username" />
            </SectionCard>
          </motion.div>

          {/* ===== RIGHT PANEL — PREVIEW ===== */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div
              className="sticky top-20 rounded-2xl overflow-hidden glass-card"
              style={{ maxHeight: 'calc(100vh - 6rem)', cursor: 'default' }}
            >
              {/* Tab bar */}
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--border-primary)' }}>
                <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-input)' }}>
                  {(['preview', 'markdown'] as const).map(tab => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all relative"
                      style={{
                        color: activeTab === tab ? 'var(--accent)' : 'var(--text-muted)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="tab-indicator"
                          className="absolute inset-0 rounded-lg"
                          style={{ background: 'var(--bg-secondary)', boxShadow: 'var(--shadow-sm)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </motion.button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: copied ? 'rgba(16,185,129,0.1)' : 'var(--accent-lighter)',
                      color: copied ? '#10b981' : 'var(--accent)',
                      border: `1.5px solid ${copied ? 'rgba(16,185,129,0.3)' : 'var(--border-primary)'}`,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Check size={12} />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Copy size={12} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                  <motion.button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: 'var(--bg-input)',
                      color: 'var(--text-muted)',
                      border: '1.5px solid var(--border-primary)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={12} />
                    .md
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
                <AnimatePresence mode="wait">
                  {activeTab === 'markdown' ? (
                    <motion.pre
                      key="markdown"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 text-xs leading-relaxed overflow-x-auto"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                    >
                      {markdown || '# Your README will appear here\n\nFill in your details on the left to get started.'}
                    </motion.pre>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-5"
                    >
                      {!data.username && !data.name ? (
                        <div className="text-center py-20">
                          <motion.div
                            className="text-4xl mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                          >
                            ✦
                          </motion.div>
                          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Fill in your GitHub username or name to see your preview.
                          </p>
                        </div>
                      ) : (
                        <div className="prose max-w-none text-sm" style={{ color: 'var(--text-primary)' }}>
                          <MarkdownPreview markdown={markdown} />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function MarkdownPreview({ markdown }: { markdown: string }) {
  const html = markdown
    .replace(/^# (.+)$/gm, '<h1 style="font-size:1.5rem;font-weight:800;margin-bottom:0.5rem;color:var(--text-primary)">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.4rem;color:var(--text-primary);margin-top:1rem">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1rem;font-weight:600;margin-bottom:0.3rem;color:var(--text-secondary);margin-top:0.8rem">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="margin-bottom:0.25rem;color:var(--text-secondary)">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul style="padding-left:1.25rem;margin-bottom:0.75rem">$&</ul>')
    .replace(/\[!\[([^\]]+)\]\([^)]+\)\]\([^)]+\)/g, '<span style="display:inline-block;background:var(--accent-lighter);color:var(--accent);padding:2px 8px;border-radius:4px;font-size:0.7rem;margin:2px">$1</span>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;border-radius:6px;margin:4px 0" />')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
