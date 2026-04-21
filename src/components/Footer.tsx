import { motion } from 'framer-motion';

export default function Footer() {
  const links = ['GitHub', 'Twitter', 'Discord', 'Changelog', 'Privacy'];

  return (
    <footer className="relative z-10 reveal" style={{ borderTop: '1px solid var(--border-primary)' }}>
      {/* Animated gradient divider */}
      <div className="gradient-divider" />

      <div className="max-w-7xl mx-auto px-6 py-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="animate-float-slow"
        >
          <div
            className="text-2xl font-extrabold tracking-tight mb-3 gradient-text-static inline-block"
          >
            GitGloss
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-sm mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          The most advanced GitHub Profile README Generator. Free, open source, and built with love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex gap-6 justify-center mb-8 flex-wrap"
        >
          {links.map(link => (
            <a
              key={link}
              href="#"
              className="text-sm link-hover transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link}
            </a>
          ))}
        </motion.div>

        <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          crafted with ✦ by GitGloss • MIT License
        </p>
      </div>
    </footer>
  );
}
