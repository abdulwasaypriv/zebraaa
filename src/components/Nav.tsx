import { Page } from '../types';

interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Nav({ currentPage, onNavigate }: NavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 animate-fade-in" style={{ backdropFilter: 'blur(24px)', background: 'rgba(5,5,8,0.8)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="text-xl font-extrabold tracking-tight"
            style={{ background: 'linear-gradient(135deg, #6c63ff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Profile<span style={{ WebkitTextFillColor: '#ff6b9d' }}>Craft</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {(['home', 'builder', 'features', 'tools'] as Page[]).map(page => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className="text-sm font-medium capitalize transition-colors duration-200"
                style={{ color: currentPage === page ? '#00e5ff' : '#7878aa' }}
              >
                {page === 'tools' ? 'Tools & FAQ' : page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('builder')}
            className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(108,99,255,0.4)',
            }}
          >
            Create Profile →
          </button>
        </div>
      </div>
    </nav>
  );
}
