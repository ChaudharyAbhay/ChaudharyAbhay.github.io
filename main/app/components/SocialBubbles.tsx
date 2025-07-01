import React, { useEffect, useRef } from "react";
import Image from "next/image";
import githubIcon from "./social-icons/github.svg";
import instagramIcon from "./social-icons/instagram.svg";
import twitterIcon from "./social-icons/twitter.svg";
import discordIcon from "./social-icons/discord.svg";


const SOCIALS = [
  {
    name: "GitHub",
    url: "https://github.com/abhaythe1",
    icon: githubIcon,
    color: "#181717",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/abhaythe1",
    icon: instagramIcon,
    color: "#E1306C",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/abhaythe1",
    icon: twitterIcon,
    color: "#000000",
  },
  {
    name: "Discord",
    url: "https://discord.com/users/abhaythe1",
    icon: discordIcon,
    color: "#5865F2",
  },
];

const BUBBLE_SIZE = 56;
const BUBBLE_COUNT = SOCIALS.length;
const BUBBLE_AREA_HEIGHT = 0.35; // 35% of the viewport height

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const SocialBubbles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const velocities = useRef(
    Array.from({ length: BUBBLE_COUNT }, () => ({
      x: getRandom(-1.5, 1.5),
      y: getRandom(-1.5, 1.5),
    }))
  );

  useEffect(() => {
    const animate = () => {
      const container = containerRef.current;
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight * BUBBLE_AREA_HEIGHT;
      // Move and bounce off walls
      bubblesRef.current.forEach((bubble, i) => {
        if (!bubble) return;
        let left = parseFloat(bubble.style.left || "0");
        let top = parseFloat(bubble.style.top || "0");
        const v = velocities.current[i];
        left += v.x;
        top += v.y;
        // Bounce off walls (top area only)
        if (left <= 0 || left >= width - BUBBLE_SIZE) v.x *= -1;
        if (top <= 0 || top >= height - BUBBLE_SIZE) v.y *= -1;
        left = Math.max(0, Math.min(left, width - BUBBLE_SIZE));
        top = Math.max(0, Math.min(top, height - BUBBLE_SIZE));
        bubble.style.left = `${left}px`;
        bubble.style.top = `${top}px`;
      });
      // Collision detection and response
      for (let i = 0; i < bubblesRef.current.length; i++) {
        const a = bubblesRef.current[i];
        if (!a) continue;
        const ax = parseFloat(a.style.left || "0") + BUBBLE_SIZE / 2;
        const ay = parseFloat(a.style.top || "0") + BUBBLE_SIZE / 2;
        for (let j = i + 1; j < bubblesRef.current.length; j++) {
          const b = bubblesRef.current[j];
          if (!b) continue;
          const bx = parseFloat(b.style.left || "0") + BUBBLE_SIZE / 2;
          const by = parseFloat(b.style.top || "0") + BUBBLE_SIZE / 2;
          const dx = bx - ax;
          const dy = by - ay;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < BUBBLE_SIZE) {
            // Simple elastic collision: swap velocities
            const va = velocities.current[i];
            const vb = velocities.current[j];
            // Normalize direction
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            // Push bubbles apart
            const overlap = BUBBLE_SIZE - dist;
            a.style.left = `${parseFloat(a.style.left || "0") - nx * overlap / 2}px`;
            a.style.top = `${parseFloat(a.style.top || "0") - ny * overlap / 2}px`;
            b.style.left = `${parseFloat(b.style.left || "0") + nx * overlap / 2}px`;
            b.style.top = `${parseFloat(b.style.top || "0") + ny * overlap / 2}px`;
            // Reflect velocities along the collision normal
            const vDotN_a = va.x * nx + va.y * ny;
            const vDotN_b = vb.x * nx + vb.y * ny;
            va.x = va.x - vDotN_a * nx + vDotN_b * nx;
            va.y = va.y - vDotN_a * ny + vDotN_b * ny;
            vb.x = vb.x - vDotN_b * nx + vDotN_a * nx;
            vb.y = vb.y - vDotN_b * ny + vDotN_a * ny;
          }
        }
      }
      requestAnimationFrame(animate);
    };
    // Initialize random positions
    const container = containerRef.current;
    if (container) {
      const width = container.offsetWidth;
      const height = container.offsetHeight * BUBBLE_AREA_HEIGHT;
      bubblesRef.current.forEach((bubble) => {
        if (!bubble) return;
        bubble.style.left = `${getRandom(0, width - BUBBLE_SIZE)}px`;
        bubble.style.top = `${getRandom(0, height - BUBBLE_SIZE)}px`;
      });
    }
    animate();

  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {SOCIALS.map((social, i) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          ref={el => { bubblesRef.current[i] = el; }}
          style={{
            position: "absolute",
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            borderRadius: "50%",
            background:
              social.name === "GitHub" || social.name === "Twitter"
                ? "#fff"
                : "rgba(255,255,255,0.08)",
            boxShadow: `0 2px 16px 0 ${social.color}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
            cursor: "pointer",
            transition: "box-shadow 0.2s, transform 0.2s",
            willChange: "transform",
          }}
          aria-label={social.name}
          tabIndex={0}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.13)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Image
            src={social.icon}
            alt={social.name}
            width={32}
            height={32}
            style={{ opacity: social.name === "GitHub" || social.name === "Twitter" ? 1 : 0.7 }}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialBubbles; 