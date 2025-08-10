import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Safety note: We avoid using real people's faces/logos.
// Head is rendered as a primary-colored disc with "MP" initials.
// Food is rendered as an accent-colored disc with "F" label.

type Point = { x: number; y: number };

type Dir = 'up' | 'down' | 'left' | 'right';

const GRID = 20; // 20x20 grid
const CELL = 24; // px per cell
const SPEED_MS = 120; // game tick

function useCss(varName: string, fallback: string) {
  const [val, setVal] = useState(fallback);
  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const v = root.getPropertyValue(varName).trim();
    if (v) setVal(`hsl(${v})`);
  }, [varName]);
  return val;
}

export const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState<number>(() => Number(localStorage.getItem('snake_high') || 0));
  const [dir, setDir] = useState<Dir>('right');
  const dirRef = useRef<Dir>('right');
  const [snake, setSnake] = useState<Point[]>([{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }]);
  const snakeRef = useRef<Point[]>(snake);
  const [food, setFood] = useState<Point>({ x: 12, y: 10 });
  const lastTick = useRef(0);

  const primary = useCss('--primary', 'hsl(142 72% 28%)');
  const primaryFg = useCss('--primary-foreground', 'hsl(0 0% 100%)');
  const accent = useCss('--accent', 'hsl(210 40% 96.1%)');
  const foreground = useCss('--foreground', 'hsl(222.2 84% 4.9%)');
  const background = useCss('--card', 'hsl(0 0% 100%)');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'p') { setRunning((r) => !r); return; }
      let nd: Dir | null = null;
      if (k === 'arrowup' || k === 'w') nd = 'up';
      else if (k === 'arrowdown' || k === 's') nd = 'down';
      else if (k === 'arrowleft' || k === 'a') nd = 'left';
      else if (k === 'arrowright' || k === 'd') nd = 'right';
      if (!nd) return;
      const opposite: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
      if (opposite[dirRef.current] === nd) return; // prevent 180 turns
      dirRef.current = nd; setDir(nd);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const randFood = (body: Point[]): Point => {
    while (true) {
      const p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
      if (!body.some((s) => s.x === p.x && s.y === p.y)) return p;
    }
  };

  const reset = () => {
    const init = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }];
    setSnake(init); snakeRef.current = init;
    setDir('right'); dirRef.current = 'right';
    setFood({ x: 12, y: 10 });
    setScore(0);
    setRunning(true);
  };

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    const step = (t: number) => {
      if (t - lastTick.current > SPEED_MS && running) {
        lastTick.current = t;
        // advance
        const body = [...snakeRef.current];
        const head = { ...body[0] };
        const d = dirRef.current;
        if (d === 'up') head.y -= 1;
        else if (d === 'down') head.y += 1;
        else if (d === 'left') head.x -= 1;
        else head.x += 1;

        // collisions
        if (head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID || body.some((s) => s.x === head.x && s.y === head.y)) {
          setRunning(false);
          setHigh((h) => { const nh = Math.max(h, score); localStorage.setItem('snake_high', String(nh)); return nh; });
        } else {
          body.unshift(head);
          if (head.x === food.x && head.y === food.y) {
            setScore((s) => s + 1);
            const nf = randFood(body); setFood(nf);
          } else {
            body.pop();
          }
          snakeRef.current = body;
          setSnake(body);
        }
      }

      // draw
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // grid (subtle)
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      for (let i = 0; i <= GRID; i++) {
        ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, GRID * CELL); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(GRID * CELL, i * CELL); ctx.stroke();
      }

      // snake body
      ctx.fillStyle = primary;
      snakeRef.current.slice(1).forEach((p) => {
        ctx.fillRect(p.x * CELL + 2, p.y * CELL + 2, CELL - 4, CELL - 4);
      });

      // head (circle with MP)
      const h = snakeRef.current[0];
      ctx.beginPath();
      ctx.fillStyle = primary;
      ctx.arc(h.x * CELL + CELL / 2, h.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = primaryFg;
      ctx.font = 'bold 12px system-ui, -apple-system, Segoe UI, Roboto';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('MP', h.x * CELL + CELL / 2, h.y * CELL + CELL / 2);

      // food (circle with F)
      ctx.beginPath();
      ctx.fillStyle = foreground; // outline text color
      ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(var(--accent))';
      ctx.fill();
      ctx.fillStyle = foreground;
      ctx.fillText('F', food.x * CELL + CELL / 2, food.y * CELL + CELL / 2);

      requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [running, score, background, primary, primaryFg, foreground]);

  const handleDir = (d: Dir) => {
    const opposite: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
    if (opposite[dirRef.current] === d) return;
    dirRef.current = d; setDir(d);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Score: <span className="font-medium text-foreground">{score}</span> · Best: <span className="font-medium text-foreground">{high}</span></div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Resume'}</Button>
            <Button size="sm" variant="hero" onClick={reset}>Restart</Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <canvas ref={canvasRef} width={GRID * CELL} height={GRID * CELL} className="rounded-lg border bg-card shadow-elevated" />
          <div className="grid grid-cols-3 gap-2 md:hidden">
            <Button size="sm" variant="outline" onClick={() => handleDir('up')}>Up</Button>
            <div />
            <Button size="sm" variant="outline" onClick={() => handleDir('right')}>Right</Button>
            <Button size="sm" variant="outline" onClick={() => handleDir('left')}>Left</Button>
            <div />
            <Button size="sm" variant="outline" onClick={() => handleDir('down')}>Down</Button>
          </div>
          <p className="text-xs text-muted-foreground">Controls: Arrow keys / WASD · P to pause</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SnakeGame;
