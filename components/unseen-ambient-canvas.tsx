"use client";

import { useEffect, useRef } from "react";

export function UnseenAmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Warm luminous caustics and floating dust motes matching Unseen 3D scene
    let t = 0;
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedY: Math.random() * 0.25 + 0.08,
      opacity: Math.random() * 0.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      t += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Base solid warm alabaster clay matching unseen.co #efded9
      ctx.fillStyle = "#efded9";
      ctx.fillRect(0, 0, width, height);

      // Soft architectural light caustics
      const caustic = ctx.createRadialGradient(
        width * 0.5 + Math.sin(t * 0.5) * 60,
        height * 0.45 + Math.cos(t * 0.3) * 50,
        40,
        width * 0.5,
        height * 0.5,
        width * 0.65
      );
      caustic.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      caustic.addColorStop(0.5, "rgba(247, 237, 232, 0.15)");
      caustic.addColorStop(1, "rgba(239, 222, 217, 0)");
      ctx.fillStyle = caustic;
      ctx.fillRect(0, 0, width, height);

      // Subtle floating micro-motes
      ctx.fillStyle = "#ffffff";
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = height;
        p.x += Math.sin(t + p.phase) * 0.2;

        ctx.globalAlpha = p.opacity * (0.5 + Math.sin(t * 1.5 + p.phase) * 0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="unseen-hero-canvas" />;
}
