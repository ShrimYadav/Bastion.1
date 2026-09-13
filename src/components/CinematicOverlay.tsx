import React from 'react';

interface CinematicOverlayProps {
  isActive: boolean;
  shockwaveActive: boolean;
  flashActive: boolean;
  warpActive: boolean;
  sparks: { id: number; tx: number; ty: number }[];
}

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  isActive,
  shockwaveActive,
  flashActive,
  warpActive,
  sparks,
}) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 flex items-center justify-center transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-200 ${
          flashActive ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-700 via-electric-blue to-teal-accent transition-all duration-500 ${
          warpActive ? 'opacity-90' : 'opacity-0'
        }`}
      />
      <div
        className="w-56 h-56 rounded-full border-4 border-cyan-300 shadow-[0_0_90px_35px_rgba(50,149,255,0.85)] opacity-0"
        style={{
          animation: shockwaveActive
            ? 'shockwaveExpand 0.85s ease-out forwards'
            : 'none',
        }}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparks.map((s) => (
          <div
            key={s.id}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#3295FF] pointer-events-none"
            style={{
              ['--tx' as string]: `${s.tx}px`,
              ['--ty' as string]: `${s.ty}px`,
              animation: 'sparkFloat 0.9s cubic-bezier(0.1, 0.8, 0.2, 1) forwards',
            }}
          />
        ))}
      </div>
    </div>
  );
};
