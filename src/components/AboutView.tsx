import React, { useRef } from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ViewMode } from '../types.ts';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const comparisonRef = useRef<HTMLDivElement>(null);
  const shieldCardRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt tracking for the 3D Holographic Shield Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 24, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);

  const handleShieldMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shieldCardRef.current) return;
    const rect = shieldCardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleShieldMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToCompare = () => {
    comparisonRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-4"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-electric-blue bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200 font-mono">
            Closed-Loop Autonomous Verification Arena
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
            ATTACK.
            <br />
            DEFEND.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-blue via-teal-accent to-cyber-purple">
              EVOLVE.
            </span>
          </h2>
          <p className="text-sm text-slate-600 max-w-lg leading-relaxed">
            BASTION tests your application by continuously attacking, fixing, mutating attack
            variations, and independently attesting defenses inside an isolated sandbox before any code
            reaches production.
          </p>

          {/* Closed Loop Flow Formula with 3D tactile lift */}
          <motion.div
            whileHover={{ scale: 1.01, y: -1 }}
            className="p-3.5 rounded-2xl bg-white/95 border border-blue-200 text-xs font-mono font-bold text-slate-700 shadow-xs flex flex-wrap items-center gap-1.5 leading-normal"
          >
            <span className="text-electric-red">RED ATTACK</span> ➔{' '}
            <span className="text-slate-800">BREACH</span> ➔{' '}
            <span className="text-electric-blue">BLUE DEFEND</span> ➔{' '}
            <span className="text-brand-600">PATCH</span> ➔{' '}
            <span className="text-cyber-green">GREEN MUTATES</span> ➔{' '}
            <span className="text-electric-red">RE-ATTACK</span> ➔{' '}
            <span className="text-cyber-purple">JUDGE VERIFIES</span>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.button
              type="button"
              onClick={() => onNavigate('upload')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl bg-electric-blue hover:bg-brand-600 text-white text-xs font-bold font-display uppercase tracking-wider shadow-glow-blue flex items-center gap-2 transition cursor-pointer"
            >
              <span>Enter Cyber Arena</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
            <motion.button
              type="button"
              onClick={scrollToCompare}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-3 rounded-xl border border-slate-300 bg-white/80 text-slate-700 text-xs font-bold transition hover:bg-slate-50 cursor-pointer shadow-2xs"
            >
              Compare Closed-Loop vs Traditional
            </motion.button>
          </div>
        </motion.div>

        {/* Floating 3D Holographic Security Shield Geometry Card with Real Parallax Depth */}
        <div className="lg:col-span-5 flex justify-center" style={{ perspective: 1000 }}>
          <motion.div
            ref={shieldCardRef}
            onMouseMove={handleShieldMouseMove}
            onMouseLeave={handleShieldMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="glass-card w-full max-w-sm rounded-3xl p-6 shadow-soft-card border border-white relative cursor-pointer"
          >
            <div
              style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
              className="h-72 w-full rounded-2xl bg-gradient-to-br from-blue-50/90 via-white to-cyan-50/80 border border-blue-100 flex flex-col items-center justify-center relative overflow-hidden py-6"
            >
              {/* Rotating background orbital rings at negative depth */}
              <div
                style={{ transform: 'translateZ(-15px)' }}
                className="absolute w-60 h-60 rounded-full border border-dashed border-blue-400/40 anim-spin-outer pointer-events-none"
              />
              <div
                style={{ transform: 'translateZ(-10px)' }}
                className="absolute w-44 h-44 rounded-full border border-teal-accent/50 anim-spin-segmented pointer-events-none"
              />

              {/* Parallax Layered Shield Nodes floating at distinct 3D elevations */}
              <div
                style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
                className="relative z-10 flex flex-col items-center space-y-2.5 transform -rotate-3"
              >
                {/* 1. Judge AI Scan */}
                <motion.div
                  style={{ transform: 'translateZ(45px)' }}
                  whileHover={{ x: 4, scale: 1.04 }}
                  className="w-48 py-1.5 px-3 rounded-xl bg-purple-500/15 backdrop-blur-xs border border-purple-400/50 text-cyber-purple text-[10px] font-bold flex items-center justify-between font-mono shadow-xs"
                >
                  <span>1. JUDGE AI SCAN</span>
                  <span className="w-2 h-2 rounded-full bg-cyber-purple animate-pulse" />
                </motion.div>

                {/* 2. Blue Shield Guard */}
                <motion.div
                  style={{ transform: 'translateZ(35px)' }}
                  whileHover={{ x: 4, scale: 1.04 }}
                  className="w-52 py-2 px-3.5 rounded-xl bg-blue-500/15 backdrop-blur-xs border border-blue-400/50 text-brand-700 text-[10px] font-bold flex items-center justify-between font-mono shadow-xs"
                >
                  <span>2. BLUE SHIELD GUARD</span>
                  <span className="w-2 h-2 rounded-full bg-electric-blue" />
                </motion.div>

                {/* 3. Green 4-Way Mutation */}
                <motion.div
                  style={{ transform: 'translateZ(25px)' }}
                  whileHover={{ x: 4, scale: 1.04 }}
                  className="w-56 py-2.5 px-4 rounded-xl bg-teal-accent/20 backdrop-blur-xs border border-teal-accent/60 text-emerald-800 text-[11px] font-black flex items-center justify-between shadow-md font-mono"
                >
                  <span>3. GREEN 4-WAY MUTATION</span>
                  <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
                </motion.div>

                {/* 4. Red Autonomous Vector */}
                <motion.div
                  style={{ transform: 'translateZ(15px)' }}
                  whileHover={{ x: 4, scale: 1.04 }}
                  className="w-48 py-1.5 px-3 rounded-xl bg-red-500/15 backdrop-blur-xs border border-red-400/50 text-electric-red text-[10px] font-bold flex items-center justify-between font-mono shadow-xs"
                >
                  <span>4. RED AUTONOMOUS VECTOR</span>
                  <span className="w-2 h-2 rounded-full bg-electric-red" />
                </motion.div>
              </div>

              <div
                style={{ transform: 'translateZ(30px)' }}
                className="absolute bottom-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold bg-white/90 px-3 py-0.5 rounded-full border border-slate-200 shadow-2xs"
              >
                Multi-Layer Active Defense
              </div>
            </div>

            <div
              style={{ transform: 'translateZ(15px)' }}
              className="mt-4 flex items-center justify-between text-xs text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyber-green" /> Autonomous Attestation
              </span>
              <span className="font-mono font-bold text-electric-blue">4.2 ms Sandbox Latency</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Comparison Section: Traditional vs Closed Loop Arena with 3D Hover Lift */}
      <div className="mt-14" ref={comparisonRef}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 font-mono">
            Why BASTION is Fundamentally Different
          </h3>
          <span className="text-[11px] text-electric-blue font-bold font-mono">
            Static Scans vs Closed-Loop Empirical Arena
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5" style={{ perspective: 1000 }}>
          {/* Traditional Card */}
          <motion.div
            whileHover={{ y: -4, rotateX: 2, rotateY: -1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="md:col-span-4 glass-card rounded-2xl p-5 shadow-soft-card flex flex-col justify-between border border-slate-200/80"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Traditional Security Tools
                </h4>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded">
                  Linear &amp; Fragile
                </span>
              </div>
              <div className="space-y-2 text-xs font-semibold text-slate-600">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <span className="text-slate-400 font-mono">1.</span> SCAN: RegEx and static signature matching
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <span className="text-slate-400 font-mono">2.</span> REPORT: Dumps 200+ unverified alert tickets
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <span className="text-slate-400 font-mono">3.</span> SUGGEST: Produces hypothetical diff suggestions
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <span className="text-slate-400 font-mono">4.</span> STOP: Zero empirical re-testing against mutations
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-electric-red font-medium flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-electric-red shrink-0" />
              High false positives. No real runtime verification.
            </div>
          </motion.div>

          {/* BASTION Closed-Loop Card */}
          <motion.div
            whileHover={{ y: -4, rotateX: 2, rotateY: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="md:col-span-8 glass-card rounded-2xl p-5 shadow-soft-card border-2 border-electric-blue/40 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-black text-electric-blue uppercase tracking-wider font-mono">
                BASTION Closed-Loop Cyber Arena
              </h4>
              <span className="text-[10px] font-mono text-cyber-green font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Empirically Verified
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-bold text-slate-700 mb-4">
              <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-xl bg-red-50/70 border border-red-200 shadow-2xs">
                <span className="text-[10px] text-electric-red font-mono">Step 1 • RED</span>
                <div className="font-bold text-slate-800 mt-1">Autonomous Exploitation</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 shadow-2xs">
                <span className="text-[10px] text-electric-blue font-mono">Step 2 • BLUE</span>
                <div className="font-bold text-slate-800 mt-1">AST Patch Synthesis</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-2xs">
                <span className="text-[10px] text-cyber-green font-mono">Step 3 • GREEN</span>
                <div className="font-bold text-slate-800 mt-1">4 Attack Mutations</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 shadow-2xs">
                <span className="text-[10px] text-cyber-purple font-mono">Step 4 • JUDGE</span>
                <div className="font-bold text-slate-800 mt-1">Radar Attestation</div>
              </motion.div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/60 text-xs text-slate-600 leading-relaxed border border-blue-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">The Closed-Loop Rule:</strong> A defense is never
                considered verified until Green Mutation generates 4 distinct vector branches (IDOR,
                header injection, prototype pollution, HTTP smuggling), feeds them back to Red Agent, and
                Judge AI confirms 0% breach rate.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
