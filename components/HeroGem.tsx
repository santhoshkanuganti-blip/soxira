'use client';

import { useEffect, useRef, useState } from 'react';

type ShapeName = 'gem' | 'blocks' | 'ring' | 'water';

const SHAPES: { name: ShapeName; label: string; detail: string }[] = [
  { name: 'blocks', label: 'Snowflake · Data Warehouse', detail: 'Unified, analytics-ready warehouse architecture' },
  { name: 'ring', label: 'DBT · Governed Pipelines', detail: 'Tested, version-controlled ETL/ELT models' },
  { name: 'water', label: 'AI Dashboards · Real-Time Analytics', detail: 'Executive scorecards with live anomaly detection' },
  { name: 'gem', label: 'VitaranAI · Live Platform', detail: 'Order processing: 4hrs → 15min' },
];

const CYCLE_MS = 4800;

export default function HeroGem({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapeIdx, setShapeIdx] = useState(0);
  const shapeIdxRef = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      shapeIdxRef.current = (shapeIdxRef.current + 1) % SHAPES.length;
      setShapeIdx(shapeIdxRef.current);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- shared helpers ----
    const sub = (p: number[], q: number[]) => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
    const cross = (p: number[], q: number[]) => [
      p[1] * q[2] - p[2] * q[1],
      p[2] * q[0] - p[0] * q[2],
      p[0] * q[1] - p[1] * q[0],
    ];
    const norm = (v: number[]) => {
      const l = Math.hypot(v[0], v[1], v[2]) || 1;
      return [v[0] / l, v[1] / l, v[2] / l];
    };
    const lerp3 = (p: number[], q: number[], t: number) => [
      p[0] + (q[0] - p[0]) * t,
      p[1] + (q[1] - p[1]) * t,
      p[2] + (q[2] - p[2]) * t,
    ];
    const hash = (i: number) => {
      const s = Math.sin(i * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    };
    const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

    const colorTop = [0.34, 0.46, 0.98];
    const colorBottom = [0.06, 0.1, 0.3];
    const colorMid = lerp3(colorBottom, colorTop, 0.55);

    let positions: number[] = [];
    let normals: number[] = [];
    let colors: number[] = [];
    let faceCounter = 0;

    function resetGeom() { positions = []; normals = []; colors = []; faceCounter = 0; }
    function addFace(p0: number[], p1: number[], p2: number[]) {
      const n = norm(cross(sub(p1, p0), sub(p2, p0)));
      const jitter = (hash(faceCounter++) - 0.5) * 0.5;
      const c = [clamp01(colorMid[0] + jitter), clamp01(colorMid[1] + jitter * 0.9), clamp01(colorMid[2] + jitter * 0.6)];
      [p0, p1, p2].forEach((p) => {
        positions.push(p[0], p[1], p[2]);
        normals.push(n[0], n[1], n[2]);
        colors.push(c[0], c[1], c[2]);
      });
    }

    // ---- gem (icosahedron) ----
    const PHI = (1 + Math.sqrt(5)) / 2;
    const gemVerts = [
      [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
      [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
      [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
    ].map((v) => { const n = norm(v); return [n[0] * 1.15, n[1] * 1.15, n[2] * 1.15]; });
    const gemFaces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
    ];
    function buildGem() {
      resetGeom();
      gemFaces.forEach((tri) => addFace(gemVerts[tri[0]], gemVerts[tri[1]], gemVerts[tri[2]]));
    }

    // ---- blocks (cube cluster) ----
    const blockDefs = [
      { c: [-0.55, 0.35, 0.15], s: 0.62 }, { c: [0.5, 0.5, -0.25], s: 0.5 },
      { c: [0.15, -0.15, 0.5], s: 0.58 }, { c: [-0.35, -0.55, -0.2], s: 0.46 },
      { c: [0.55, -0.35, 0.35], s: 0.4 }, { c: [-0.15, 0.65, -0.45], s: 0.36 },
    ];
    function cubeTris(c: number[], size: number) {
      const s = size / 2;
      const x0 = c[0] - s, x1 = c[0] + s, y0 = c[1] - s, y1 = c[1] + s, z0 = c[2] - s, z1 = c[2] + s;
      const a = [x0, y0, z1], b = [x1, y0, z1], g2 = [x1, y1, z1], d = [x0, y1, z1];
      const e = [x0, y0, z0], f = [x1, y0, z0], g = [x1, y1, z0], h = [x0, y1, z0];
      return [
        [a, b, g2], [a, g2, d], [f, e, h], [f, h, g],
        [b, f, g], [b, g, g2], [e, a, d], [e, d, h],
        [d, g2, g], [d, g, h], [e, f, b], [e, b, a],
      ];
    }
    function buildBlocks() {
      resetGeom();
      blockDefs.forEach((bl) => cubeTris(bl.c, bl.s).forEach((t) => addFace(t[0], t[1], t[2])));
    }

    // ---- ring (low-poly torus) ----
    function buildTorus() {
      resetGeom();
      const majorSeg = 12, minorSeg = 7, R = 0.85, r = 0.42;
      const ring: number[][][] = [];
      for (let i = 0; i < majorSeg; i++) {
        const u = (i / majorSeg) * Math.PI * 2, row: number[][] = [];
        for (let j = 0; j < minorSeg; j++) {
          const v = (j / minorSeg) * Math.PI * 2;
          row.push([(R + r * Math.cos(v)) * Math.cos(u), r * Math.sin(v), (R + r * Math.cos(v)) * Math.sin(u)]);
        }
        ring.push(row);
      }
      for (let i = 0; i < majorSeg; i++) {
        const ni = (i + 1) % majorSeg;
        for (let j = 0; j < minorSeg; j++) {
          const nj = (j + 1) % minorSeg;
          const p0 = ring[i][j], p1 = ring[ni][j], p2 = ring[ni][nj], p3 = ring[i][nj];
          addFace(p0, p1, p2);
          addFace(p0, p2, p3);
        }
      }
    }

    // ---- water (animated wave grid, rebuilt every frame it's active) ----
    const WATER_SIZE = 1.15, WATER_SEG = 20;
    function addWaterFace(p0: number[], p1: number[], p2: number[]) {
      const n = norm(cross(sub(p1, p0), sub(p2, p0)));
      const avgH = (p0[1] + p1[1] + p2[1]) / 3;
      const t = clamp01((avgH + 0.32) / 0.64);
      let c = lerp3(colorBottom, colorTop, t);
      const foam = clamp01((t - 0.8) / 0.2);
      c = lerp3(c, [0.85, 0.9, 1.0], foam * 0.65);
      [p0, p1, p2].forEach((p) => {
        positions.push(p[0], p[1], p[2]);
        normals.push(n[0], n[1], n[2]);
        colors.push(c[0], c[1], c[2]);
      });
    }
    function waterHeight(x: number, z: number, t: number) {
      return 0.16 * Math.sin(x * 2.6 + t * 1.3)
        + 0.13 * Math.sin(z * 2.1 - t * 1.05 + 1.4)
        + 0.08 * Math.sin((x + z) * 1.7 + t * 0.8)
        + 0.05 * Math.sin((x - z) * 3.2 - t * 1.6);
    }
    function buildWaterFrame(t: number) {
      resetGeom();
      const grid: number[][][] = [];
      for (let i = 0; i <= WATER_SEG; i++) {
        const x = -WATER_SIZE + (i / WATER_SEG) * WATER_SIZE * 2, row: number[][] = [];
        for (let j = 0; j <= WATER_SEG; j++) {
          const z = -WATER_SIZE + (j / WATER_SEG) * WATER_SIZE * 2;
          row.push([x, waterHeight(x, z, t), z]);
        }
        grid.push(row);
      }
      for (let i = 0; i < WATER_SEG; i++) {
        for (let j = 0; j < WATER_SEG; j++) {
          const p0 = grid[i][j], p1 = grid[i + 1][j], p2 = grid[i + 1][j + 1], p3 = grid[i][j + 1];
          addWaterFace(p0, p1, p2);
          addWaterFace(p0, p2, p3);
        }
      }
    }

    const BUILDERS: Record<ShapeName, () => void> = { gem: buildGem, blocks: buildBlocks, ring: buildTorus, water: () => buildWaterFrame(0) };

    buildGem();
    let vertexCount = positions.length / 3;

    const positionBuffer = gl.createBuffer();
    const normalBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    function uploadGeometry() {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array(positions), gl!.DYNAMIC_DRAW);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, normalBuffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array(normals), gl!.DYNAMIC_DRAW);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, colorBuffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array(colors), gl!.DYNAMIC_DRAW);
      vertexCount = positions.length / 3;
    }
    uploadGeometry();

    const vsSource = `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      attribute vec3 aColor;
      uniform mat4 uMVP;
      uniform mat3 uNormalMatrix;
      varying vec3 vColor;
      void main () {
        vec3 n = normalize(uNormalMatrix * aNormal);
        float light = 0.16 + 0.95 * max(dot(n, normalize(vec3(0.4, 0.85, 0.5))), 0.0);
        vColor = aColor * light;
        gl_Position = uMVP * vec4(aPosition, 1.0);
      }
    `;
    const fsSource = `
      precision mediump float;
      varying vec3 vColor;
      void main () { gl_FragColor = vec4(vColor, 1.0); }
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

    const bindAttr = (buffer: WebGLBuffer | null, name: string) => {
      const loc = gl.getAttribLocation(program, name);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    };
    bindAttr(positionBuffer, 'aPosition');
    bindAttr(normalBuffer, 'aNormal');
    bindAttr(colorBuffer, 'aColor');

    const uMVP = gl.getUniformLocation(program, 'uMVP');
    const uNormalMatrix = gl.getUniformLocation(program, 'uNormalMatrix');

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    const perspective = (fovy: number, aspect: number, near: number, far: number) => {
      const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
      return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
    };
    const multiply = (m: Float32Array, n: Float32Array) => {
      const out = new Float32Array(16);
      for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) sum += m[k * 4 + r] * n[c * 4 + k];
        out[c * 4 + r] = sum;
      }
      return out;
    };
    const rotY = (a: number) => { const c = Math.cos(a), s = Math.sin(a); return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]); };
    const rotX = (a: number) => { const c = Math.cos(a), s = Math.sin(a); return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]); };
    const rotZ = (a: number) => { const c = Math.cos(a), s = Math.sin(a); return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]); };
    const translate = (x: number, y: number, z: number) => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
    const normalMat3 = (m: Float32Array) => new Float32Array([m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10]]);

    let spin = 0, tilt = 0.35, targetTilt = 0.35;
    const t0 = performance.now();
    let lastBuiltIndex = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      targetTilt = 0.12 + ((e.clientY - r.top) / r.height) * 0.55;
    };
    const handlePointerLeave = () => { targetTilt = 0.35; };
    const wrap = canvas.parentElement;
    wrap?.addEventListener('pointermove', handlePointerMove);
    wrap?.addEventListener('pointerleave', handlePointerLeave);

    let raf = 0;
    let stopped = false;

    function resize() {
      const r = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);

      const time = (performance.now() - t0) / 1000;
      const activeShape = SHAPES[shapeIdxRef.current].name;

      if (activeShape === 'water') {
        buildWaterFrame(reduceMotion ? 0 : time);
        uploadGeometry();
      } else if (shapeIdxRef.current !== lastBuiltIndex) {
        BUILDERS[activeShape]();
        uploadGeometry();
        lastBuiltIndex = shapeIdxRef.current;
      }

      tilt += (targetTilt - tilt) * 0.06;

      let model: Float32Array;
      if (activeShape === 'water') {
        model = rotX(0.9 + (tilt - 0.35) * 0.35);
      } else {
        if (!reduceMotion) spin += 0.006;
        const wobbleZ = reduceMotion ? 0 : Math.sin(time * 0.5) * 0.24;
        const wobbleX = reduceMotion ? 0 : Math.sin(time * 0.33 + 1.1) * 0.14;
        model = multiply(rotX(tilt + wobbleX), multiply(rotZ(wobbleZ), rotY(spin)));
      }
      const view = translate(0, 0, -3.4);
      const mvp = multiply(perspective(Math.PI / 4, canvas!.width / canvas!.height, 0.1, 20), multiply(view, model));

      gl!.uniformMatrix4fv(uMVP, false, mvp);
      gl!.uniformMatrix3fv(uNormalMatrix, false, normalMat3(model));
      gl!.drawArrays(gl!.TRIANGLES, 0, vertexCount);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      wrap?.removeEventListener('pointermove', handlePointerMove);
      wrap?.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  const active = SHAPES[shapeIdx];

  return (
    <div className={`relative h-full w-full ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <div key={active.name} className="animate-[fadeIn_0.4s_ease]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">{active.label}</p>
          <p className="mt-0.5 font-display text-sm font-semibold text-white">{active.detail}</p>
        </div>
        <div className="flex gap-1.5 pb-1">
          {SHAPES.map((s, i) => (
            <span key={s.name} className={`h-1.5 rounded-full transition-all ${i === shapeIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/30'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
