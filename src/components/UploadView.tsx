import React, { useState, useRef } from 'react';
import { UploadCloud, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface UploadViewProps {
  onStartSimulation: () => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onStartSimulation }) => {
  const [selectedPackage] = useState('aegis-commercial-banking-core.zip');
  const [isHoveringDrop, setIsHoveringDrop] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt tracking for dropzone
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 160, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleDropzoneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dropzoneRef.current) return;
    const rect = dropzoneRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleDropzoneMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDropzoneClick = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="text-[10px] font-mono font-bold text-electric-blue uppercase tracking-widest bg-blue-100/80 px-3 py-0.5 rounded-full border border-blue-200">
          Arena Step 1 of 3
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 mt-1">
          Arm Your Application in Arena
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Deploy an isolated bare-metal micro-sandbox with Aegis Commercial Banking application core.
        </p>
      </motion.div>

      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 flex items-center justify-between shadow-xs"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0" />
            Loaded repository: <strong className="text-slate-900">{selectedPackage}</strong>. Ready for microVM confrontation arena.
          </span>
          <span className="text-[10px] font-mono font-bold text-cyber-green">VERIFIED</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-4">
          {/* 3D Interactive Dropzone */}
          <div style={{ perspective: 900 }}>
            <motion.div
              id="dropzone"
              ref={dropzoneRef}
              onMouseMove={handleDropzoneMouseMove}
              onMouseLeave={handleDropzoneMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              onClick={handleDropzoneClick}
              onDragOver={(e) => {
                e.preventDefault();
                setIsHoveringDrop(true);
              }}
              onDragLeave={() => setIsHoveringDrop(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsHoveringDrop(false);
                handleDropzoneClick();
              }}
              className={`glass-card border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 relative overflow-hidden group shadow-soft-card ${
                isHoveringDrop
                  ? 'border-electric-blue shadow-glow-blue bg-blue-50/40'
                  : 'border-blue-300 hover:border-electric-blue hover:shadow-glow-blue'
              }`}
            >
              <div
                style={{ transform: 'translateZ(28px)' }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-100 to-cyan-100 text-electric-blue flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform"
              >
                <UploadCloud className="w-8 h-8 stroke-[2]" />
              </div>
              <span
                style={{ transform: 'translateZ(20px)' }}
                className="mt-4 text-sm font-bold text-slate-800"
              >
                Drag &amp; drop repository or web package
              </span>
              <span
                style={{ transform: 'translateZ(14px)' }}
                className="text-xs text-slate-400 my-1 font-mono"
              >
                .zip, .tar.gz, git repository, Dockerfile
              </span>
              <div style={{ transform: 'translateZ(24px)' }}>
                <button
                  type="button"
                  className="mt-2 px-5 py-2 rounded-xl bg-electric-blue text-white text-xs font-bold shadow-xs hover:bg-brand-600 transition cursor-pointer"
                >
                  Browse Local Directory
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            className="glass-card rounded-2xl p-4 flex items-center justify-between border border-blue-200/80 shadow-soft-card"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 text-electric-blue flex items-center justify-center font-mono font-bold text-xs">
                ZIP
              </div>
              <div>
                <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span>{selectedPackage}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  245 MB • SHA-256: 8fbc4910e5218d...e21a
                </div>
              </div>
            </div>
            <span className="text-xs font-bold font-mono text-cyber-green bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Ready for Arena
            </span>
          </motion.div>

          {/* Target Architecture Breakdown with 3D Card Hover */}
          <div className="glass-card rounded-2xl p-5 shadow-soft-card" style={{ perspective: 800 }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider font-mono">
                Target Architecture Breakdown
              </div>
              <span className="text-[10px] font-mono text-cyber-green font-bold">
                4 of 4 Tiers Bound
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <motion.div
                whileHover={{ y: -4, rotateX: 4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-electric-blue block mb-1.5" />
                <div className="text-xs font-bold text-slate-800">Frontend</div>
                <div className="text-[10px] text-slate-400">Next.js 14 SSR</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, rotateX: 4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-teal-accent block mb-1.5" />
                <div className="text-xs font-bold text-slate-800">API Gateway</div>
                <div className="text-[10px] text-slate-400">Express / JWT</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, rotateX: 4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-cyber-purple block mb-1.5" />
                <div className="text-xs font-bold text-slate-800">Backend App</div>
                <div className="text-[10px] text-slate-400">Node Microservice</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, rotateX: 4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 block mb-1.5" />
                <div className="text-xs font-bold text-slate-800">Database</div>
                <div className="text-[10px] text-slate-400">PostgreSQL Pool</div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-4">
          <div className="glass-card rounded-2xl p-5 shadow-soft-card space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
              Arena Substrate Settings
            </h3>
            <motion.label
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-electric-blue/70 bg-blue-50/50 cursor-pointer shadow-xs"
            >
              <input
                type="radio"
                name="test-env"
                defaultChecked
                className="text-electric-blue focus:ring-brand-500"
              />
              <div>
                <div className="text-xs font-black text-slate-900">Isolated Bare-Metal Pod</div>
                <div className="text-[10px] text-slate-500 font-mono">
                  gVisor runtime sandbox, zero egress
                </div>
              </div>
            </motion.label>
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <div className="font-bold flex items-center gap-1.5 text-cyber-green">
                <span className="w-2 h-2 rounded-full bg-cyber-green" /> AUTHORIZED ENVIRONMENT
              </div>
              <span className="block text-[10px] font-normal text-slate-600 mt-1">
                Exploits generated by Red and Green Mutation agents remain strictly isolated inside this
                microVM.
              </span>
            </div>
          </div>

          <motion.button
            type="button"
            id="btn-start-arena"
            onClick={onStartSimulation}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 via-electric-blue to-brand-500 hover:from-brand-700 hover:to-electric-blue text-white font-display font-black text-xs tracking-wider uppercase shadow-glow-blue flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>START CONFRONTATION TEST</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
