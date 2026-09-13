import React from 'react';
import { Shield } from 'lucide-react';
import { ViewMode } from '../types.ts';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  if (currentView === 'boot') return null;

  const navItems: { id: ViewMode; label: string }[] = [
    { id: 'about', label: 'About Arena' },
    { id: 'upload', label: 'Upload & Test' },
    { id: 'live', label: 'Confrontation Arena' },
    { id: 'results', label: 'Verification Results' },
    { id: 'product', label: 'Protected Product' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('boot')}
          className="flex items-center gap-2.5 cursor-pointer group text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-electric-blue flex items-center justify-center text-white shadow-glow-blue group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black tracking-widest text-slate-900 text-sm leading-none">
              BASTION
            </span>
            <span className="text-[9px] font-mono font-bold tracking-wider text-electric-blue">
              ARENA v3.2
            </span>
          </div>
        </button>

        <nav className="flex items-center gap-1 sm:gap-2 text-xs font-semibold text-slate-500 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-full transition font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-electric-blue bg-blue-100/80 font-black shadow-xs'
                    : 'hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
          <span className="text-[11px] font-mono font-bold text-cyber-green hidden sm:inline">
            SANDBOX ISOLATED
          </span>
        </div>
      </div>
    </header>
  );
};
