'use client';

import { useEffect, useRef } from 'react';

export default function FooterField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // a calm, evenly spaced field of dots — quiet circuit-board texture, not a busy starfield
    const cols = 34, rows = 9;
    const positions: number[] = [];
    const seeds: number[] = [];
    const sizes: number[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const jx = (Math.random() - 0.5) * 0.55;
        const jy = (Math.random() - 0.5) * 0.55;
        const tx = (c + 0.5 + jx) / cols;
        const ty = (r + 0.5 + jy) / rows;
        positions.push(tx, ty);
        seeds.push((r * cols + c) * 0.31 + Math.random() * 0.6);
        sizes.push(1.6 + Math.random() * 2.2);
      }
    }
    const vertexCount = positions.length / 2;

    const makeBuffer = (data: number[]) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
      return buf;
    };
    const posBuf = makeBuffer(positions);
    const seedBuf = makeBuffer(seeds);
    const sizeBuf = makeBuffer(sizes);

    const vsSource = `
      attribute vec2 aPos;
      attribute float aSeed;
      attribute float aSize;
      uniform float uTime;
      uniform float uDpr;
      varying float vAlpha;
      void main () {
        float driftY = aPos.y - uTime * 0.006 * (0.4 + fract(aSeed * 0.37));
        float y = fract(driftY + 1.0);
        float x = aPos.x + sin(uTime * 0.12 + aSeed) * 0.006;
        gl_Position = vec4(x * 2.0 - 1.0, 1.0 - y * 2.0, 0.0, 1.0);
        gl_PointSize = aSize * uDpr;
        vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 0.5 + aSeed * 2.1));
      }
    `;
    const fsSource = `
      precision mediump float;
      varying float vAlpha;
      uniform vec3 uColor;
      void main () {
        vec2 d = gl_PointCoord - vec2(0.5);
        float dist = length(d);
        if (dist > 0.5) discard;
        float edge = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(uColor, vAlpha * edge * 0.42);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const bindAttr = (buffer: WebGLBuffer | null, name: string, size: number) => {
      const loc = gl.getAttribLocation(program, name);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    bindAttr(posBuf, 'aPos', 2);
    bindAttr(seedBuf, 'aSeed', 1);
    bindAttr(sizeBuf, 'aSize', 1);

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uDpr = gl.getUniformLocation(program, 'uDpr');
    const uColor = gl.getUniformLocation(program, 'uColor');
    gl.uniform3f(uColor, 0.227, 0.333, 0.91); // --color-accent-bright

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let raf = 0;
    let stopped = false;
    const t0 = performance.now();
    let dpr = 1;

    function resize() {
      const r = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w; canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    function frame() {
      if (stopped) return;
      resize();
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      const time = reduceMotion ? 0 : (performance.now() - t0) / 1000;
      gl!.uniform1f(uTime, time);
      gl!.uniform1f(uDpr, dpr);
      gl!.drawArrays(gl!.POINTS, 0, vertexCount);
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }
    if (reduceMotion) frame(); else raf = requestAnimationFrame(frame);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
