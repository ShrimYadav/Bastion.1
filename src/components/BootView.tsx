import React, { useRef } from 'react';
import { Shield } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface BootViewProps {
  onEnter: () => void;
  isTransitioning: boolean;
}

export const BootView: React.FC<BootViewProps> = ({ onEnter, isTransitioning }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics-based damped springs for buttery smooth 60/120fps motion without React re-render thrashing
  const springConfig = { damping: 22, stiffness: 140, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-35, 35]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-35, 35]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTransitioning || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white flex flex-col justify-between items-center px-4 py-6 sm:py-8 overflow-hidden select-none">
      {/* Subtle background ambient radial cyan glow & particle flares */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(2,20,50,0.85)_0%,_rgba(2,6,23,1)_70%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Top Ambient Flare Rays */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between px-2 sm:px-6 pt-1">
        {/* Left: Shield Icon + BASTION */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-2.5 group cursor-default"
        >
          <div className="relative flex items-center justify-center">
            <Shield className="w-5 h-5 text-cyan-400 fill-cyan-400/20 stroke-[2.2] drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
          </div>
          <span className="font-display font-black tracking-widest text-white text-base sm:text-lg">
            BASTION
          </span>
        </motion.div>

        {/* Right: AUTONOMOUS CYBER DEFENSE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.2em] sm:tracking-[0.25em] text-cyan-200/70 uppercase"
        >
          AUTONOMOUS CYBER DEFENSE
        </motion.div>
      </header>

      {/* Main Center Stage: Reactor & Agent Status */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-md my-auto text-center px-2">
        {/* Smooth 3D Floating & Tilt Container */}
        <motion.div
          animate={
            isTransitioning
              ? { scale: 1.8, opacity: 0, filter: 'blur(10px)' }
              : { y: [0, -5, 0] }
          }
          transition={
            isTransitioning
              ? { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
              : { repeat: Infinity, duration: 5, ease: 'easeInOut' }
          }
          style={{ perspective: 1000 }}
          className="relative flex items-center justify-center"
        >
          {/* Circular Arc Reactor with Real Layered 3D Depth */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onEnter}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            title="Click to Activate BASTION"
            className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center cursor-pointer group select-none"
          >
            {/* Dynamic Volumetric Radial Light Flare (moves with mouse parallax) */}
            <motion.div
              style={{
                x: glowX,
                y: glowY,
                transform: 'translateZ(-30px)',
              }}
              className="absolute -inset-10 rounded-full bg-cyan-500/25 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:bg-cyan-400/35"
            />
            <div
              style={{ transform: 'translateZ(-15px)' }}
              className="absolute -inset-4 rounded-full bg-blue-600/20 blur-2xl pointer-events-none"
            />

            {/* Central Reactor Housing with Smooth 3D Depth */}
            <div
              style={{ transform: 'translateZ(0px)' }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_55px_rgba(0,180,255,0.45)] border border-cyan-400/30 bg-[#030d22]"
            >
              <img
                src="/bastion-core.jpg"
                alt="BASTION Autonomous Arc Reactor Core"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ${
                  isTransitioning ? 'scale-125 brightness-150' : 'group-hover:scale-105 brightness-105'
                }`}
              />

              {/* Glowing Internal Radial Vignette Overlay for Depth */}
              <div className="absolute inset-0 rounded-full bg-radial from-transparent via-transparent to-[#020617]/85 pointer-events-none" />

              {/* Layer 2: Rotating Outer Reticle HUD (floating forward) */}
              <div
                style={{ transform: 'translateZ(25px)' }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <svg
                  className="w-full h-full opacity-45 mix-blend-screen anim-spin-outer"
                  viewBox="0 0 320 320"
                >
                  <circle
                    cx="160"
                    cy="160"
                    r="150"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="18 12 4 12"
                  />
                  <line x1="160" y1="6" x2="160" y2="18" stroke="#00f0ff" strokeWidth="2" />
                  <line x1="160" y1="302" x2="160" y2="314" stroke="#00f0ff" strokeWidth="2" />
                  <line x1="6" y1="160" x2="18" y2="160" stroke="#00f0ff" strokeWidth="2" />
                  <line x1="302" y1="160" x2="314" y2="160" stroke="#00f0ff" strokeWidth="2" />
                </svg>
              </div>

              {/* Layer 3: Counter-rotating Inner Segmented Gauge (floating forward) */}
              <div
                style={{ transform: 'translateZ(35px)' }}
                className="absolute inset-4 pointer-events-none flex items-center justify-center"
              >
                <svg
                  className="w-full h-full opacity-35 mix-blend-screen anim-spin-segmented"
                  viewBox="0 0 280 280"
                >
                  <circle
                    cx="140"
                    cy="140"
                    r="120"
                    fill="none"
                    stroke="#00e5ff"
                    strokeWidth="1.2"
                    strokeDasharray="3 10"
                  />
                </svg>
              </div>

              {/* Layer 4: Center Pulsing Singularity Beacon (highest 3D depth) */}
              <motion.div
                style={{ transform: 'translateZ(50px)' }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                className="absolute w-12 h-12 rounded-full bg-cyan-100/90 blur-[1px] shadow-[0_0_35px_#00f0ff,0_0_60px_#38bdf8] flex items-center justify-center pointer-events-none"
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_16px_#ffffff]" />
              </motion.div>
            </div>

            {/* Orbiting Quantum Markers with Elevation */}
            <div
              style={{ transform: 'translateZ(30px)' }}
              className="absolute inset-0 rounded-full pointer-events-none"
            >
              <span className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] animate-ping" />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
            </div>
          </motion.div>
        </motion.div>

        {/* Title: BASTION */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-3xl sm:text-4xl font-display font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        >
          BASTION
        </motion.h1>

        {/* Subtitle: AUTONOMOUS CYBER DEFENSE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-1 text-xs sm:text-sm font-semibold tracking-[0.25em] text-slate-300 uppercase"
        >
          AUTONOMOUS CYBER DEFENSE
        </motion.p>

        {/* Status Prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-xs font-mono text-cyan-200/70 flex items-center justify-center gap-1.5"
        >
          <span>Initializing security system</span>
          <span className="inline-flex space-x-0.5">
            <span className="animate-pulse">.</span>
            <span className="animate-pulse delay-100">.</span>
            <span className="animate-pulse delay-200">.</span>
          </span>
        </motion.p>

        {/* Agent Online Checklist with Subtle Stagger & Hover Elevation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-5 w-full max-w-[280px] space-y-2.5 text-xs font-mono"
        >
          {/* Red Agent */}
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-between px-2 py-0.5 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              <span className="text-slate-200 font-medium">Red Agent</span>
            </div>
            <span className="text-cyan-400 font-bold tracking-wider drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]">
              ONLINE
            </span>
          </motion.div>

          {/* Blue Agent */}
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-between px-2 py-0.5 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              <span className="text-slate-200 font-medium">Blue Agent</span>
            </div>
            <span className="text-cyan-400 font-bold tracking-wider drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]">
              ONLINE
            </span>
          </motion.div>

          {/* Green Mutation */}
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-between px-2 py-0.5 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
              <span className="text-slate-200 font-medium">Green Mutation</span>
            </div>
            <span className="text-cyan-400 font-bold tracking-wider drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]">
              ONLINE
            </span>
          </motion.div>

          {/* Judge AI */}
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-between px-2 py-0.5 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-slate-200 font-medium">Judge AI</span>
            </div>
            <span className="text-cyan-400 font-bold tracking-wider drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]">
              ONLINE
            </span>
          </motion.div>
        </motion.div>

        {/* Tactile 3D Action Button: SYSTEM STATUS: READY */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-7 flex flex-col items-center"
        >
          <motion.button
            type="button"
            id="btn-system-ready"
            disabled={isTransitioning}
            onClick={onEnter}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="group relative px-7 py-2.5 rounded-full bg-[#051f2e]/90 hover:bg-[#082a3f] border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-mono font-bold tracking-[0.2em] uppercase shadow-[0_0_18px_rgba(6,182,212,0.35)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] cursor-pointer overflow-hidden"
          >
            {/* Specular gloss shimmer highlight */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-cyan-500/80 group-hover:text-cyan-400 transition-colors">—</span>
              <span>SYSTEM STATUS: READY</span>
              <span className="text-cyan-500/80 group-hover:text-cyan-400 transition-colors">—</span>
            </span>
          </motion.button>
          <span className="mt-2 text-[10px] font-mono text-cyan-400/50 tracking-wider">
            Click to enter arena
          </span>
        </motion.div>
      </main>

      {/* Subtle bottom telemetry signature */}
      <footer className="relative z-10 text-[10px] font-mono text-slate-500 tracking-wider pt-2">
        BASTION EMPIRICAL VERIFICATION KERNEL • v3.2.4
      </footer>
    </div>
  );
};

