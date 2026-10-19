import { useEffect, useRef } from "react";

// Logical canvas size; scaled up for high-DPI screens.
const W = 800;
const H = 220;
const GROUND = 190;

const PLAYER_X = 60;
const PLAYER_W = 34;
const PLAYER_H = 38;
const DUCK_H = 24;

const GRAVITY = 2200;
const JUMP_V = 720;
const JUMP_CUT_V = 300;
const START_SPEED = 380;
const MAX_SPEED = 900;
const HITBOX_SHRINK = 4;
const BUG_SCORE = 300;
const HI_KEY = "matcha-runner-hi";

const COLORS = {
  bg: "#0a0f0a",
  ground: "#7A9E7E",
  dots: "#1a2a1c",
  cup: "#A8C5A0",
  cupShade: "#7A9E7E",
  foam: "#C8D9A0",
  leaf: "#4A7C59",
  eye: "#0a0f0a",
  coffee: "#6b4f3a",
  lid: "#e7e5e4",
  sleeve: "#c2a27c",
  bug: "#b45353",
  bugWing: "rgba(255,255,255,0.35)",
  text: "#e4e4e7",
  muted: "#71717a",
};

const readHi = () => {
  try {
    return Number(localStorage.getItem(HI_KEY)) || 0;
  } catch {
    return 0;
  }
};

const saveHi = (value) => {
  try {
    localStorage.setItem(HI_KEY, String(value));
  } catch {
    // Storage blocked; high score just won't persist.
  }
};

const rand = (min, max) => min + Math.random() * (max - min);

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
  ctx.fill();
};

const newGame = (hi) => ({
  status: "idle", // idle | running | over
  lift: 0, // player height above the ground
  vLift: 0,
  holding: false,
  ducking: false,
  obstacles: [],
  speed: START_SPEED,
  dist: 0,
  spawnIn: 300,
  overAt: 0,
  time: 0,
  hi,
});

const score = (s) => Math.floor(s.dist / 10);

const playerBox = (s) => {
  const h = s.ducking && s.lift === 0 ? DUCK_H : PLAYER_H;
  return { x: PLAYER_X, y: GROUND - h - s.lift, w: PLAYER_W, h };
};

const hits = (a, b) =>
  a.x + HITBOX_SHRINK < b.x + b.w - HITBOX_SHRINK &&
  a.x + a.w - HITBOX_SHRINK > b.x + HITBOX_SHRINK &&
  a.y + HITBOX_SHRINK < b.y + b.h - HITBOX_SHRINK &&
  a.y + a.h - HITBOX_SHRINK > b.y + HITBOX_SHRINK;

function spawnObstacle(s) {
  if (score(s) >= BUG_SCORE && Math.random() < 0.3) {
    // Low bugs must be jumped; high bugs can be ducked under.
    const high = Math.random() < 0.5;
    const h = 18;
    s.obstacles.push({
      type: "bug",
      x: W + 20,
      w: 30,
      h,
      y: GROUND - h - (high ? 30 : 6),
    });
  } else {
    const w = rand(22, 34);
    const h = rand(28, 46);
    s.obstacles.push({ type: "cup", x: W + 20, w, h, y: GROUND - h });
  }
  s.spawnIn = s.speed * rand(0.9, 1.7);
}

function update(s, dt) {
  s.time += dt;
  if (s.status !== "running") return;

  s.speed = Math.min(MAX_SPEED, START_SPEED + s.dist * 0.01);
  const step = s.speed * dt;
  s.dist += step;

  // Jump physics
  if (s.lift > 0 || s.vLift > 0) {
    s.vLift -= GRAVITY * dt * (s.ducking ? 2 : 1);
    s.lift = Math.max(0, s.lift + s.vLift * dt);
    if (s.lift === 0) s.vLift = 0;
  }

  // Obstacles
  s.spawnIn -= step;
  if (s.spawnIn <= 0) spawnObstacle(s);
  for (const o of s.obstacles) o.x -= o.type === "bug" ? step + 60 * dt : step;
  s.obstacles = s.obstacles.filter((o) => o.x + o.w > -10);

  const p = playerBox(s);
  if (s.obstacles.some((o) => hits(p, o))) {
    s.status = "over";
    s.overAt = s.time;
    if (score(s) > s.hi) {
      s.hi = score(s);
      saveHi(s.hi);
    }
  }
}

function drawPlayer(ctx, s) {
  const { x, y, w, h } = playerBox(s);
  const running = s.status === "running" && s.lift === 0;
  const legSwap = running && Math.floor(s.time * 12) % 2 === 0;

  // Legs
  ctx.fillStyle = COLORS.cupShade;
  ctx.fillRect(x + 8, y + h - 2, 5, legSwap ? 2 : 4);
  ctx.fillRect(x + w - 13, y + h - 2, 5, legSwap ? 4 : 2);

  // Cup body
  ctx.fillStyle = COLORS.cup;
  roundRect(ctx, x, y + 6, w, h - 8, [2, 2, 8, 8]);
  ctx.fillStyle = COLORS.cupShade;
  ctx.fillRect(x + w - 6, y + 10, 3, h - 18);

  // Foam top
  ctx.fillStyle = COLORS.foam;
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + 6, w / 2 + 1, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Leaf
  ctx.fillStyle = COLORS.leaf;
  ctx.beginPath();
  ctx.ellipse(x + w / 2 + 4, y - 1, 6, 3, -0.6, 0, Math.PI * 2);
  ctx.fill();

  // Face
  const blink = Math.floor(s.time * 2) % 6 === 0;
  ctx.fillStyle = COLORS.eye;
  if (s.status === "over") {
    ctx.font = "bold 9px monospace";
    ctx.fillText("x x", x + 7, y + 22);
  } else {
    ctx.fillRect(x + 10, y + 16, 3, blink ? 1 : 4);
    ctx.fillRect(x + w - 15, y + 16, 3, blink ? 1 : 4);
  }
}

function drawCoffee(ctx, o) {
  ctx.fillStyle = COLORS.coffee;
  roundRect(ctx, o.x + 2, o.y + 5, o.w - 4, o.h - 5, [0, 0, 4, 4]);
  ctx.fillStyle = COLORS.sleeve;
  ctx.fillRect(o.x + 2, o.y + o.h * 0.4, o.w - 4, o.h * 0.25);
  ctx.fillStyle = COLORS.lid;
  roundRect(ctx, o.x, o.y, o.w, 6, 3);
}

function drawBug(ctx, o, time) {
  const flap = Math.floor(time * 14) % 2 === 0;
  const cx = o.x + o.w / 2;
  const cy = o.y + o.h / 2;

  ctx.fillStyle = COLORS.bugWing;
  ctx.beginPath();
  ctx.ellipse(cx - 2, cy - (flap ? 8 : 3), 9, 4, -0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.bug;
  ctx.beginPath();
  ctx.ellipse(cx, cy, o.w / 2, o.h / 2 - 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = COLORS.bug;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = -1; i <= 1; i++) {
    ctx.moveTo(cx + i * 6, cy + 4);
    ctx.lineTo(cx + i * 6 - 3, cy + 9);
  }
  ctx.stroke();

  ctx.fillStyle = COLORS.eye;
  ctx.fillRect(o.x + 3, cy - 3, 3, 3);
}

function draw(ctx, s) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, W, H);

  // Parallax dots
  ctx.fillStyle = COLORS.dots;
  for (let i = 0; i < 24; i++) {
    const x = (((i * 137 - s.dist * 0.25) % W) + W) % W;
    ctx.fillRect(x, 30 + ((i * 53) % 120), 2, 2);
  }

  // Ground with moving specks
  ctx.fillStyle = COLORS.ground;
  ctx.fillRect(0, GROUND, W, 1);
  for (let i = 0; i < 30; i++) {
    const x = (((i * 71 - s.dist) % W) + W) % W;
    ctx.fillRect(x, GROUND + 6 + ((i * 7) % 14), i % 3 === 0 ? 4 : 2, 1);
  }

  for (const o of s.obstacles) {
    if (o.type === "bug") drawBug(ctx, o, s.time);
    else drawCoffee(ctx, o);
  }
  drawPlayer(ctx, s);

  // Score
  const pad = (n) => String(n).padStart(5, "0");
  ctx.textAlign = "right";
  ctx.font = "600 14px ui-monospace, monospace";
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(`HI ${pad(s.hi)}`, W - 110, 28);
  ctx.fillStyle = COLORS.text;
  ctx.fillText(pad(score(s)), W - 20, 28);

  // Overlays
  ctx.textAlign = "center";
  if (s.status === "idle") {
    ctx.fillStyle = COLORS.text;
    ctx.font = "300 16px ui-monospace, monospace";
    ctx.fillText("PRESS SPACE OR TAP TO START", W / 2, 90);
  } else if (s.status === "over") {
    ctx.fillStyle = COLORS.text;
    ctx.font = "700 20px ui-monospace, monospace";
    ctx.fillText("G A M E   O V E R", W / 2, 80);
    ctx.fillStyle = COLORS.muted;
    ctx.font = "300 13px ui-monospace, monospace";
    ctx.fillText("space or tap to retry", W / 2, 106);
  }
  ctx.textAlign = "left";
}

export default function MatchaRunner() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let s = newGame(readHi());
    let raf = 0;
    let last = performance.now();

    const press = () => {
      if (s.status === "over") {
        if (s.time - s.overAt < 0.4) return; // avoid instant accidental restarts
        s = { ...newGame(s.hi), status: "running" };
        return;
      }
      if (s.status === "idle") s.status = "running";
      s.holding = true;
      if (s.lift === 0) s.vLift = JUMP_V;
    };

    const release = () => {
      s.holding = false;
      if (s.vLift > JUMP_CUT_V) s.vLift = JUMP_CUT_V;
    };

    const onKeyDown = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!e.repeat) press();
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        s.ducking = true;
      }
    };

    const onKeyUp = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") release();
      else if (e.code === "ArrowDown") s.ducking = false;
    };

    const onPointerDown = (e) => {
      e.preventDefault();
      press();
    };

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); // clamp after tab switches
      last = now;
      update(s, dt);
      draw(ctx, s);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", release);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", release);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto rounded-2xl border border-white/10 touch-none select-none"
      style={{ aspectRatio: `${W} / ${H}` }}
    />
  );
}
