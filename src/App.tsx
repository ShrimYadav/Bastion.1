import React, { useState } from 'react';
import { ViewMode, ModalState } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { BootView } from './components/BootView.tsx';
import { AboutView } from './components/AboutView.tsx';
import { UploadView } from './components/UploadView.tsx';
import { LiveArenaView } from './components/LiveArenaView.tsx';
import { ResultsView } from './components/ResultsView.tsx';
import { ProductView } from './components/ProductView.tsx';
import { CinematicOverlay } from './components/CinematicOverlay.tsx';
import { Modals } from './components/Modals.tsx';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('boot');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [warpActive, setWarpActive] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; tx: number; ty: number }[]>([]);

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
    title: '',
  });

  const triggerCinematicDive = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // 1. Generate radial sparks
    const newSparks = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * 2 * Math.PI;
      const dist = 140 + Math.random() * 180;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      newSparks.push({ id: i, tx, ty });
    }
    setSparks(newSparks);

    // 2. Shockwave and Warp timing
    setTimeout(() => {
      setWarpActive(true);
      setShockwaveActive(true);
    }, 250);

    // 3. Flash burst
    setTimeout(() => {
      setFlashActive(true);
    }, 750);

    // 4. Navigate to About view and fade out overlay
    setTimeout(() => {
      setCurrentView('about');
      setFlashActive(false);
      setWarpActive(false);

      setTimeout(() => {
        setIsTransitioning(false);
        setShockwaveActive(false);
        setSparks([]);
      }, 350);
    }, 1050);
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (type: 'audit' | 'diff' | 'summary', title: string) => {
    setModalState({
      isOpen: true,
      type,
      title,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const isBoot = currentView === 'boot';

  return (
    <div
      className={`antialiased font-sans select-none overflow-x-hidden min-h-screen relative transition-colors duration-500 ${
        isBoot ? 'bg-[#020617] text-slate-100' : 'text-slate-700 page-bg'
      }`}
    >
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <CinematicOverlay
        isActive={isTransitioning}
        shockwaveActive={shockwaveActive}
        flashActive={flashActive}
        warpActive={warpActive}
        sparks={sparks}
      />

      <main className="w-full relative min-h-screen">
        {currentView === 'boot' && (
          <BootView onEnter={triggerCinematicDive} isTransitioning={isTransitioning} />
        )}

        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}

        {currentView === 'upload' && (
          <UploadView onStartSimulation={() => handleNavigate('live')} />
        )}

        {currentView === 'live' && (
          <LiveArenaView
            onFinish={() => handleNavigate('results')}
            onOpenAuditModal={() =>
              openModal('audit', 'Autonomous Arena Attestation & Event Trail')
            }
          />
        )}

        {currentView === 'results' && (
          <ResultsView
            onNavigate={handleNavigate}
            onOpenAudit={() =>
              openModal('audit', 'Autonomous Arena Attestation & Evidence')
            }
            onOpenDiff={() => openModal('diff', 'AST Synthesized Guard Code Changes')}
          />
        )}

        {currentView === 'product' && (
          <ProductView
            onNavigate={handleNavigate}
            onOpenAudit={() =>
              openModal('audit', 'Autonomous Arena Attestation & Evidence')
            }
            onOpenSummary={() =>
              openModal('summary', 'Patch Summary & Runtime Audit #BST-8402')
            }
          />
        )}
      </main>

      <Modals modalState={modalState} onClose={closeModal} />
    </div>
  );
}
