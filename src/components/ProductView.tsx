import React, { useState } from 'react';
import { ShieldCheck, Download, FileText, CheckCircle2, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewMode } from '../types.ts';

interface ProductViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenAudit: () => void;
  onOpenSummary: () => void;
}

export const ProductView: React.FC<ProductViewProps> = ({
  onNavigate,
  onOpenAudit,
  onOpenSummary,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const triggerExportReport = () => {
    const data =
      'BASTION AUTONOMOUS CYBER DEFENSE ARENA VERIFICATION REPORT\n' +
      '=========================================================\n' +
      'Target Artifact: aegis-commercial-banking-core.zip\n' +
      'SHA-256: 8fbc4910e5218da30129f12d8a0c441b802e21a\n' +
      'Final Score: 92 / 100\n' +
      'Verdict: DEFENSE VERIFIED (100% HEALTH)\n' +
      'Threats Neutralized: 3\n' +
      'Attack Mutations Blocked: 17/17 (IDOR, Header Injection, Proto Pollution, Smuggling)\n' +
      'Performance Parity: 99.4% (Overhead: +0.02ms)\n' +
      'Attestation Code: BST-AST-PATCH-8402\n' +
      'Judge AI Signature: SEALED_BST_ARENA_84\n';

    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bastion-defense-attestation-report.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <span className="text-[10px] font-mono font-black text-electric-blue uppercase tracking-widest bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
          Production Hardened Artifact #BST-8402
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 mt-2">
          Protected Product
        </h2>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Your original application, 100% functional with empirically verified defenses.
        </p>
      </div>

      {downloaded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 flex items-center justify-between shadow-xs"
        >
          <span>✓ Downloaded: bastion-defense-attestation-report.txt</span>
          <span className="font-bold">SIGNED</span>
        </motion.div>
      )}

      {/* Transformation Visual 3D Comparative Showcase */}
      <div className="glass-card rounded-3xl p-6 shadow-soft-card mb-6 border border-white" style={{ perspective: 1000 }}>
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Pre-Bastion Baseline */}
          <motion.div
            whileHover={{ y: -4, rotateY: 3, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="md:col-span-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center"
          >
            <div className="h-32 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center p-3 shadow-inner">
              <div className="text-xs font-display font-black text-slate-800">
                Original Aegis Banking
              </div>
              <div className="text-[10px] text-electric-red font-mono font-bold mt-1">
                3 Vulnerabilities Present
              </div>
              <span className="text-[9px] text-slate-400 font-mono mt-1">
                Auth bypass • IDOR • Unsigned JWT
              </span>
            </div>
            <div className="text-xs font-bold text-slate-600 mt-2.5 font-mono">
              Pre-Bastion Baseline
            </div>
          </motion.div>

          {/* Center Shielding Process */}
          <div className="md:col-span-3 flex flex-col items-center justify-center py-3">
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-electric-blue to-teal-accent text-white flex items-center justify-center shadow-glow-blue mb-1"
            >
              <Zap className="w-6 h-6" />
            </motion.div>
            <span className="text-xs font-display font-black text-electric-blue text-center">
              Autonomous Shielding
            </span>
            <span className="text-[10px] font-mono text-slate-400">0% Behavioral Regression</span>
          </div>

          {/* Hardened Application with 3D Depth */}
          <motion.div
            whileHover={{ y: -4, rotateY: -3, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="md:col-span-4 p-5 rounded-2xl bg-emerald-50/60 border-2 border-emerald-300 text-center relative overflow-hidden shadow-glow-green"
          >
            <div className="h-32 rounded-xl bg-white border border-emerald-200 flex flex-col items-center justify-center p-3 shadow-md relative">
              <div className="text-xs font-display font-black text-slate-900 flex items-center gap-1.5 justify-center">
                <span>Protected Application</span>
                <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
              </div>
              <div className="text-[10px] text-cyber-green font-mono font-bold mt-1">
                Zero Vulnerabilities Remaining
              </div>
              <span className="text-[9px] text-slate-500 font-mono mt-1">
                ES512 Verification • Strict Guard
              </span>
            </div>
            <div className="text-xs font-display font-black text-emerald-800 mt-2.5 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hardened Runtime Ready</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Code Diff Inspector & Preserved Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          className="lg:col-span-7 glass-card rounded-2xl p-5 shadow-soft-card"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-display font-black uppercase tracking-wider text-slate-600">
              Synthesized Defense Diff
            </h3>
            <span className="text-[10px] font-mono text-electric-blue font-bold">
              src/middleware/auth-guard.ts
            </span>
          </div>
          <div className="rounded-xl bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto shadow-inner">
            <div className="text-slate-500">// Aegis Banking MicroVM AST Hot-Patch</div>
            <div className="text-red-400 bg-red-950/50 px-2 py-0.5 rounded -mx-2 my-1">
              - const decoded = jwt.decode(req.headers.authorization); // VULNERABILITY: UNVERIFIED BYPASS
            </div>
            <div className="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded -mx-2 my-1">
              + const token = verifyBearerToken(req.headers.authorization, JWT_SECRET, &#123; algorithms: ['ES512'] &#125;);
            </div>
            <div className="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded -mx-2 my-1">
              + if (!token || token.scope !== 'banking:transfer') return res.status(401).json(&#123; error: 'E_UNAUTHORIZED' &#125;);
            </div>
            <div className="text-slate-300 mt-1">
              &nbsp;&nbsp;req.authenticatedPrincipal = Object.freeze(token.principal);
            </div>
            <div className="text-slate-300">&nbsp;&nbsp;return next();</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          className="lg:col-span-5 glass-card rounded-2xl p-5 shadow-soft-card"
        >
          <h3 className="text-xs font-display font-black uppercase tracking-wider text-slate-600 mb-3">
            Architecture Preserved
          </h3>
          <div className="space-y-2 text-xs font-semibold font-mono">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span>Frontend UI Pages</span>
              <span className="text-cyber-green font-bold">✓ 100% Unchanged</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span>REST &amp; GraphQL Endpoints</span>
              <span className="text-cyber-green font-bold">✓ Zero Breaking Changes</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span>Authentication Schema</span>
              <span className="text-cyber-green font-bold">✓ Upgraded to ES512</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span>Database Storage Pool</span>
              <span className="text-cyber-green font-bold">✓ Preserved</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-3 text-center font-mono">
            <div className="p-2.5 rounded-xl bg-emerald-50">
              <div className="text-[10px] text-emerald-700 font-bold">SYSTEM HEALTH</div>
              <div className="text-sm font-black text-emerald-800">99.4% Latency Parity</div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50">
              <div className="text-[10px] text-electric-blue font-bold">DEPLOY STATUS</div>
              <div className="text-sm font-black text-brand-700">VERIFIED SAFE</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={onOpenSummary}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 font-mono cursor-pointer"
          >
            VIEW AUDIT METRICS
          </motion.button>
          <motion.button
            type="button"
            onClick={onOpenAudit}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 font-mono cursor-pointer"
          >
            VIEW EVIDENCE TRACE
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => onNavigate('upload')}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-700 transition font-mono cursor-pointer"
          >
            RUN ANOTHER TEST
          </motion.button>
          <motion.button
            type="button"
            onClick={triggerExportReport}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 rounded-xl bg-electric-blue hover:bg-brand-600 text-white text-xs font-bold font-display uppercase tracking-wider shadow-glow-blue transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT VERIFIED ARTIFACT REPORT</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
