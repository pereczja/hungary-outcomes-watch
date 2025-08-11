import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// Helper to resolve CSS variables (HSL tokens) into canvas-friendly colors
function useCssHsl(varName: string, fallback: string) {
  const [value, setValue] = useState<string>(fallback);

  useEffect(() => {
    const update = () => {
      try {
        const root = document.documentElement;
        const raw = getComputedStyle(root).getPropertyValue(varName).trim();
        if (raw) setValue(`hsl(${raw})`);
      } catch (_) {
        setValue(fallback);
      }
    };
    update();

    // React to theme changes (if any)
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    return () => mo.disconnect();
  }, [varName, fallback]);

  return value;
}

// Types
interface Bullet {
  x: number;
  y: number;
  w: number;
  h: number;
  vy: number;
  active: boolean;
}

interface Invader {
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const CANVAS_MAX_WIDTH = 520;
const DPR = typeof window !== "undefined" ? Math.min(devicePixelRatio || 1, 2) : 1;

const SpaceInvadersGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const bg = useCssHsl("--background", "#0b1020");
  const playerColor = useCssHsl("--primary", "#2d6df6");
  const invaderColor = useCssHsl("--secondary", "#16a34a");
  const bulletColor = useCssHsl("--accent", "#e11d48");
  const gridLine = useCssHsl("--muted", "#334155");
  const textColor = useCssHsl("--foreground", "#e5e7eb");

  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState<number>(() => {
    const v = localStorage.getItem("bh_space_invaders_high");
    return v ? Number(v) : 0;
  });

  // Player
  const playerX = useRef(0);
  const playerW = useRef(42);
  const playerSpeed = useRef(6);

  // World
  const widthRef = useRef(320);
  const heightRef = useRef(420);

  // Entities
  const bulletsRef = useRef<Bullet[]>([]);
  const invadersRef = useRef<Invader[]>([]);
  const dirRef = useRef<1 | -1>(1);
  const stepDownRef = useRef(0);
  const waveRef = useRef(1);
  const lastShootAtRef = useRef(0);

  const initInvaders = useCallback(() => {
    const cols = 8;
    const rows = 4;
    const margin = 24;
    const gapX = 16;
    const gapY = 18;
    const invW = 26;
    const invH = 18;

    const totalW = cols * invW + (cols - 1) * gapX;
    const startX = Math.max(margin, (widthRef.current - totalW) / 2);
    const startY = 60;

    const list: Invader[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push({
          x: startX + c * (invW + gapX),
          y: startY + r * (invH + gapY),
          w: invW,
          h: invH,
          alive: true,
        });
      }
    }
    invadersRef.current = list;
    dirRef.current = 1;
    stepDownRef.current = 0;
  }, []);

  const resize = useCallback(() => {
    const el = containerRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    const rect = el.getBoundingClientRect();
    const cssW = Math.min(rect.width, CANVAS_MAX_WIDTH);
    const cssH = Math.round(cssW * 0.8);

    widthRef.current = Math.floor(cssW);
    heightRef.current = Math.floor(cssH);

    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    canvas.width = Math.floor(cssW * DPR);
    canvas.height = Math.floor(cssH * DPR);

    // Center player
    playerX.current = (widthRef.current - playerW.current) / 2;
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    waveRef.current = 1;
    bulletsRef.current = [];
    initInvaders();
    setRunning(true);
  }, [initInvaders]);

  const shoot = useCallback(() => {
    const now = performance.now();
    if (now - lastShootAtRef.current < 220) return; // cooldown
    lastShootAtRef.current = now;

    const px = playerX.current + playerW.current / 2 - 2;
    bulletsRef.current.push({ x: px, y: heightRef.current - 58, w: 4, h: 10, vy: -8, active: true });
  }, []);

  const movePlayer = useCallback((dir: -1 | 1) => {
    playerX.current = clamp(
      playerX.current + dir * playerSpeed.current,
      8,
      widthRef.current - playerW.current - 8
    );
  }, []);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.strokeStyle = gridLine;
    ctx.lineWidth = 1 * DPR;
    ctx.globalAlpha = 0.25;
    for (let x = 0; x < widthRef.current; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x * DPR, 0);
      ctx.lineTo(x * DPR, heightRef.current * DPR);
      ctx.stroke();
    }
    for (let y = 0; y < heightRef.current; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y * DPR);
      ctx.lineTo(widthRef.current * DPR, y * DPR);
      ctx.stroke();
    }
    ctx.restore();
  };

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx);

    // Draw HUD
    ctx.save();
    ctx.scale(DPR, DPR);
    ctx.fillStyle = textColor;
    ctx.font = "600 14px ui-sans-serif, system-ui, -apple-system";
    ctx.fillText(`Score: ${score}`, 12, 20);
    ctx.fillText(`High: ${high}`, widthRef.current - 110, 20);
    ctx.fillText(`Wave ${waveRef.current}`, widthRef.current / 2 - 28, 20);
    ctx.restore();

    // Update invaders movement
    const invaders = invadersRef.current;
    const alive = invaders.filter((i) => i.alive);
    const speed = 0.6 + (waveRef.current - 1) * 0.15;

    let minX = Infinity,
      maxX = -Infinity,
      maxY = 0;
    for (const inv of alive) {
      minX = Math.min(minX, inv.x);
      maxX = Math.max(maxX, inv.x + inv.w);
      maxY = Math.max(maxY, inv.y + inv.h);
    }
    if (alive.length) {
      if (minX <= 8 || maxX >= widthRef.current - 8) {
        dirRef.current *= -1;
        stepDownRef.current = 12;
      }
    }

    for (const inv of invaders) {
      if (!inv.alive) continue;
      inv.x += dirRef.current * speed;
      if (stepDownRef.current > 0) inv.y += 2; // drop a little
    }
    if (stepDownRef.current > 0) stepDownRef.current -= 2;

    // Draw invaders
    const invaderCol = invaderColor;
    for (const inv of invaders) {
      if (!inv.alive) continue;
      ctx.fillStyle = invaderCol;
      ctx.fillRect(inv.x * DPR, inv.y * DPR, inv.w * DPR, inv.h * DPR);
      // tiny eye
      ctx.fillStyle = bg;
      ctx.fillRect((inv.x + 6) * DPR, (inv.y + 5) * DPR, 4 * DPR, 4 * DPR);
    }

    // Update bullets
    for (const b of bulletsRef.current) {
      if (!b.active) continue;
      b.y += b.vy;
      if (b.y < -b.h) b.active = false;
    }
    // Collisions
    for (const b of bulletsRef.current) {
      if (!b.active) continue;
      for (const inv of invaders) {
        if (!inv.alive) continue;
        if (b.x < inv.x + inv.w && b.x + b.w > inv.x && b.y < inv.y + inv.h && b.y + b.h > inv.y) {
          inv.alive = false;
          b.active = false;
          setScore((s) => s + 10);
          break;
        }
      }
    }
    // Remove inactive bullets
    bulletsRef.current = bulletsRef.current.filter((b) => b.active);

    // Draw bullets
    ctx.fillStyle = bulletColor;
    for (const b of bulletsRef.current) {
      ctx.fillRect(b.x * DPR, b.y * DPR, b.w * DPR, b.h * DPR);
    }

    // Draw player (as a small base)
    const px = playerX.current;
    const py = heightRef.current - 48;
    const pw = playerW.current;
    const ph = 14;
    ctx.fillStyle = playerColor;
    ctx.fillRect(px * DPR, py * DPR, pw * DPR, ph * DPR);
    ctx.fillRect((px + pw / 2 - 4) * DPR, (py - 10) * DPR, 8 * DPR, 10 * DPR);

    // Check lose condition
    if (maxY >= py - 6) {
      // Game over
      ctx.save();
      ctx.scale(DPR, DPR);
      ctx.fillStyle = textColor;
      ctx.font = "700 20px ui-sans-serif, system-ui";
      ctx.fillText("Game Over – Press R to restart", 24, heightRef.current / 2);
      ctx.restore();
      setRunning(false);
    }

    // Next wave if all cleared
    if (alive.length && alive.every((i) => !i.alive)) {
      waveRef.current += 1;
      initInvaders();
      setScore((s) => s + 50);
    }

    if (running) rafRef.current = requestAnimationFrame(loop);
  }, [bg, gridLine, bulletColor, invaderColor, playerColor, textColor, high, score, running, initInvaders]);

  // Init
  useEffect(() => {
    resize();
    initInvaders();
    setRunning(true);

    const ro = new ResizeObserver(() => resize());
    if (containerRef.current) ro.observe(containerRef.current);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initInvaders, loop, resize]);

  // Pause/resume
  useEffect(() => {
    if (running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(loop);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [running, loop]);

  // High score persistence
  useEffect(() => {
    if (score > high) {
      setHigh(score);
      localStorage.setItem("bh_space_invaders_high", String(score));
    }
  }, [score, high]);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") movePlayer(-1);
      else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") movePlayer(1);
      else if (e.key === " ") shoot();
      else if (e.key.toLowerCase() === "p") setRunning((r) => !r);
      else if (e.key.toLowerCase() === "r") resetGame();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [movePlayer, shoot, resetGame]);

  return (
    <div className="w-full">
      <div className="mb-3 text-sm text-muted-foreground">
        Téma: védd meg a növekedést a "sokkok" inváziójától – BuildHungary Space Invaders.
      </div>
      <div ref={containerRef} className="mx-auto w-full max-w-[520px] select-none">
        <canvas ref={canvasRef} className="rounded-md border bg-background shadow-sm" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" aria-label="Move left" onClick={() => movePlayer(-1)}>
          ← Balra
        </Button>
        <Button variant="hero" size="sm" aria-label="Shoot" onClick={shoot}>
          Tűz
        </Button>
        <Button variant="outline" size="sm" aria-label="Move right" onClick={() => movePlayer(1)}>
          Jobbra →
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label={running ? "Pause" : "Resume"}
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "Szünet" : "Folytatás"}
        </Button>
        <Button variant="outline" size="sm" aria-label="Reset game" onClick={resetGame}>
          Újrakezd
        </Button>
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Irányítás: ← → vagy A/D mozgatás, Space lövés, P szünet, R újrakezdés.
      </p>
    </div>
  );
};

export default SpaceInvadersGame;
