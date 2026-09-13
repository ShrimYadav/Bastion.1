import React, { useState } from 'react';
import { Check, CheckCircle2, ArrowRight, ShieldCheck, FileText, Code2, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewMode } from '../types.ts';

interface ResultsViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenAudit: () => void;
  onOpenDiff: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  onNavigate,
  onOpenAudit,
  onOpenDiff,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const cycleData = [
    {
      cycle: 'Cycle 1 (Baseline)',
      rate: '82%',
      color: '#FF3B5C',
      detail: 'Original code breached via unverified JWT token injection.',
    },
    {
      cycle: 'Cycle 2 (Post-Patch)',
      rate: '41%',
      color: '#3295FF',
      detail: 'AST-synthesized bearer token verifier dropped breach rate by 50%.',
    },
    {
      cycle: 'Cycle 3 (Mutations Survived)',
      rate: '8%',
      color: '#10B981',
      detail: 'Stress-tested with 17 mutations; 0 critical penetrations.',
    },
  ];

  return (
    <section className="pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1 rounded-full">
            CLOSED-LOOP VERIFICATION COMPLETE
          </span>
          <h2 className="text-3xl font-display font-black text-slate-900 mt-2">
            Your application got stronger.
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Discovered and neutralized 3 critical bypass vulnerabilities. All 17 dynamic attack
            mutations blocked.
          </p>
        </div>

        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-glow-green"
        >
          <div className="w-10 h-10 rounded-xl bg-cyber-green text-white flex items-center justify-center shadow-xs">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono font-bold text-emerald-800">
              Judge AI Attestation Sealed
            </div>
            <div className="text-xs font-display font-black text-emerald-700">
              ✓ DEFENSE VERIFIED (100% HEALTH)
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chart Panel: Attack Success Rate Decline (82% -> 41% -> 8%) */}
      <div className="glass-card rounded-3xl p-6 shadow-soft-card mb-6 border border-white" style={{ perspective: 1000 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-xs font-display font-black uppercase tracking-wider text-slate-700">
              Attack Success Rate Decline Across Cycles
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              Baseline attack vulnerability eliminated across closed-loop iterations
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-electric-red" /> Initial Attack (82%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-electric-blue" /> Post-Patch (41%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-green" /> Mutated Defense (8%)
            </span>
          </div>
        </div>

        <div className="relative w-full h-64 bg-slate-50/80 rounded-2xl p-4 border border-slate-200 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 720 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="resultsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF3B5C" stopOpacity="0.35" />
                <stop offset="45%" stopColor="#3295FF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="40" y1="40" x2="680" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
            <line x1="40" y1="100" x2="680" y2="100" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
            <line x1="40" y1="160" x2="680" y2="160" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />

            {/* Area Under Curve */}
            <polygon
              points="80,50 360,115 640,175 640,200 80,200"
              fill="url(#resultsGradient)"
            />

            {/* Trajectory Line */}
            <path
              d="M 80 50 C 220 55, 260 110, 360 115 C 460 120, 520 170, 640 175"
              fill="none"
              stroke="#3295FF"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Node 1: Cycle 1 */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(0)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle cx="80" cy="50" r="8" fill="#FF3B5C" stroke="#ffffff" strokeWidth="3" />
              <text
                x="80"
                y="32"
                fill="#FF3B5C"
                fontSize="14"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="900"
                textAnchor="middle"
              >
                82%
              </text>
              <text
                x="80"
                y="210"
                fill="#64748b"
                fontSize="11"
                fontFamily="'Inter', sans-serif"
                fontWeight="700"
                textAnchor="middle"
              >
                Cycle 1 (Baseline)
              </text>
            </g>

            {/* Node 2: Cycle 2 */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(1)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle cx="360" cy="115" r="8" fill="#3295FF" stroke="#ffffff" strokeWidth="3" />
              <text
                x="360"
                y="96"
                fill="#3295FF"
                fontSize="14"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="900"
                textAnchor="middle"
              >
                41%
              </text>
              <text
                x="360"
                y="210"
                fill="#64748b"
                fontSize="11"
                fontFamily="'Inter', sans-serif"
                fontWeight="700"
                textAnchor="middle"
              >
                Cycle 2 (Post-Patch)
              </text>
            </g>

            {/* Node 3: Cycle 3 */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(2)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle cx="640" cy="175" r="8" fill="#10B981" stroke="#ffffff" strokeWidth="3" />
              <text
                x="640"
                y="156"
                fill="#10B981"
                fontSize="14"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="900"
                textAnchor="middle"
              >
                8%
              </text>
              <text
                x="640"
                y="210"
                fill="#64748b"
                fontSize="11"
                fontFamily="'Inter', sans-serif"
                fontWeight="700"
                textAnchor="middle"
              >
                Cycle 3 (Mutations Survived)
              </text>
            </g>
          </svg>

          {/* Interactive Hover Info Box */}
          {hoveredPoint !== null && (
            <div className="absolute top-4 right-4 bg-white/95 border border-slate-200 rounded-xl p-3 shadow-md max-w-xs text-xs font-mono animate-fade-in">
              <div className="font-bold text-slate-800" style={{ color: cycleData[hoveredPoint].color }}>
                {cycleData[hoveredPoint].cycle}: {cycleData[hoveredPoint].rate}
              </div>
              <div className="text-slate-500 mt-1 font-sans">{cycleData[hoveredPoint].detail}</div>
            </div>
          )}
        </div>

        {/* Metric Counter Grid with 3D Tactile Lift */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono" style={{ perspective: 800 }}>
          <motion.div
            whileHover={{ y: -4, rotateX: 3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs cursor-default"
          >
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Defense Score
            </div>
            <div className="text-3xl font-black text-electric-blue mt-1 flex items-baseline gap-1">
              <span>92</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-electric-blue rounded-full w-[92%]" />
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4, rotateX: 3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs cursor-default"
          >
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Threats Neutralized
            </div>
            <div className="text-3xl font-black text-electric-red mt-1">3/3</div>
            <div className="text-[10px] text-slate-400 mt-2">Zero unmitigated paths</div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4, rotateX: 3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs cursor-default"
          >
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Patches Attested
            </div>
            <div className="text-3xl font-black text-cyber-green mt-1">100%</div>
            <div className="text-[10px] text-cyber-green mt-2 font-bold">Passed non-regression</div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4, rotateX: 3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs cursor-default"
          >
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Mutations Blocked
            </div>
            <div className="text-3xl font-black text-cyber-purple mt-1">17 / 17</div>
            <div className="text-[10px] text-cyber-purple mt-2 font-bold">4 Variant Categories</div>
          </motion.div>
        </div>
      </div>

      {/* Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={onOpenAudit}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs hover:bg-slate-50 font-mono cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>VIEW FULL EVIDENCE AUDIT</span>
          </motion.button>
          <motion.button
            type="button"
            onClick={onOpenDiff}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs hover:bg-slate-50 font-mono cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>VIEW CODE DIFF</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => onNavigate('upload')}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-700 transition font-mono flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RUN ANOTHER ARENA TEST</span>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => onNavigate('product')}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 rounded-xl bg-electric-blue hover:bg-brand-600 text-white text-xs font-bold font-display uppercase tracking-wider shadow-glow-blue flex items-center gap-2 transition cursor-pointer"
          >
            <span>Continue to Protected Product</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
