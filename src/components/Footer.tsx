export default function Footer() {
  return (
    <footer className="border-t py-12 text-center relative z-10 reveal" style={{ borderColor: 'rgba(120,120,255,0.12)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="text-2xl font-extrabold tracking-tight mb-3"
          style={{ background: 'linear-gradient(135deg, #6c63ff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          ProfileCraft
        </div>
        <p className="text-sm mb-6" style={{ color: '#7878aa' }}>
          The most advanced GitHub Profile README Generator. Free, open source, and built with love.
        </p>
        <div className="flex gap-6 justify-center mb-8">
          {['GitHub', 'Twitter', 'Discord', 'Changelog', 'Privacy'].map(link => (
            <a key={link} href="#" className="text-sm transition-colors duration-200 hover:text-cyan-400" style={{ color: '#7878aa' }}>
              {link}
            </a>
          ))}
        </div>
        <p className="text-xs" style={{ color: '#7878aa', fontFamily: 'monospace' }}>
          crafted with ✦ by ProfileCraft • MIT License
        </p>
      </div>
    </footer>
  );
}
