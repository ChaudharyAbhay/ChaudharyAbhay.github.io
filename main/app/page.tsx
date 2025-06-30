'use client';
import SplitText from "./components/SplitText";
import Hyperspeed from "./components/Hyperspeed";
import ShinyText from "./components/ShinyText";
import SocialBubbles from "./components/SocialBubbles";
import TrueFocus from "./components/TrueFocus";
import VariableProximity from "./components/VariableProximity";
import CountUp from "./components/Countup";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null!);
  return (
    <main
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        position: "relative",
        background: "#000",
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "auto",
      }}>
        <SocialBubbles />
      </div>
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}>
        <Hyperspeed />
      </div>
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{
          textShadow:
            "0 4px 24px rgba(0,0,0,0.7), 0 1.5px 0 #222, 0 0.5px 0 #fff",
        }}>
          <SplitText
            text="Abhay's Vault"
            className="text-[clamp(3.5rem,10vw,6.5rem)] font-extrabold text-center text-white"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
        <div style={{ marginTop: "0.3rem" }}>
          <ShinyText
            text="Developing Development"
            className="text-[clamp(1.3rem,3vw,2.2rem)] font-semibold text-center"
          />
        </div>
        {/* Scroll Down Indicator (absolute bottom center) */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #00eaff 0%, #ff00ea 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.35rem",
              fontWeight: 700,
              letterSpacing: 1.5,
              opacity: 0.92,
              marginBottom: 2,
              textShadow: "0 2px 12px #000a",
              userSelect: "none",
            }}
          >
            Scroll Down
          </span>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8, filter: "drop-shadow(0 2px 8px #000a)" }}><path d="M6 9l6 6 6-6"/></svg>
        </motion.div>
      </div>
      {/* About Me Section */}
      <section
        ref={aboutRef}
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          marginTop: 64,
          marginBottom: 32,
          position: "relative",
          zIndex: 2,
        }}
      >
        <TrueFocus sentence="Myself Abhay" />
        <div style={{ maxWidth: 700, margin: "2.2rem auto 0", fontSize: "1.18rem", lineHeight: 1.7, textAlign: "center" }}>
          <VariableProximity
            label={"I'm an "}
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 700"
            containerRef={aboutRef}
          />
          <span style={{ display: "inline-block", fontWeight: 700, color: "#00eaff" }}>
            <CountUp to={18} />
          </span>
          <VariableProximity
            label={"-year-old learner and innovator, driven by a deep curiosity and a mission to create meaningful impact. I've explored a range of technologies—from blockchain and web development to hardware prototyping. Whether it's crafting seamless user experiences or building things that run under the hood, I love turning wild ideas into real-world solutions. I'm always up for collabs, internships, or just a good convo about the future of tech. Outside of tech, you'll find me jamming to Kishore Kumar or Arijit Singh playlists, diving into economics documentaries, or coding for fun. I'm all about balance—brains, build, and a bit of chaos."}
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 700"
            containerRef={aboutRef}
          />
        </div>
      </section>
    </main>
  );
}
