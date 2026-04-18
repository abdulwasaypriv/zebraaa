import { useState, useCallback } from 'react';
import { ProfileData } from '../types';
import { TECH } from '../lib/techData';
import { generateMarkdown } from '../lib/generateMarkdown';
import {
  Copy, Check, Download, RefreshCw, ChevronDown, ChevronUp,
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
  return (
    <div
      className="rounded-2xl border mb-4 overflow-hidden"
      style={{ background: '#0d0d14', borderColor: 'rgba(120,120,255,0.12)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        style={{ color: '#e8e8ff' }}
      >
        <div className="flex items-center gap-3 font-semibold text-sm">
          <span style={{ color: '#00e5ff' }}>{icon}</span>
          {title}
        </div>
        {open ? <ChevronUp size={16} style={{ color: '#7878aa' }} /> : <ChevronDown size={16} style={{ color: '#7878aa' }} />}
      </button>
      {open && (
        <div className="px-6 pb-6 border-t" style={{ borderColor: 'rgba(120,120,255,0.08)' }}>
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium mb-1.5" style={{ color: '#7878aa' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(120,120,255,0.15)',
          color: '#e8e8ff',
        }}
        onFocus={e => (e.target.style.borderColor = 'rgba(108,99,255,0.5)')}
        onBlur={e => (e.target.style.borderColor = 'rgba(120,120,255,0.15)')}
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
      <label className="block text-xs font-medium mb-1.5" style={{ color: '#7878aa' }}>{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors resize-none"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(120,120,255,0.15)',
          color: '#e8e8ff',
        }}
        onFocus={e => (e.target.style.borderColor = 'rgba(108,99,255,0.5)')}
        onBlur={e => (e.target.style.borderColor = 'rgba(120,120,255,0.15)')}
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
        <div className="text-sm font-medium" style={{ color: '#e8e8ff' }}>{label}</div>
        {desc && <div className="text-xs mt-0.5" style={{ color: '#7878aa' }}>{desc}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className="relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-200"
        style={{ background: checked ? '#6c63ff' : 'rgba(120,120,255,0.2)' }}
      >
        <span
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200"
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
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2"
            style={{ background: 'linear-gradient(135deg, #6c63ff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Profile Builder
          </h1>
          <p className="text-sm" style={{ color: '#7878aa' }}>
            Fill in your details on the left — see your README update live on the right.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ===== LEFT PANEL ===== */}
          <div className="w-full lg:w-[420px] flex-shrink-0">

            {/* GitHub Import */}
            <SectionCard title="GitHub Import" icon={<Github size={16} />}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={data.username}
                  onChange={e => update('username', e.target.value)}
                  placeholder="your-github-username"
                  className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(120,120,255,0.15)',
                    color: '#e8e8ff',
                  }}
                />
                <button
                  onClick={handleGitHubImport}
                  disabled={!data.username || githubImporting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: data.username ? 'rgba(108,99,255,0.2)' : 'rgba(120,120,255,0.08)',
                    color: data.username ? '#00e5ff' : '#7878aa',
                    border: '1px solid rgba(108,99,255,0.2)',
                  }}
                >
                  {githubImporting ? <RefreshCw size={14} className="animate-spin" /> : <Github size={14} />}
                  Fetch
                </button>
              </div>
              <p className="text-xs mt-2" style={{ color: '#7878aa' }}>
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
              <button
                onClick={handleAIBio}
                disabled={!aiBioInput.trim() || aiLoading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold mb-4 transition-all"
                style={{
                  background: aiBioInput.trim() ? 'linear-gradient(135deg, #6c63ff, #8b5cf6)' : 'rgba(120,120,255,0.1)',
                  color: aiBioInput.trim() ? '#fff' : '#7878aa',
                }}
              >
                {aiLoading ? 'Generating...' : '✦ Generate Bio Styles'}
              </button>
              {aiBios.length > 0 && (
                <div className="space-y-3">
                  {['Professional', 'Creative', 'Minimalist'].map((style, i) => (
                    aiBios[i] ? (
                      <div key={i} className="p-3 rounded-lg border" style={{ borderColor: 'rgba(120,120,255,0.15)', background: 'rgba(255,255,255,0.02)' }}>
                        <div className="text-xs font-semibold mb-1" style={{ color: '#00e5ff' }}>{style}</div>
                        <p className="text-xs leading-relaxed mb-2" style={{ color: '#e8e8ff' }}>{aiBios[i]}</p>
                        <button
                          onClick={() => update('bio', aiBios[i])}
                          className="text-xs px-2 py-1 rounded font-medium"
                          style={{ background: 'rgba(108,99,255,0.2)', color: '#6c63ff' }}
                        >
                          Use this
                        </button>
                      </div>
                    ) : null
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Design */}
            <SectionCard title="Design & Layout" icon={<Palette size={16} />} defaultOpen={false}>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-2" style={{ color: '#7878aa' }}>Layout</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['center', 'left', 'grid', 'side'] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => update('layout', l)}
                      className="py-2 rounded-lg text-xs font-medium capitalize transition-all"
                      style={{
                        background: data.layout === l ? 'rgba(108,99,255,0.25)' : 'rgba(255,255,255,0.04)',
                        color: data.layout === l ? '#00e5ff' : '#7878aa',
                        border: `1px solid ${data.layout === l ? 'rgba(108,99,255,0.4)' : 'rgba(120,120,255,0.1)'}`,
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-2" style={{ color: '#7878aa' }}>Stats Theme</label>
                <select
                  value={data.statsTheme}
                  onChange={e => update('statsTheme', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(120,120,255,0.15)',
                    color: '#e8e8ff',
                  }}
                >
                  {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-2" style={{ color: '#7878aa' }}>Brand Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={data.brandColor}
                    onChange={e => update('brandColor', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer"
                    style={{ background: 'none', border: '1px solid rgba(120,120,255,0.2)', padding: '2px' }}
                  />
                  <span className="text-sm font-mono" style={{ color: '#e8e8ff' }}>{data.brandColor}</span>
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
                  <button
                    key={cat}
                    onClick={() => setTechCategory(cat)}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: techCategory === cat ? 'rgba(108,99,255,0.25)' : 'rgba(255,255,255,0.04)',
                      color: techCategory === cat ? '#00e5ff' : '#7878aa',
                      border: `1px solid ${techCategory === cat ? 'rgba(108,99,255,0.4)' : 'rgba(120,120,255,0.1)'}`,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
                {filteredTech.map(({ name, i }) => (
                  <button
                    key={i}
                    onClick={() => toggleTech(i)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all text-left"
                    style={{
                      background: data.selectedTechs.has(i) ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.03)',
                      color: data.selectedTechs.has(i) ? '#e8e8ff' : '#7878aa',
                      border: `1px solid ${data.selectedTechs.has(i) ? 'rgba(108,99,255,0.4)' : 'rgba(120,120,255,0.08)'}`,
                    }}
                  >
                    <span
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ background: data.selectedTechs.has(i) ? '#6c63ff' : 'rgba(120,120,255,0.2)' }}
                    />
                    {name}
                  </button>
                ))}
              </div>
              {data.selectedTechs.size > 0 && (
                <p className="text-xs mt-3" style={{ color: '#7878aa' }}>
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
          </div>

          {/* ===== RIGHT PANEL — PREVIEW ===== */}
          <div className="flex-1 min-w-0">
            <div
              className="sticky top-20 rounded-2xl border overflow-hidden"
              style={{ background: '#0d0d14', borderColor: 'rgba(120,120,255,0.12)', maxHeight: 'calc(100vh - 6rem)' }}
            >
              {/* Tab bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(120,120,255,0.08)' }}>
                <div className="flex gap-1">
                  {(['preview', 'markdown'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                      style={{
                        background: activeTab === tab ? 'rgba(108,99,255,0.2)' : 'transparent',
                        color: activeTab === tab ? '#00e5ff' : '#7878aa',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(108,99,255,0.15)',
                      color: copied ? '#10b981' : '#00e5ff',
                      border: `1px solid ${copied ? 'rgba(16,185,129,0.3)' : 'rgba(108,99,255,0.3)'}`,
                    }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: '#7878aa',
                      border: '1px solid rgba(120,120,255,0.15)',
                    }}
                  >
                    <Download size={12} />
                    .md
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
                {activeTab === 'markdown' ? (
                  <pre
                    className="p-5 text-xs leading-relaxed overflow-x-auto"
                    style={{ color: '#a0a0cc', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                  >
                    {markdown || '# Your README will appear here\n\nFill in your details on the left to get started.'}
                  </pre>
                ) : (
                  <div className="p-5">
                    {!data.username && !data.name ? (
                      <div className="text-center py-20">
                        <div className="text-4xl mb-4">✦</div>
                        <p className="text-sm" style={{ color: '#7878aa' }}>
                          Fill in your GitHub username or name to see your preview.
                        </p>
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none text-sm" style={{ color: '#e8e8ff' }}>
                        <MarkdownPreview markdown={markdown} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkdownPreview({ markdown }: { markdown: string }) {
  const html = markdown
    .replace(/^# (.+)$/gm, '<h1 style="font-size:1.5rem;font-weight:800;margin-bottom:0.5rem;color:#e8e8ff">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.4rem;color:#e8e8ff;margin-top:1rem">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1rem;font-weight:600;margin-bottom:0.3rem;color:#a0a0cc;margin-top:0.8rem">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="margin-bottom:0.25rem;color:#c0c0dd">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul style="padding-left:1.25rem;margin-bottom:0.75rem">$&</ul>')
    .replace(/\[!\[([^\]]+)\]\([^)]+\)\]\([^)]+\)/g, '<span style="display:inline-block;background:rgba(108,99,255,0.15);color:#00e5ff;padding:2px 8px;border-radius:4px;font-size:0.7rem;margin:2px">$1</span>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;border-radius:6px;margin:4px 0" />')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
