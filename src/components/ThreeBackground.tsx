import { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    let animId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    // ── Shaders ──────────────────────────────────────────────────────────────
    const vsSource = `
      attribute vec2 a_pos;
      attribute vec3 a_col;
      attribute float a_size;
      varying vec3 v_col;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
        gl_PointSize = a_size;
        v_col = a_col;
      }
    `;
    const fsSource = `
      precision mediump float;
      varying vec3 v_col;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = 0.7 * (1.0 - d * 2.0);
        gl_FragColor = vec4(v_col * alpha, alpha);
      }
    `;

    function compileShader(type: number, src: string): WebGLShader {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const posLoc  = gl.getAttribLocation(prog, 'a_pos');
    const colLoc  = gl.getAttribLocation(prog, 'a_col');
    const sizeLoc = gl.getAttribLocation(prog, 'a_size');

    // ── Particles ─────────────────────────────────────────────────────────────
    const COUNT = 1400;
    const pos = new Float32Array(COUNT * 2);
    const col = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const vel = new Float32Array(COUNT * 2);
    const baseVel = new Float32Array(COUNT * 2);

    const palette: [number, number, number][] = [
      [0.42, 0.39, 1.00],  // violet
      [0.00, 0.90, 1.00],  // cyan
      [1.00, 0.42, 0.62],  // pink
      [0.53, 0.33, 1.00],  // purple
      [0.00, 0.74, 0.90],  // teal
      [0.30, 0.60, 1.00],  // blue
    ];

    for (let i = 0; i < COUNT; i++) {
      pos[i * 2]     = (Math.random() - 0.5) * 2;
      pos[i * 2 + 1] = (Math.random() - 0.5) * 2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
      sizes[i]       = Math.random() * 3.0 + 0.5;
      const speed    = (Math.random() * 0.00025 + 0.00008);
      const angle    = Math.random() * Math.PI * 2;
      baseVel[i * 2]     = Math.cos(angle) * speed;
      baseVel[i * 2 + 1] = Math.sin(angle) * speed;
      vel[i * 2]     = baseVel[i * 2];
      vel[i * 2 + 1] = baseVel[i * 2 + 1];
    }

    // ── Buffers ───────────────────────────────────────────────────────────────
    const posBuf  = gl.createBuffer()!;
    const colBuf  = gl.createBuffer()!;
    const sizeBuf = gl.createBuffer()!;

    // Upload static color + size buffers once
    gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
    gl.bufferData(gl.ARRAY_BUFFER, col, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

    // Upload initial position
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);

    // ── Blend ─────────────────────────────────────────────────────────────────
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    // ── Animate ───────────────────────────────────────────────────────────────
    let t = 0;
    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.005;

      // Mouse repulsion
      const mx = mouseX;
      const my = mouseY;

      for (let i = 0; i < COUNT; i++) {
        const px = pos[i * 2];
        const py = pos[i * 2 + 1];
        const dx = px - mx;
        const dy = py - my;
        const dist2 = dx * dx + dy * dy;
        const repulseRadius = 0.18;

        if (dist2 < repulseRadius * repulseRadius && dist2 > 0.00001) {
          const dist = Math.sqrt(dist2);
          const force = (repulseRadius - dist) / repulseRadius * 0.0008;
          vel[i * 2]     += (dx / dist) * force;
          vel[i * 2 + 1] += (dy / dist) * force;
        }

        // Drift back toward base velocity
        vel[i * 2]     += (baseVel[i * 2]     - vel[i * 2])     * 0.02;
        vel[i * 2 + 1] += (baseVel[i * 2 + 1] - vel[i * 2 + 1]) * 0.02;

        pos[i * 2]     += vel[i * 2];
        pos[i * 2 + 1] += vel[i * 2 + 1];

        // Wrap around edges
        if (pos[i * 2]     >  1.05) pos[i * 2]     = -1.05;
        if (pos[i * 2]     < -1.05) pos[i * 2]     =  1.05;
        if (pos[i * 2 + 1] >  1.05) pos[i * 2 + 1] = -1.05;
        if (pos[i * 2 + 1] < -1.05) pos[i * 2 + 1] =  1.05;
      }

      gl!.clear(gl!.COLOR_BUFFER_BIT);

      // Bind position (dynamic)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuf);
      gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, pos);
      gl!.enableVertexAttribArray(posLoc);
      gl!.vertexAttribPointer(posLoc, 2, gl!.FLOAT, false, 0, 0);

      // Bind color (static)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, colBuf);
      gl!.enableVertexAttribArray(colLoc);
      gl!.vertexAttribPointer(colLoc, 3, gl!.FLOAT, false, 0, 0);

      // Bind size (static)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, sizeBuf);
      gl!.enableVertexAttribArray(sizeLoc);
      gl!.vertexAttribPointer(sizeLoc, 1, gl!.FLOAT, false, 0, 0);

      gl!.drawArrays(gl!.POINTS, 0, COUNT);
    }
    animate();

    // ── Events ────────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      // Convert screen coords to WebGL NDC (-1..1)
      mouseX =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
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
