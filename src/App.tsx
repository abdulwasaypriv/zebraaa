import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
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

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [data, setData] = useState<ProfileData>(DEFAULT_DATA);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#050508', color: '#e8e8ff' }}>
      <ThreeBackground />
      <Nav currentPage={page} onNavigate={navigate} />
      <main>
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
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
