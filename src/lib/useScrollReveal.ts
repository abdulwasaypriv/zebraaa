import { useEffect } from 'react';

export function useScrollReveal(selector = '.reveal') {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(selector);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 80); // stagger each visible element by 80ms
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}
