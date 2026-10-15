import * as THREE from "three";
import { contact, profile } from "@/data/portfolio";

// Same aspect ratio as the 1.6 x 2.25 card in Lanyard.tsx
export const CARD_W = 1.6;
export const CARD_H = 2.25;
const W = 512;
const H = 720;

const fontVar = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

function base(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 32); // transparent corners get cut by alphaTest
  ctx.clip();
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#1a1a1a");
  g.addColorStop(1, "#050505");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // Slot for the clip
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.roundRect(W / 2 - 44, 24, 88, 14, 7);
  ctx.fill();
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, W - 40, H - 40);
}

/** Shrinks the font until the text fits the given width. */
function fitText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, size: number, family: string, weight = 700) {
  let s = size;
  do ctx.font = `${weight} ${s--}px ${family}`;
  while (ctx.measureText(text).width > maxW && s > 12);
  ctx.fillText(text, x, y);
}

export function drawFront(canvas: HTMLCanvasElement, photo?: HTMLImageElement) {
  const ctx = canvas.getContext("2d")!;
  const display = fontVar("--font-display", "sans-serif");
  const mono = fontVar("--font-geist-mono", "monospace");
  base(ctx);

  ctx.fillStyle = "#fafafa";
  ctx.textBaseline = "alphabetic";
  fitText(ctx, `${profile.nickname}.`, 48, 96, 260, 34, display);
  ctx.font = `500 16px ${mono}`;
  ctx.fillStyle = "#737373";
  ctx.textAlign = "right";
  ctx.fillText("ID / 001", W - 48, 92);
  ctx.textAlign = "left";

  // Photo (grayscale, object-fit: cover) or initials fallback
  const px = 48, py = 120, pw = W - 96, ph = 370;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(px, py, pw, ph, 18);
  ctx.clip();
  ctx.fillStyle = "#262626";
  ctx.fillRect(px, py, pw, ph);
  if (photo) {
    const s = Math.max(pw / photo.width, ph / photo.height);
    const w = photo.width * s, h = photo.height * s;
    ctx.filter = "grayscale(1) contrast(1.1)";
    ctx.drawImage(photo, px + (pw - w) / 2, py + (ph - h) / 2, w, h);
    ctx.filter = "none";
  } else {
    ctx.fillStyle = "#525252";
    ctx.font = `700 160px ${display}`;
    ctx.textAlign = "center";
    ctx.fillText(profile.nickname[0], W / 2, py + ph / 2 + 56);
    ctx.textAlign = "left";
  }
  ctx.restore();

  ctx.fillStyle = "#fafafa";
  fitText(ctx, profile.name, 48, 556, W - 96, 40, display);
  ctx.fillStyle = "#a3a3a3";
  fitText(ctx, profile.roles[0], 48, 594, W - 96, 20, mono, 500);

  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(48, 626, W - 96, 2);
  ctx.fillStyle = "#737373";
  fitText(ctx, host(contact.github), 48, 668, W - 96, 16, mono, 500);
  ctx.restore();
}

export function drawBack(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const display = fontVar("--font-display", "sans-serif");
  const mono = fontVar("--font-geist-mono", "monospace");
  base(ctx);

  // Faint grid
  ctx.strokeStyle = "#1f1f1f";
  ctx.lineWidth = 1;
  for (let x = 48; x < W - 40; x += 32) ctx.strokeRect(x, 60, 0, H - 120);
  for (let y = 60; y < H - 40; y += 32) ctx.strokeRect(20, y, W - 40, 0);

  ctx.textAlign = "center";
  ctx.fillStyle = "#fafafa";
  fitText(ctx, `${profile.nickname}.`, W / 2, H / 2, W - 120, 96, display);
  ctx.fillStyle = "#a3a3a3";
  ctx.font = `500 18px ${mono}`;
  ctx.fillText("SEE MY WORK", W / 2, H / 2 + 60);
  ctx.fillStyle = "#fafafa";
  fitText(ctx, host(contact.github), W / 2, H / 2 + 94, W - 96, 22, mono, 500);
  ctx.textAlign = "left";
  ctx.restore();
}

/** Black strap with the nickname repeated in white. */
export function makeBandTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#fafafa";
  ctx.font = `700 26px ${fontVar("--font-geist-mono", "monospace")}`;
  ctx.textBaseline = "middle";
  const label = `${profile.nickname.toUpperCase()} • `;
  const step = ctx.measureText(label).width;
  for (let x = 8; x < c.width; x += step) ctx.fillText(label, x, c.height / 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

export function makeCardTexture(draw: (c: HTMLCanvasElement) => void) {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  draw(c);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
