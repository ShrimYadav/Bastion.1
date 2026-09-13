import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { ModalState } from '../types.ts';

interface ModalsProps {
  modalState: ModalState;
  onClose: () => void;
}

export const Modals: React.FC<ModalsProps> = ({ modalState, onClose }) => {
  if (!modalState.isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-card max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-white space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="text-sm font-display font-black text-slate-900 uppercase">
            {modalState.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-600 max-h-80 overflow-y-auto">
          {modalState.type === 'audit' && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] leading-relaxed">
              <strong className="text-cyber-purple">
                [JUDGE AI CRYPTOGRAPHIC ATTESTATION - ARENA #84]
              </strong>
              <br />
              Artifact: aegis-commercial-banking-core.zip
              <br />
              SHA-256: 8fbc4910e5218da30129f12d8a0c441b802e21a
              <br />
              <br />
              • <strong className="text-electric-red">Phase 1:</strong> Red Agent executed token
              injection probe; discovered authorization bypass.
              <br />
              • <strong className="text-electric-blue">Phase 2:</strong> Blue Agent synthesized
              non-breaking ES512 JWT verification middleware.
              <br />
              • <strong className="text-cyber-green">Phase 3:</strong> Green Mutation generated 4
              exploit variants (IDOR, Header Injection, Proto Pollution, Smuggling).
              <br />
              • <strong className="text-electric-red">Phase 4:</strong> Red Agent re-executed all 4
              variants against the hot-patch. 0% breach rate.
              <br />
              • <strong className="text-cyber-purple">Phase 5:</strong> Judge AI circular radar scan
              attestations confirm 0 security regressions, 99.4% performance parity.
              <br />
              • <strong>Verdict:</strong> ✓ DEFENSE VERIFIED. Final Score: 92/100.
            </div>
          )}

          {modalState.type === 'diff' && (
            <div className="p-3.5 bg-slate-950 text-slate-200 rounded-xl font-mono text-[11px] leading-relaxed">
              <div className="text-slate-400 mb-2 font-sans font-bold">
                AST Synthesized Guard Changes (src/middleware/auth-guard.ts):
              </div>
              <div className="text-red-400 bg-red-950/50 px-2 py-0.5 rounded -mx-2 my-1">
                - req.userId = req.params.id; // Missing signature check
              </div>
              <div className="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded -mx-2 my-1">
                + req.userId = verifyPrincipalToken(req.headers.auth, &#123; algorithms: ['ES512'] &#125;);
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-slate-400 font-sans text-xs">
                Integrity preservation: Zero regression detected across 42 unit test suites.
              </div>
            </div>
          )}

          {modalState.type === 'summary' && (
            <div className="p-3.5 bg-slate-50 text-slate-700 rounded-xl font-mono text-[11px] space-y-2">
              <div>
                <strong>Patch ID:</strong> BST-AST-PATCH-8402
              </div>
              <div>
                <strong>Type:</strong> Non-breaking ES512 Cryptographic Auth Guard
              </div>
              <div>
                <strong>Overhead:</strong> +0.02ms (99.4% Latency Parity)
              </div>
              <div>
                <strong>Mutations Survived:</strong> 17 / 17 across 4 Categories
              </div>
              <div>
                <strong>Target Sandboxing:</strong> gVisor microVM isolated container
              </div>
              <div className="pt-2 text-cyber-green font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Judge Verdict: ✓ Cryptographically Attested
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-electric-blue text-white font-bold text-xs font-mono hover:bg-brand-600 transition cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
