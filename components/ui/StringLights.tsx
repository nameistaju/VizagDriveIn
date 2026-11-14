"use client";

import React, { useEffect, useRef } from "react";

// ==========================================
// TUNABLE CONFIGURATION
// ==========================================
export const CONFIG = {
  // Bulb counts: [top strand, middle strand, lower strand]
  bulbCounts: [14, 18, 12] as [number, number, number],
  bulbCountsMobile: [8, 11, 7] as [number, number, number],

  // Glow geometry & alpha (in CSS pixels)
  glowCoreRadius: 10,       // Core bright circle radius (CSS px)
  glowBloomRadius: 38,      // Soft outer ambient bloom radius (CSS px)
  glowCoreAlpha: 0.55,      // Core opacity (0.5 - 0.6)
  glowBloomAlpha: 0.14,     // Soft bloom opacity (0.12 - 0.16)

  // Natural dynamics & interaction
  flicker: 0.05,            // Per-bulb micro-flicker (+/- 5%)
  gravity: 780,             // Downward gravitational acceleration (px/s^2)
  damping: 0.985,           // Verlet velocity retention (0.98 - 0.99)
  windStrength: 0.75,       // Ambient breeze sway
  pointerRadius: 90,        // Mouse/touch repulsion radius (px)
  pointerForce: 1.0,        // Force of cursor deflection
  scrollImpulse: 0.65,      // Sway force on page scroll

  // Simulation structure
  pointsPerStrand: 42,
  constraintIterations: 6,
};

interface VerletPoint {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned: boolean;
}

interface Constraint {
  p1: VerletPoint;
  p2: VerletPoint;
  restLength: number;
}

interface BulbPendulum {
  strandIndex: number;
  segmentIndex: number;
  angle: number;           // Pendulum angle in radians (0 = straight down)
  angularVelocity: number;
  dropLength: number;      // Distance below wire in CSS px
  scale: number;           // Subtle size variation (14 - 18px tall)
  flickerPhase: number;
  dimState: number;        // > 0 during occasional vintage dip
}

interface Strand {
  points: VerletPoint[];
  constraints: Constraint[];
  bulbs: BulbPendulum[];
  sagDepth: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export default function StringLights() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let isVisible = true;
    let isTabActive = true;
    let cssWidth = 0;
    const cssHeight = 170;

    let glowSprite: HTMLCanvasElement | null = null;
    let bulbSprite: HTMLCanvasElement | null = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let pointerX = -9999;
    let pointerY = -9999;
    let pointerVx = 0;
    let pointerVy = 0;
    let lastPointerX = -9999;
    let lastPointerY = -9999;

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    let strands: Strand[] = [];

    // ------------------------------------------------------------------
    // 1. Offscreen Sprite Prerendering (Zero square-clipping, Retina sharp)
    // ------------------------------------------------------------------
    const createSprites = (dpr: number) => {
      // A. Radial Glow Sprite
      // Must be at least 2x glowBloomRadius + padding so radial gradient reaches alpha 0 without clipping
      const bloomR = CONFIG.glowBloomRadius * dpr;
      const coreR = CONFIG.glowCoreRadius * dpr;
      const padding = 6 * dpr;
      const glowSize = Math.ceil((bloomR + padding) * 2);

      glowSprite = document.createElement("canvas");
      glowSprite.width = glowSize;
      glowSprite.height = glowSize;
      const gCtx = glowSprite.getContext("2d");

      if (gCtx) {
        const center = glowSize / 2;
        const grad = gCtx.createRadialGradient(
          center,
          center,
          0,
          center,
          center,
          bloomR
        );

        // Core warm white-amber (#ffe3a3) to soft bloom (#f5a623) to 0 at edge
        grad.addColorStop(0, `rgba(255, 243, 205, ${CONFIG.glowCoreAlpha})`);
        grad.addColorStop(
          Math.min(0.28, coreR / bloomR),
          `rgba(255, 227, 163, ${CONFIG.glowCoreAlpha * 0.75})`
        );
        grad.addColorStop(0.55, `rgba(245, 166, 35, ${CONFIG.glowBloomAlpha})`);
        grad.addColorStop(0.85, `rgba(245, 166, 35, ${CONFIG.glowBloomAlpha * 0.3})`);
        grad.addColorStop(1, "rgba(245, 166, 35, 0)"); // Alpha 0 exactly at edge

        gCtx.fillStyle = grad;
        gCtx.beginPath();
        gCtx.arc(center, center, bloomR, 0, Math.PI * 2);
        gCtx.fill();
      }

      // B. Glass Bulb & Socket Sprite (14 - 18px tall classic Edison bulb)
      const bulbW = Math.round(24 * dpr);
      const bulbH = Math.round(30 * dpr);
      bulbSprite = document.createElement("canvas");
      bulbSprite.width = bulbW;
      bulbSprite.height = bulbH;
      const bCtx = bulbSprite.getContext("2d");

      if (bCtx) {
        bCtx.scale(dpr, dpr);
        const bx = 12;
        const by = 2;

        // Dark metallic socket at the top
        bCtx.fillStyle = "#171412";
        bCtx.fillRect(bx - 3, by, 6, 4.5);
        bCtx.fillStyle = "#3a3026";
        bCtx.fillRect(bx - 3.5, by + 3.5, 7, 1.2);

        // Pear-shaped glass envelope
        bCtx.beginPath();
        bCtx.moveTo(bx - 2.5, by + 4.5);
        bCtx.bezierCurveTo(bx - 5.5, by + 7, bx - 6.5, by + 11.5, bx - 4.5, by + 15);
        bCtx.bezierCurveTo(bx - 2.5, by + 17.5, bx + 2.5, by + 17.5, bx + 4.5, by + 15);
        bCtx.bezierCurveTo(bx + 6.5, by + 11.5, bx + 5.5, by + 7, bx + 2.5, by + 4.5);
        bCtx.closePath();

        // Warm glass interior gradient
        const glassGrad = bCtx.createRadialGradient(
          bx,
          by + 11,
          0.5,
          bx,
          by + 11,
          7
        );
        glassGrad.addColorStop(0, "rgba(255, 248, 220, 0.95)");
        glassGrad.addColorStop(0.35, "rgba(255, 227, 163, 0.88)");
        glassGrad.addColorStop(0.75, "rgba(245, 166, 35, 0.65)");
        glassGrad.addColorStop(1, "rgba(214, 90, 40, 0.35)");
        bCtx.fillStyle = glassGrad;
        bCtx.fill();

        // Glowing filament hairpin loop
        bCtx.strokeStyle = "#ffffff";
        bCtx.lineWidth = 1.0;
        bCtx.beginPath();
        bCtx.moveTo(bx - 1.5, by + 7.5);
        bCtx.quadraticCurveTo(bx, by + 12, bx + 1.5, by + 7.5);
        bCtx.stroke();

        // Specular glass highlight
        bCtx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        bCtx.lineWidth = 0.8;
        bCtx.beginPath();
        bCtx.arc(bx - 2.5, by + 10.5, 3.2, Math.PI * 0.95, Math.PI * 1.55);
        bCtx.stroke();
      }
    };

    // ------------------------------------------------------------------
    // 2. Geometry: Catenary Strands Anchored at Top Edge (Hanging DOWN)
    // ------------------------------------------------------------------
    const setupStrands = () => {
      // Use window.innerWidth to ensure full viewport coverage without exceeding it
      cssWidth = window.innerWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Explicitly set canvas width/height to CSS dimensions * DPR
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      createSprites(dpr);

      const isMobile = cssWidth < 768;
      const counts = isMobile ? CONFIG.bulbCountsMobile : CONFIG.bulbCounts;

      // 3 drooping strands hanging DOWN from top edge:
      // Endpoints anchored near y=0 to y=24px; sag downward by 40 to 110px.
      const configs = [
        // Strand 0: Top graceful dip across the navbar
        { startX: -15, startY: 4, endX: cssWidth + 15, endY: 16, sag: 48, bulbs: counts[0] },
        // Strand 1: Middle strand crossing with deeper droop
        { startX: -20, startY: 18, endX: cssWidth + 20, endY: 10, sag: 82, bulbs: counts[1] },
        // Strand 2: Lower sweeping strand extending softly into hero
        { startX: -15, startY: 8, endX: cssWidth + 25, endY: 22, sag: 108, bulbs: counts[2] },
      ];

      strands = configs.map((cfg, sIdx) => {
        const points: VerletPoint[] = [];
        const n = CONFIG.pointsPerStrand;

        for (let i = 0; i < n; i++) {
          const t = i / (n - 1);
          const x = cfg.startX + (cfg.endX - cfg.startX) * t;
          const baselineY = cfg.startY + (cfg.endY - cfg.startY) * t;
          // Exact catenary curve at rest
          const catenarySag = 4 * cfg.sag * t * (1 - t);
          const y = baselineY + catenarySag;

          const isPinned = i === 0 || i === n - 1;
          points.push({
            x,
            y,
            oldX: x,
            oldY: y,
            pinned: isPinned,
          });
        }

        const constraints: Constraint[] = [];
        for (let i = 0; i < n - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const restLength = Math.sqrt(dx * dx + dy * dy);
          constraints.push({ p1, p2, restLength });
        }

        // Space bulbs organically along the wire
        const bulbs: BulbPendulum[] = [];
        const margin = 2;
        const available = n - 1 - margin * 2;
        const step = available / (cfg.bulbs + 1);

        for (let b = 0; b < cfg.bulbs; b++) {
          const jitter = Math.sin(b * 3.4 + sIdx * 4.7) * (step * 0.3);
          const segIdx = Math.max(
            1,
            Math.min(n - 2, Math.round(margin + (b + 1) * step + jitter))
          );

          bulbs.push({
            strandIndex: sIdx,
            segmentIndex: segIdx,
            angle: 0,
            angularVelocity: 0,
            dropLength: 10 + ((b + sIdx) % 3) * 1.5,
            scale: 0.95 + ((b * 5 + sIdx * 3) % 4) * 0.05, // 15 - 18px tall
            flickerPhase: b * 1.9 + sIdx * 3.5,
            dimState: 0,
          });
        }

        return {
          points,
          constraints,
          bulbs,
          sagDepth: cfg.sag,
          startX: cfg.startX,
          startY: cfg.startY,
          endX: cfg.endX,
          endY: cfg.endY,
        };
      });
    };

    setupStrands();

    // ------------------------------------------------------------------
    // 3. Physics Engine (Verlet Solver + Spring-Damped Pendulums)
    // ------------------------------------------------------------------
    const FIXED_DT = 1 / 60;
    const fixedDtSq = FIXED_DT * FIXED_DT;
    let accumulator = 0;
    let lastTime = performance.now();
    let simTime = 0;

    const stepPhysics = (dt: number) => {
      simTime += dt;

      scrollVelocity *= 0.88;
      const activeScrollForce = scrollVelocity * CONFIG.scrollImpulse;

      pointerVx *= 0.8;
      pointerVy *= 0.8;

      for (let sIdx = 0; sIdx < strands.length; sIdx++) {
        const strand = strands[sIdx];
        const points = strand.points;

        // A. Verlet Point Acceleration
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          if (p.pinned) continue;

          const vx = (p.x - p.oldX) * CONFIG.damping;
          const vy = (p.y - p.oldY) * CONFIG.damping;

          p.oldX = p.x;
          p.oldY = p.y;

          // Gentle ambient wind
          const wind =
            Math.sin(simTime * 1.1 + p.x * 0.003 + sIdx * 1.2) * 0.6 +
            Math.sin(simTime * 2.3 + p.x * 0.007) * 0.3 +
            Math.sin(simTime * 0.5) * 0.2;
          const windForceX = wind * 35 * CONFIG.windStrength;

          // Scroll impulse
          const scrollForceY = activeScrollForce * 10;

          // Pointer deflection
          let pointerForceX = 0;
          let pointerForceY = 0;
          const pdx = p.x - pointerX;
          const pdy = p.y - pointerY;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pDist < CONFIG.pointerRadius && pDist > 0.01) {
            const factor = (1 - pDist / CONFIG.pointerRadius) * CONFIG.pointerForce;
            const normX = pdx / pDist;
            const normY = pdy / pDist;
            pointerForceX = normX * factor * 1100 + pointerVx * factor * 60;
            pointerForceY = normY * factor * 1100 + pointerVy * factor * 60;
          }

          const ax = windForceX + pointerForceX;
          const ay = CONFIG.gravity + scrollForceY + pointerForceY;

          p.x += vx + ax * fixedDtSq;
          p.y += vy + ay * fixedDtSq;
        }

        // B. Distance Relaxation Constraints
        for (let iter = 0; iter < CONFIG.constraintIterations; iter++) {
          for (let c = 0; c < strand.constraints.length; c++) {
            const { p1, p2, restLength } = strand.constraints[c];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.0001) continue;

            const diff = (dist - restLength) / dist;

            if (!p1.pinned && !p2.pinned) {
              p1.x += dx * 0.5 * diff;
              p1.y += dy * 0.5 * diff;
              p2.x -= dx * 0.5 * diff;
              p2.y -= dy * 0.5 * diff;
            } else if (!p1.pinned && p2.pinned) {
              p1.x += dx * diff;
              p1.y += dy * diff;
            } else if (p1.pinned && !p2.pinned) {
              p2.x -= dx * diff;
              p2.y -= dy * diff;
            }
          }
        }

        // C. Bulb Pendulums (Hanging DOWN, Spring-Damped)
        for (let b = 0; b < strand.bulbs.length; b++) {
          const bulb = strand.bulbs[b];
          const anchorPoint = points[bulb.segmentIndex];

          const wireVelocityX = anchorPoint.x - anchorPoint.oldX;

          // Restoring torque toward straight down (angle = 0)
          const springTorque = -9.8 * Math.sin(bulb.angle) * 3.8;
          const dampingTorque = -bulb.angularVelocity * 3.0;
          const disturbance = -wireVelocityX * 32;

          const angularAcc = springTorque + dampingTorque + disturbance;
          bulb.angularVelocity += angularAcc * dt;
          bulb.angle += bulb.angularVelocity * dt;

          // Occasional micro-dim
          if (bulb.dimState > 0) {
            bulb.dimState -= dt * 4.0;
            if (bulb.dimState < 0) bulb.dimState = 0;
          } else if (Math.random() < 0.0025) {
            bulb.dimState = 1.0;
          }
        }
      }
    };

    // ------------------------------------------------------------------
    // 4. Rendering Pipeline (Fixed Frame Clearing & Pass Ordering)
    // ------------------------------------------------------------------
    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // STEP 1: Mandatory Full Frame Clearing
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Re-apply DPR scale transform for crisp drawing
      ctx.scale(dpr, dpr);

      // PASS (a): Wires drawn on source-over
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      for (let s = 0; s < strands.length; s++) {
        const strand = strands[s];
        const pts = strand.points;
        if (pts.length < 2) continue;

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);

        // Near-black rubber cable with faint brown highlight
        ctx.strokeStyle = "#14110f";
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        ctx.strokeStyle = "rgba(65, 52, 42, 0.6)";
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // PASS (b): All Bloom Glows in a Single Screen/Additive Pass
      if (glowSprite) {
        ctx.save();
        // Use 'screen' to eliminate risk of additive blowout while keeping warm radiance
        ctx.globalCompositeOperation = "screen";

        for (let s = 0; s < strands.length; s++) {
          const strand = strands[s];
          for (let b = 0; b < strand.bulbs.length; b++) {
            const bulb = strand.bulbs[b];
            const anchor = strand.points[bulb.segmentIndex];

            // Bulb hanging position
            const bx = anchor.x + Math.sin(bulb.angle) * bulb.dropLength;
            const by = anchor.y + Math.cos(bulb.angle) * bulb.dropLength + 9;

            // Per-bulb subtle flicker (+/- 5%)
            const timeVal = simTime * 4.0 + bulb.flickerPhase;
            const flickerDelta =
              (Math.sin(timeVal) * 0.5 + Math.sin(timeVal * 2.1) * 0.3) *
              CONFIG.flicker;
            const dimFactor = bulb.dimState > 0 ? 1 - bulb.dimState * 0.3 : 1;

            // Clamped combined glow alpha (never exceeds 0.85)
            const alpha = Math.min(
              0.85,
              Math.max(0.2, (0.85 + flickerDelta) * dimFactor)
            );

            ctx.globalAlpha = alpha;
            const glowR = CONFIG.glowBloomRadius * bulb.scale;
            ctx.drawImage(
              glowSprite,
              bx - glowR,
              by - glowR,
              glowR * 2,
              glowR * 2
            );
          }
        }
        ctx.restore();
      }

      // PASS (c): Bulb Bodies, Sockets & Filaments on source-over on top
      if (bulbSprite) {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;

        for (let s = 0; s < strands.length; s++) {
          const strand = strands[s];
          for (let b = 0; b < strand.bulbs.length; b++) {
            const bulb = strand.bulbs[b];
            const anchor = strand.points[bulb.segmentIndex];

            ctx.save();
            ctx.translate(anchor.x, anchor.y);
            ctx.rotate(bulb.angle);
            ctx.scale(bulb.scale, bulb.scale);

            // Small black metal cap and socket at the top
            ctx.fillStyle = "#171412";
            ctx.fillRect(-2.5, 0, 5, 3.5);

            // Prerendered Edison bulb body
            const bw = 24;
            const bh = 30;
            ctx.drawImage(bulbSprite, -bw / 2, 2, bw, bh);

            ctx.restore();
          }
        }
      }
    };

    // ------------------------------------------------------------------
    // 5. Animation Loop
    // ------------------------------------------------------------------
    const loop = (currentTime: number) => {
      if (!isVisible || !isTabActive) {
        animId = requestAnimationFrame(loop);
        return;
      }

      if (prefersReducedMotion) {
        render();
        return;
      }

      const elapsed = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      accumulator += elapsed;

      while (accumulator >= FIXED_DT) {
        stepPhysics(FIXED_DT);
        accumulator -= FIXED_DT;
      }

      render();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // ------------------------------------------------------------------
    // 6. Interaction Listeners & Lifecycle Cleanup (Single Instance Guard)
    // ------------------------------------------------------------------
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (lastPointerX !== -9999) {
        pointerVx = clientX - lastPointerX;
        pointerVy = clientY - lastPointerY;
      }

      pointerX = clientX;
      pointerY = clientY;
      lastPointerX = clientX;
      lastPointerY = clientY;
    };

    const onPointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
      lastPointerX = -9999;
      lastPointerY = -9999;
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity = Math.max(-20, Math.min(20, delta));
    };

    const onResize = () => {
      setupStrands();
      if (prefersReducedMotion) render();
    };

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        lastTime = performance.now();
        accumulator = 0;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            lastTime = performance.now();
            accumulator = 0;
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Complete cleanup on unmount to prevent duplicate loops in React Strict Mode
    return () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
      }}
      className="fixed top-0 left-0 w-screen h-[170px] pointer-events-none z-20 select-none overflow-hidden"
    />
  );
}
