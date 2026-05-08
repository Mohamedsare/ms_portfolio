"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
};

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + 1,
    speedX: Math.random() * 3 - 1.5,
    speedY: Math.random() * 3 - 1.5,
    color: `rgba(108, 99, 255, ${Math.random() * 0.6 + 0.1})`,
  };
}

/**
 * Réseau de particules du hero (équivalent ancien bloc dans main.js).
 * En React, l’init doit être dans useEffect : main.js s’exécutait trop tôt pour Next.js.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const surface = canvasRef.current;
    if (!surface) return;
    /** Référence figée pour le closure TypeScript (Particle). */
    const cvs = surface;
    const rawCtx = cvs.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    let rafId = 0;

    const resize = () => {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle(cvs.width, cvs.height));
    }

    function animateParticles() {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > cvs.width) p.speedX *= -1;
        if (p.y < 0 || p.y > cvs.height) p.speedY *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(108, 99, 255, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(animateParticles);
    }

    animateParticles();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      id="particles-js"
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none"
    />
  );
}
