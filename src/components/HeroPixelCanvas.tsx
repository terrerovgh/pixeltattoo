import { useEffect, useRef, useState } from 'react';
import { HERO_CYCLE_ITEMS } from '../data/tattooData';

const BOLD_GLYPHS: Record<string, string[]> = {
  ' ': ['...', '...', '...', '...', '...', '...', '...', '...', '...'],
  A: ['..###..', '.#####.', '##...##', '##...##', '#######', '#######', '##...##', '##...##', '##...##'],
  E: ['#######', '#######', '##.....', '######.', '######.', '##.....', '##.....', '#######', '#######'],
  I: ['.#####.', '.#####.', '..###..', '..###..', '..###..', '..###..', '..###..', '.#####.', '.#####.'],
  K: ['##...##', '##..##.', '##.##..', '####...', '####...', '##.##..', '##..##.', '##...##', '##...##'],
  L: ['##.....', '##.....', '##.....', '##.....', '##.....', '##.....', '##.....', '#######', '#######'],
  O: ['.#####.', '#######', '##...##', '##...##', '##...##', '##...##', '##...##', '#######', '.#####.'],
  P: ['######.', '#######', '##...##', '#######', '######.', '##.....', '##.....', '##.....', '##.....'],
  T: ['#######', '#######', '..###..', '..###..', '..###..', '..###..', '..###..', '..###..', '..###..'],
  X: ['##...##', '##...##', '.##.##.', '..###..', '..###..', '..###..', '.##.##.', '##...##', '##...##'],
};

interface Particle {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  delay: number;
  color: string;
  sparkle: boolean;
}

const ACCENT_GOLD = '#F7C600';
const SPARKLE_COLORS = ['#FFFFFF', '#D4D4D8', '#71717A', ACCENT_GOLD];

function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function easeAssemble(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(1 - t, 3);
}

function easeMorph(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function buildHeroTarget() {
  const lines = ['PIXEL', 'TATTOO'];
  const gapRows = 2;
  const totalCols = 49;
  const totalRows = 20;
  const cells: { x: number; y: number }[] = [];

  lines.forEach((word, lIdx) => {
    let lineWidth = 0;
    for (let i = 0; i < word.length; i++) {
      const g = BOLD_GLYPHS[word[i]] || BOLD_GLYPHS[' '];
      lineWidth += g[0].length + (i < word.length - 1 ? 1 : 0);
    }
    let colOffset = Math.floor((totalCols - lineWidth) / 2);
    const rowOffset = lIdx * (9 + gapRows);

    for (let i = 0; i < word.length; i++) {
      const g = BOLD_GLYPHS[word[i]] || BOLD_GLYPHS[' '];
      const w = g[0].length;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < w; c++) {
          if (g[r][c] === '#') {
            cells.push({ x: colOffset + c, y: rowOffset + r });
          }
        }
      }
      colOffset += w + (i < word.length - 1 ? 1 : 0);
    }
  });

  return { totalCols, totalRows, cells };
}

const HERO_TARGET = buildHeroTarget();

export function HeroPixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cycleIdx, setCycleIdx] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let morphStart = performance.now();
    let morphDuration = 1100;
    let isAssembling = true;
    let pointerX = -9999;
    let pointerY = -9999;
    let rafId = 0;
    let cycleTimer = 0;
    let currentIdx = 0;

    function getMetrics() {
      const cellW = Math.min(cssW / HERO_TARGET.totalCols, (cssH * 1.25) / HERO_TARGET.totalRows);
      const cellH = cellW / 1.25;
      const offsetX = (cssW - HERO_TARGET.totalCols * cellW) * 0.5;
      const offsetY = (cssH - HERO_TARGET.totalRows * cellH) * 0.5;
      return { cellW, cellH, offsetX, offsetY };
    }

    function sizeCanvas() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      if (cssW <= 0 || cssH <= 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function buildParticles(idx: number, assembleFromRandom: boolean) {
      const rng = makeRng(idx * 9973 + (Date.now() % 100000));
      const next: Particle[] = [];
      for (let i = 0; i < HERO_TARGET.cells.length; i++) {
        const tc = HERO_TARGET.cells[i];
        const isSparkle = rng() < (assembleFromRandom ? 0.22 : 0.28);
        next.push({
          sx: assembleFromRandom ? rng() * HERO_TARGET.totalCols : tc.x + (rng() - 0.5) * 14,
          sy: assembleFromRandom ? rng() * HERO_TARGET.totalRows : tc.y + (rng() - 0.5) * 8,
          tx: tc.x,
          ty: tc.y,
          x: tc.x,
          y: tc.y,
          vx: 0,
          vy: 0,
          delay: assembleFromRandom
            ? rng() * 380
            : (tc.x / HERO_TARGET.totalCols) * 280,
          color: isSparkle
            ? SPARKLE_COLORS[Math.floor(rng() * SPARKLE_COLORS.length)]
            : ACCENT_GOLD,
          sparkle: isSparkle,
        });
      }
      particles = next;
      isAssembling = assembleFromRandom;
      morphDuration = assembleFromRandom ? 1100 : 780;
      morphStart = performance.now();
    }

    function drawStatic() {
      sizeCanvas();
      if (!ctx || cssW <= 0) return;
      const { cellW, cellH, offsetX, offsetY } = getMetrics();
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = ACCENT_GOLD;
      for (let i = 0; i < HERO_TARGET.cells.length; i++) {
        const c = HERO_TARGET.cells[i];
        const x0 = Math.round((offsetX + c.x * cellW) * dpr) / dpr;
        const y0 = Math.round((offsetY + c.y * cellH) * dpr) / dpr;
        const x1 = Math.round((offsetX + (c.x + 1) * cellW) * dpr) / dpr;
        const y1 = Math.round((offsetY + (c.y + 1) * cellH) * dpr) / dpr;
        ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      }
    }

    function renderFrame(now: number) {
      if (!ctx) return;
      if (cssW <= 0) sizeCanvas();
      if (cssW <= 0) {
        rafId = requestAnimationFrame(renderFrame);
        return;
      }

      const { cellW, cellH, offsetX, offsetY } = getMetrics();
      const elapsed = now - morphStart;
      const easeFn = isAssembling ? easeAssemble : easeMorph;
      const repelRadius = cellW * 3.5;
      const maxDisp = 1.6;

      ctx.clearRect(0, 0, cssW, cssH);

      const buckets = new Map<string, Particle[]>();
      buckets.set(ACCENT_GOLD, []);
      let allSettled = pointerX < -5000;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const localT = Math.min(1, Math.max(0, (elapsed - p.delay) / morphDuration));
        const e = easeFn(localT);
        const baseX = p.sx + (p.tx - p.sx) * e;
        const baseY = p.sy + (p.ty - p.sy) * e;

        let targetDx = 0;
        let targetDy = 0;
        if (pointerX > -5000) {
          const px = offsetX + (baseX + 0.5) * cellW;
          const py = offsetY + (baseY + 0.5) * cellH;
          const dx = px - pointerX;
          const dy = py - pointerY;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.001 && dist < repelRadius) {
            const push = (1 - dist / repelRadius) * maxDisp;
            targetDx = (dx / dist) * push;
            targetDy = (dy / dist) * push;
          }
        }

        if (localT >= 1 && pointerX < -5000 && Math.abs(p.vx) < 0.002 && Math.abs(p.vy) < 0.002) {
          p.vx = 0;
          p.vy = 0;
          p.x = p.tx;
          p.y = p.ty;
        } else {
          allSettled = false;
          p.vx = (p.vx + (targetDx - (p.x - baseX)) * 0.12) * 0.8;
          p.vy = (p.vy + (targetDy - (p.y - baseY)) * 0.12) * 0.8;
          p.x = baseX + (p.x - baseX) + p.vx;
          p.y = baseY + (p.y - baseY) + p.vy;
        }

        const col = p.sparkle && elapsed < 540 ? p.color : ACCENT_GOLD;
        const list = buckets.get(col) || [];
        list.push(p);
        buckets.set(col, list);
      }

      if (allSettled && elapsed >= 540) {
        ctx.fillStyle = ACCENT_GOLD;
        const rowMap = new Map<number, number[]>();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const row = rowMap.get(p.ty) || [];
          row.push(p.tx);
          rowMap.set(p.ty, row);
        }
        rowMap.forEach((xs, y) => {
          xs.sort((a, b) => a - b);
          let start = xs[0];
          let prev = xs[0];
          const y0 = Math.round((offsetY + y * cellH) * dpr) / dpr;
          const y1 = Math.round((offsetY + (y + 1) * cellH) * dpr) / dpr;
          for (let k = 1; k <= xs.length; k++) {
            if (k < xs.length && (xs[k] === prev + 1 || xs[k] === prev)) {
              prev = xs[k];
            } else {
              const x0 = Math.round((offsetX + start * cellW) * dpr) / dpr;
              const x1 = Math.round((offsetX + (prev + 1) * cellW) * dpr) / dpr;
              ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
              if (k < xs.length) {
                start = xs[k];
                prev = xs[k];
              }
            }
          }
        });
      } else {
        buckets.forEach((list, col) => {
          ctx.fillStyle = col;
          for (let i = 0; i < list.length; i++) {
            const p = list[i];
            const x0 = Math.round((offsetX + p.x * cellW) * dpr) / dpr;
            const y0 = Math.round((offsetY + p.y * cellH) * dpr) / dpr;
            const x1 = Math.round((offsetX + (p.x + 1) * cellW) * dpr) / dpr;
            const y1 = Math.round((offsetY + (p.y + 1) * cellH) * dpr) / dpr;
            ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
          }
        });
      }

      rafId = requestAnimationFrame(renderFrame);
    }

    function triggerCycle() {
      currentIdx = (currentIdx + 1) % HERO_CYCLE_ITEMS.length;
      setCycleIdx(currentIdx);
      buildParticles(currentIdx, false);
    }

    function scheduleCycle() {
      window.clearTimeout(cycleTimer);
      cycleTimer = window.setTimeout(() => {
        if (!document.hidden) triggerCycle();
        scheduleCycle();
      }, 4600);
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    const handleClick = () => {
      if (prefersReduced) {
        currentIdx = (currentIdx + 1) % HERO_CYCLE_ITEMS.length;
        setCycleIdx(currentIdx);
        return;
      }
      triggerCycle();
      scheduleCycle();
    };

    const ro = new ResizeObserver(() => {
      sizeCanvas();
      if (prefersReduced) drawStatic();
    });
    ro.observe(canvas);

    sizeCanvas();

    if (prefersReduced) {
      drawStatic();
    } else {
      buildParticles(0, true);
      rafId = requestAnimationFrame(renderFrame);
      scheduleCycle();
      canvas.addEventListener('pointermove', handlePointerMove);
      canvas.addEventListener('pointerleave', handlePointerLeave);
    }
    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(cycleTimer);
      ro.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  const currentItem = HERO_CYCLE_ITEMS[cycleIdx];

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        aria-label="PIXEL TATTOO — animación interactiva de píxeles"
        className="block w-full aspect-[49/16] max-h-[38svh] sm:max-h-[42svh] cursor-pointer select-none"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/90 pt-3">
        <p className="text-xs sm:text-sm text-zinc-300 font-medium">
          {currentItem.caption}
        </p>
        <p className="font-mono text-[11px] sm:text-xs tabular-nums text-[#F7C600] tracking-wide">
          {currentItem.tag}
        </p>
      </div>
    </div>
  );
}
