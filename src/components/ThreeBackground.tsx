import { useEffect, useRef } from 'react';

// ─── Exact antigravity.google particle style ─────────────────────────────────
// White bg via CSS, tiny blue (#3279F9) rectangular dashes scattered across
// the full page, slowly drifting, scatter away from mouse cursor.

interface Particle {
  x: number;     // position (logical pixels)
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  w: number;     // rect width
  h: number;     // rect height
  angle: number; // fixed rotation (radians)
  alpha: number;
}

const BLUE = '#3279F9'; // exact antigravity.google blue

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makeParticle(W: number, H: number): Particle {
  // Mix of portrait and landscape tiny rects, like in the screenshot
  const portrait = Math.random() > 0.4;
  const w = portrait ? rand(2, 4)  : rand(5, 10);
  const h = portrait ? rand(6, 12) : rand(2, 4);
  const angle = rand(-0.5, 0.5);
  const baseVx = rand(-0.08, 0.08);
  const baseVy = rand(-0.18, -0.04); // mostly upward, slow
  return {
    x: rand(0, W),
    y: rand(0, H),
    vx: baseVx,
    vy: baseVy,
    baseVx,
    baseVy,
    w,
    h,
    angle,
    alpha: rand(0.35, 0.75),
  };
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    // ── Spawn ~280 particles spread across the full viewport ─────────────
    const COUNT = 280;
    const particles: Particle[] = Array.from({ length: COUNT }, () =>
      makeParticle(W(), H())
    );

    // ── Animate ───────────────────────────────────────────────────────────
    function animate() {
      animId = requestAnimationFrame(animate);

      const w = W();
      const h = H();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Transparent clear — white bg comes from CSS on body
      ctx!.clearRect(0, 0, w, h);

      ctx!.fillStyle = BLUE;

      for (const p of particles) {
        // ── Mouse repulsion ──────────────────────────────────────────────
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const REPEL = 100;

        if (dist < REPEL && dist > 0.5) {
          const strength = ((REPEL - dist) / REPEL) * 2.5;
          p.vx += (dx / dist) * strength * 0.12;
          p.vy += (dy / dist) * strength * 0.12;
        }

        // Ease velocity back to base drift
        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy - p.vy) * 0.04;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.y < -20)       { p.y = h + 10; p.x = rand(0, w); }
        if (p.y > h + 20)    { p.y = -10;    p.x = rand(0, w); }
        if (p.x < -20)       { p.x = w + 10; }
        if (p.x > w + 20)    { p.x = -10; }

        // Draw
        ctx!.save();
        ctx!.globalAlpha = p.alpha;
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.angle);
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx!.restore();
      }

      ctx!.globalAlpha = 1;
    }

    animate();

    // Mouse tracking
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
