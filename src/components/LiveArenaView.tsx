import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ConfrontationStep, LogEntry, ViewMode } from '../types.ts';

interface LiveArenaViewProps {
  onFinish: () => void;
  onOpenAuditModal: () => void;
}

export const LiveArenaView: React.FC<LiveArenaViewProps> = ({ onFinish, onOpenAuditModal }) => {
  const [currentStep, setCurrentStep] = useState<ConfrontationStep>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timerMs, setTimerMs] = useState(14280);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'log-1',
      timestamp: '14:02:11',
      agent: 'Red Agent',
      colorClass: 'bg-electric-red',
      textColorClass: 'text-electric-red',
      title: 'Red Agent',
      description: 'Initiating API probe targeting /api/v1/auth/callback',
    },
  ]);

  const stepRef = useRef(currentStep);
  stepRef.current = currentStep;

  // Timer counter
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimerMs((prev) => prev + 67);
    }, 67);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTimer = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const remainderMs = ms % 1000;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(
      remainderMs
    ).padStart(3, '0')}`;
  };

  const addLog = (
    time: string,
    colorClass: string,
    textColorClass: string,
    title: string,
    desc: string
  ) => {
    setLogs((prev) => [
      {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: time,
        agent: title,
        colorClass,
        textColorClass,
        title,
        description: desc,
      },
      ...prev,
    ]);
  };

  // Step progression logic
  useEffect(() => {
    if (!isPlaying) return;

    const timeout = setTimeout(() => {
      if (currentStep === 1) {
        setCurrentStep(2);
        addLog(
          '14:02:13',
          'bg-electric-red',
          'text-electric-red',
          'BREACH CONFIRMED',
          'Target API accepts signature-less authorization headers.'
        );
      } else if (currentStep === 2) {
        setCurrentStep(3);
        addLog(
          '14:02:16',
          'bg-electric-blue',
          'text-electric-blue',
          'Blue Agent',
          'Synthesized AST Bearer Token verification guard.'
        );
      } else if (currentStep === 3) {
        setCurrentStep(4);
        addLog(
          '14:02:18',
          'bg-cyber-green',
          'text-cyber-green',
          'Defense Hardened',
          'Baseline attack vector successfully deflected.'
        );
      } else if (currentStep === 4) {
        setCurrentStep(5);
        addLog(
          '14:02:20',
          'bg-teal-accent',
          'text-teal-accent',
          'Green Mutation',
          'Constructed 4 test variations: IDOR, Header Injection, Proto Pollution, HTTP Smuggling.'
        );
      } else if (currentStep === 5) {
        setCurrentStep(6);
        addLog(
          '14:02:22',
          'bg-electric-red',
          'text-electric-red',
          'Red Re-Attack',
          'Fired all 4 variations against the Blue defense barrier. 0% Penetration.'
        );
      } else if (currentStep === 6) {
        setCurrentStep(7);
        addLog(
          '14:02:24',
          'bg-cyber-purple',
          'text-cyber-purple',
          'Judge AI',
          'Attestation sealed: 100% verified defense. Proceeding to results.'
        );
      } else if (currentStep === 7) {
        const finishTimeout = setTimeout(() => {
          onFinish();
        }, 2400);
        return () => clearTimeout(finishTimeout);
      }
    }, currentStep === 1 ? 1800 : currentStep === 7 ? 2400 : 2000);

    return () => clearTimeout(timeout);
  }, [currentStep, isPlaying, onFinish]);

  const restartSimulation = () => {
    setCurrentStep(1);
    setIsPlaying(true);
    setTimerMs(14280);
    setLogs([
      {
        id: 'log-1',
        timestamp: '14:02:11',
        agent: 'Red Agent',
        colorClass: 'bg-electric-red',
        textColorClass: 'text-electric-red',
        title: 'Red Agent',
        description: 'Initiating API probe targeting /api/v1/auth/callback',
      },
    ]);
  };

  // Dynamic visual states based on currentStep
  const isBreached = currentStep === 2;
  const isPatching = currentStep === 3;
  const isPatched = currentStep >= 4;
  const isMutating = currentStep >= 5;
  const isReAttacking = currentStep === 6;
  const isJudgeScanning = currentStep === 7;

  // Aegis API Gateway Slice appearance
  let apiSliceClass =
    'w-40 h-11 rounded-2xl bg-gradient-to-r from-slate-700 to-indigo-800 shadow-lg border-t border-white/50 -mb-3.5 transform -skew-y-6 flex items-center justify-between px-3.5 text-white text-[10px] font-mono font-bold transition-all duration-300';
  let apiBadgeClass = 'w-2 h-2 rounded-full bg-cyan-300';

  if (isBreached) {
    apiSliceClass =
      'w-40 h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 shadow-glow-red border-t border-white -mb-3.5 transform -skew-y-6 flex items-center justify-between px-3.5 text-white text-[10px] font-mono font-bold transition-all duration-300 animate-pulse';
    apiBadgeClass = 'w-2 h-2 rounded-full bg-white animate-ping';
  } else if (isPatching) {
    apiSliceClass =
      'w-40 h-11 rounded-2xl bg-gradient-to-r from-electric-blue to-brand-700 shadow-glow-blue border-t border-white -mb-3.5 transform -skew-y-6 flex items-center justify-between px-3.5 text-white text-[10px] font-mono font-bold transition-all duration-300';
    apiBadgeClass = 'w-2 h-2 rounded-full bg-white animate-pulse';
  } else if (isPatched) {
    apiSliceClass =
      'w-40 h-11 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-accent shadow-glow-green border-t border-white -mb-3.5 transform -skew-y-6 flex items-center justify-between px-3.5 text-white text-[10px] font-mono font-bold transition-all duration-300';
    apiBadgeClass = 'w-2 h-2 rounded-full bg-white';
  }

  // Security Shield Bubble appearance
  let shieldBubbleClass =
    'absolute w-60 h-60 rounded-full border-2 border-brand-300/40 shadow-[0_0_20px_rgba(50,149,255,0.15)] transition-all duration-700';
  if (isBreached) {
    shieldBubbleClass =
      'absolute w-60 h-60 rounded-full border-2 border-electric-red shadow-glow-red transition-all duration-500';
  } else if (isPatching) {
    shieldBubbleClass =
      'absolute w-60 h-60 rounded-full border-2 border-electric-blue shadow-glow-blue transition-all duration-500';
  } else if (isPatched) {
    shieldBubbleClass =
      'absolute w-60 h-60 rounded-full border-2 border-cyber-green shadow-glow-green transition-all duration-500';
  }

  // Badge label and dot
  let badgeLabel = 'OFFENSIVE INJECTION IN FLIGHT...';
  let badgeDot = 'w-2 h-2 rounded-full bg-electric-red animate-ping';

  if (currentStep === 2) {
    badgeLabel = 'VULNERABILITY FOUND: BROKEN OBJECT AUTH';
    badgeDot = 'w-2 h-2 rounded-full bg-electric-red';
  } else if (currentStep === 3) {
    badgeLabel = 'BLUE AGENT: ANALYZING & PATCHING...';
    badgeDot = 'w-2 h-2 rounded-full bg-electric-blue animate-pulse';
  } else if (currentStep === 4) {
    badgeLabel = 'PATCH VERIFIED: BEARING SEALED';
    badgeDot = 'w-2 h-2 rounded-full bg-cyber-green';
  } else if (currentStep === 5) {
    badgeLabel = '4 ATTACK VARIANTS GENERATED';
    badgeDot = 'w-2 h-2 rounded-full bg-teal-accent animate-ping';
  } else if (currentStep === 6) {
    badgeLabel = 'RED RE-ATTACKING WITH 4 MUTATED VECTORS';
    badgeDot = 'w-2 h-2 rounded-full bg-electric-red';
  } else if (currentStep === 7) {
    badgeLabel = '✓ DEFENSE VERIFIED: JUDGE AI SIGNED';
    badgeDot = 'w-2 h-2 rounded-full bg-cyber-purple';
  }

  return (
    <section className="pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900">
              Confrontation Arena
            </h2>
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-green animate-ping" />
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Closed-loop interaction between Red, Blue, Green Mutation &amp; Judge AI.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-mono flex items-center gap-1 shadow-2xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>
            <button
              type="button"
              onClick={restartSimulation}
              title="Restart Simulation"
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-mono shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="px-3.5 py-1.5 bg-emerald-50 text-cyber-green border border-emerald-200 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" /> SANDBOX SUBSTRATE #84
          </span>
        </div>
      </div>

      {/* Closed-Loop Sequence Navigator Pill Bar */}
      <div className="glass-card rounded-2xl p-3 mb-5 shadow-xs flex items-center justify-between overflow-x-auto text-[11px] font-mono font-bold">
        <div className="flex items-center gap-2 min-w-max">
          {[
            { step: 1, label: '1. RED ATTACK' },
            { step: 2, label: '2. VULNERABILITY' },
            { step: 3, label: '3. BLUE DEFEND' },
            { step: 4, label: '4. PATCH VERIFIED' },
            { step: 5, label: '5. GREEN MUTATES (4 VARIANTS)' },
            { step: 6, label: '6. RED RE-ATTACK' },
            { step: 7, label: '7. JUDGE VERIFIES' },
          ].map((item, idx, arr) => {
            const isCurrent = currentStep === item.step;
            const isDone = currentStep > item.step;
            return (
              <React.Fragment key={item.step}>
                <button
                  type="button"
                  onClick={() => setCurrentStep(item.step as ConfrontationStep)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-electric-blue text-white font-black shadow-xs'
                      : isDone
                      ? 'bg-emerald-100 text-cyber-green font-bold'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.label}
                </button>
                {idx < arr.length - 1 && <span className="text-slate-300">➔</span>}
              </React.Fragment>
            );
          })}
        </div>
        <div className="text-xs font-mono font-bold text-slate-400 pl-4 whitespace-nowrap">
          {formatTimer(timerMs)}
        </div>
      </div>

      {/* MAIN 3D CONFRONTATION ARENA BOX */}
      <div className="glass-panel-heavy rounded-3xl p-6 shadow-soft-card border border-white relative overflow-hidden mb-6">
        {/* TOP: JUDGE AI (Independent Attestation Verifier) */}
        <div className="flex justify-center mb-4">
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            className={`w-full max-w-md p-3.5 rounded-2xl bg-white/90 border-2 shadow-xs transition-all duration-300 flex items-center justify-between ${
              isJudgeScanning
                ? 'border-purple-500 shadow-glow-purple scale-105'
                : 'border-purple-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-cyber-purple flex items-center justify-center font-bold font-mono text-xs shadow-glow-purple">
                J
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-display font-black text-cyber-purple">
                    JUDGE AI
                  </span>
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                    Independent Verifier
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  {isJudgeScanning
                    ? 'Attestation Sealed • 0 Security Regressions'
                    : 'Ready to audit evidence and sign attestation'}
                </div>
              </div>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                isJudgeScanning
                  ? 'text-white bg-cyber-purple shadow-glow-purple'
                  : 'text-cyber-purple bg-purple-50 border border-purple-200'
              }`}
            >
              {isJudgeScanning ? 'VERIFIED' : 'STANDBY'}
            </span>
          </motion.div>
        </div>

        {/* CENTER GRID: Left (Red Attacker), Center (Aegis Core), Right (Blue Defender) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center relative min-h-[380px]">
          {/* LEFT: RED AGENT */}
          <div
            className={`lg:col-span-3 space-y-3 transition-opacity duration-300 ${
              isJudgeScanning ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <motion.div
              whileHover={{ y: -3, scale: 1.015 }}
              className={`p-4 rounded-2xl bg-white border-2 shadow-xs transition-all duration-300 ${
                currentStep === 1 || currentStep === 6
                  ? 'border-red-500 shadow-glow-red'
                  : 'border-red-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-electric-red shadow-[0_0_10px_#FF3B5C]" />
                  <span className="text-xs font-display font-black text-electric-red">
                    RED AGENT
                  </span>
                </div>
                <span className="text-[10px] font-mono text-electric-red bg-red-50 border border-red-200 px-2.5 py-0.5 rounded font-bold">
                  {currentStep === 1
                    ? 'ATTACKING'
                    : currentStep === 6
                    ? 'RE-PROBING'
                    : currentStep >= 4
                    ? 'BLOCKED'
                    : 'STANDBY'}
                </span>
              </div>
              <div className="mt-2 text-xs font-bold text-slate-800">
                {currentStep === 6 ? 'Mutated Exploit Probe' : 'Auth Token Injection Probe'}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5 break-all">
                {currentStep === 6
                  ? 'POST /api/v1/auth/callback?type=variant-a-idor'
                  : 'POST /api/v1/auth/callback?bypass=true'}
              </div>
              <div className="mt-3 pt-2.5 border-t border-red-100 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Threat Vector:</span>
                <span className="font-bold text-electric-red">
                  {currentStep === 6 ? 'Mutation Array (4x)' : 'Exploitation #1'}
                </span>
              </div>
            </motion.div>

            {/* Dynamic Live Vulnerability Callout Box */}
            {isBreached && (
              <div className="p-3 rounded-xl bg-red-50/80 border border-red-200 text-xs text-electric-red font-mono transition-all animate-bounce">
                <div className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-electric-red animate-ping" /> VULNERABILITY FOUND
                </div>
                <div className="text-[10px] text-slate-600 mt-1">
                  CVE-SIM-402: Broken Object Level Auth bypass in API tier.
                </div>
              </div>
            )}
          </div>

          {/* CENTER 3D INTERACTIVE TARGET APPLICATION CORE */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center py-2 relative select-none">
            {/* Dynamic 3D Vector Paths Overlay (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 540 360"
            >
              <defs>
                <radialGradient id="radarSweepGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
                  <stop offset="80%" stopColor="#A855F7" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. Red Attack Vector Path */}
              <path
                id="path-attack-main"
                d="M 20 180 C 120 180, 160 180, 220 180"
                fill="none"
                stroke="#FF3B5C"
                strokeWidth="3"
                strokeDasharray="6 6"
                className={`anim-dash-red transition-opacity duration-300 ${
                  currentStep === 1 || currentStep === 6 ? 'opacity-100' : 'opacity-25'
                }`}
              />

              {/* 2. Blue Defense & Hot-Patch Vector Path */}
              <path
                id="path-defense-main"
                d="M 520 180 C 420 180, 380 180, 320 180"
                fill="none"
                stroke="#3295FF"
                strokeWidth="3"
                strokeDasharray="6 6"
                className={`anim-dash-blue transition-opacity duration-300 ${
                  isPatching || isPatched ? 'opacity-100' : 'opacity-20'
                }`}
              />

              {/* 3. Green Mutation 4 Branch Paths */}
              <g
                className={`transition-opacity duration-500 ${
                  isMutating ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <path
                  d="M 270 310 C 230 270, 150 250, 110 205"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="anim-dash-green"
                />
                <path
                  d="M 270 310 C 250 260, 180 230, 130 190"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="anim-dash-green"
                />
                <path
                  d="M 270 310 C 290 260, 260 220, 210 185"
                  fill="none"
                  stroke="#16D9A5"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="anim-dash-green"
                />
                <path
                  d="M 270 310 C 310 270, 240 210, 170 175"
                  fill="none"
                  stroke="#16D9A5"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="anim-dash-green"
                />
              </g>

              {/* 4. Judge AI 360° Circular Radar Scan Field Overlay */}
              <g
                className={`transition-opacity duration-500 ${
                  isJudgeScanning ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <circle
                  cx="270"
                  cy="180"
                  r="135"
                  fill="url(#radarSweepGradient)"
                  stroke="#A855F7"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <line
                  x1="270"
                  y1="180"
                  x2="270"
                  y2="45"
                  stroke="#A855F7"
                  strokeWidth="2.5"
                  className="anim-radar origin-[270px_180px]"
                />
              </g>
            </svg>

            {/* Central Target Node 3D Isometric Stack (Aegis Commercial Banking) */}
            <div className="relative w-64 h-64 flex items-center justify-center" style={{ perspective: 1000 }}>
              {/* Perimeter Dynamic Security Shield Bubble */}
              <div className={shieldBubbleClass} />

              {/* 4 Layered Architecture Slices with Smooth 3D Isometric Floating */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotateZ: [-2, 0, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="relative z-10 flex flex-col items-center justify-center transition-all duration-500"
              >
                {/* Tier 1: Frontend Layer */}
                <div
                  style={{ transform: 'translateZ(50px) rotateX(10deg)' }}
                  className="w-36 h-10 rounded-2xl bg-gradient-to-r from-blue-600 via-brand-500 to-cyan-500 shadow-md border-t border-white/70 -mb-3.5 transform -skew-y-6 flex items-center justify-between px-3.5 text-white text-[10px] font-mono font-bold transition-all duration-300"
                >
                  <span>1. FRONTEND UI</span>
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Tier 2: API Gateway Layer (Targeted by attacks & patches) */}
                <div
                  style={{ transform: 'translateZ(35px) rotateX(10deg)' }}
                  className={`relative ${apiSliceClass}`}
                >
                  <span>2. API GATEWAY</span>
                  <span className={apiBadgeClass} />

                  {/* 3D Protective Shield Canopy when hardened */}
                  {isPatched && (
                    <div className="absolute -inset-1.5 rounded-2xl border-2 border-cyan-400 bg-cyan-400/20 shadow-glow-blue pointer-events-none anim-shield-pulse" />
                  )}
                </div>

                {/* Tier 3: Backend Business Logic */}
                <div
                  style={{ transform: 'translateZ(18px) rotateX(10deg)' }}
                  className="w-44 h-12 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 shadow-xl border-t border-white/35 -mb-3.5 transform -skew-y-6 flex items-center justify-between px-3.5 text-cyan-200 text-[10px] font-mono font-bold transition-all duration-300"
                >
                  <span>3. BACKEND CORE</span>
                  <span className="w-2 h-2 rounded-full bg-teal-accent" />
                </div>

                {/* Tier 4: Database Tier */}
                <div
                  style={{ transform: 'translateZ(0px) rotateX(10deg)' }}
                  className="w-48 h-14 rounded-2xl bg-gradient-to-r from-slate-950 to-blue-950 shadow-2xl border-t border-white/25 transform -skew-y-6 flex items-center justify-between px-3.5 text-slate-300 text-[10px] font-mono font-bold transition-all duration-300"
                >
                  <span>4. DATABASE POOL</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </motion.div>

              {/* Dynamic State Badge Pill over Aegis Core */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-3 z-20 px-3.5 py-1 rounded-full bg-white/95 border border-slate-200 shadow-md text-xs font-mono font-bold text-slate-800 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className={badgeDot} />
                <span>{badgeLabel}</span>
              </motion.div>
            </div>

            <div className="text-xs font-mono font-bold text-slate-600 mt-4 text-center">
              <span>Aegis Commercial Banking</span> • <span className="text-slate-400">MicroVM Node #84</span>
            </div>
          </div>

          {/* RIGHT: BLUE AGENT */}
          <div
            className={`lg:col-span-3 space-y-3 transition-opacity duration-300 ${
              isJudgeScanning ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <motion.div
              whileHover={{ y: -3, scale: 1.015 }}
              className={`p-4 rounded-2xl bg-white border-2 shadow-xs transition-all duration-300 ${
                isPatching ? 'border-electric-blue shadow-glow-blue' : 'border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-electric-blue shadow-[0_0_10px_#3295FF]" />
                  <span className="text-xs font-display font-black text-electric-blue">
                    BLUE AGENT
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded font-bold ${
                    isPatching
                      ? 'text-white bg-electric-blue'
                      : isPatched
                      ? 'text-cyber-green bg-emerald-50 border border-emerald-200'
                      : 'text-electric-blue bg-blue-50 border border-blue-200'
                  }`}
                >
                  {isPatching ? 'PATCHING' : isPatched ? 'HARDENED' : 'STANDBY'}
                </span>
              </div>
              <div className="mt-2 text-xs font-bold text-slate-800">
                {isPatching ? 'Injecting ES512 Cryptoguard' : 'AST Patch Engine'}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {isPatched ? 'Active ES512 Bearer Verifier' : 'Synthesizing zero-overhead cryptoguard'}
              </div>
              <div className="mt-3 pt-2.5 border-t border-blue-100 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Defense Status:</span>
                <span className="font-bold text-electric-blue">
                  {isPatched ? 'Verified Safe' : 'Monitoring'}
                </span>
              </div>
            </motion.div>

            {/* Hot-Patch Synthesis Callout Box */}
            {isPatched && (
              <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-electric-blue font-mono transition-all">
                <div className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" /> PATCH DEPLOYED
                </div>
                <div className="text-[10px] text-slate-600 mt-1">
                  Injected ES512 cryptographic bearer verifier.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM: GREEN MUTATION AGENT */}
        <div className="flex justify-center mt-5 pt-3 border-t border-slate-200/70">
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            className={`w-full max-w-2xl p-4 rounded-2xl bg-white border-2 shadow-xs transition-all duration-300 ${
              isJudgeScanning ? 'opacity-40' : 'opacity-100'
            } ${isMutating ? 'border-emerald-500 shadow-glow-green' : 'border-emerald-200'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-cyber-green flex items-center justify-center font-bold font-mono text-xs shadow-glow-green">
                  G
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-display font-black text-cyber-green">
                      GREEN MUTATION AGENT
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                      Exploit Permutation Generator
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    Mutates attack vectors to aggressively stress-test synthesized defenses
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono px-3 py-1 rounded font-bold ${
                  isMutating
                    ? 'text-white bg-cyber-green shadow-glow-green'
                    : 'text-cyber-green bg-emerald-50 border border-emerald-200'
                }`}
              >
                {isMutating ? 'MUTATING' : 'ARMING'}
              </span>
            </div>

            {/* 4 Distinct Attack Mutation Variant Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[10px] font-mono">
              <div
                className={`p-2 rounded-lg border text-emerald-800 flex items-center justify-between ${
                  isMutating
                    ? 'bg-emerald-100 border-emerald-400 font-bold'
                    : 'bg-emerald-50/60 border-emerald-200/80'
                }`}
              >
                <span>Variant A: IDOR Bypass</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
              </div>
              <div
                className={`p-2 rounded-lg border text-emerald-800 flex items-center justify-between ${
                  isMutating
                    ? 'bg-emerald-100 border-emerald-400 font-bold'
                    : 'bg-emerald-50/60 border-emerald-200/80'
                }`}
              >
                <span>Variant B: Header Inject</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
              </div>
              <div
                className={`p-2 rounded-lg border text-emerald-800 flex items-center justify-between ${
                  isMutating
                    ? 'bg-emerald-100 border-emerald-400 font-bold'
                    : 'bg-emerald-50/60 border-emerald-200/80'
                }`}
              >
                <span>Variant C: Proto Pollution</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" />
              </div>
              <div
                className={`p-2 rounded-lg border text-emerald-800 flex items-center justify-between ${
                  isMutating
                    ? 'bg-emerald-100 border-emerald-400 font-bold'
                    : 'bg-emerald-50/60 border-emerald-200/80'
                }`}
              >
                <span>Variant D: Smuggling</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" />
              </div>
            </div>

            <div className="text-[10px] font-mono text-center text-slate-400 mt-2">
              {isMutating
                ? 'Green Mutation Agent splits 1 vector into 4 distinct attack branches toward Red Agent.'
                : 'Standby: Green agent generates 4 distinct attack branches to pass back toward Red to test the defense.'}
            </div>
          </motion.div>
        </div>

        {/* Stepper Live Progress Bar */}
        <div className="border-t border-slate-200/80 pt-4 mt-5">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 mb-1.5 px-1 overflow-x-auto gap-2">
            <span className={currentStep >= 1 ? 'text-electric-red' : ''}>1. Red Probe</span>
            <span className={currentStep >= 2 ? 'text-electric-red' : ''}>2. Vulnerability Found</span>
            <span className={currentStep >= 3 ? 'text-electric-blue' : ''}>3. Blue Defend</span>
            <span className={currentStep >= 4 ? 'text-cyber-green' : ''}>4. Patch Verified</span>
            <span className={currentStep >= 5 ? 'text-teal-accent' : ''}>5. 4 Variants Mutated</span>
            <span className={currentStep >= 6 ? 'text-electric-red' : ''}>6. Red Re-attack</span>
            <span className={currentStep >= 7 ? 'text-cyber-purple' : ''}>7. Judge AI Verified</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-electric-red via-electric-blue to-cyber-green rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Live Confrontation Stream Log Container */}
      <div className="glass-card rounded-2xl p-5 shadow-soft-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-display font-black uppercase tracking-wider text-slate-600">
              Confrontation Event Stream
            </h3>
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
          </div>
          <button
            type="button"
            onClick={onOpenAuditModal}
            className="text-xs font-bold text-electric-blue hover:text-brand-600 underline font-mono cursor-pointer"
          >
            EXPAND AUDIT LOG
          </button>
        </div>

        <div className="space-y-2 text-xs font-mono max-h-48 overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 animate-fade-in"
            >
              <span className="text-[10px] text-slate-400 mt-0.5 shrink-0">{log.timestamp}</span>
              <span className={`w-2 h-2 rounded-full ${log.colorClass} mt-1.5 shrink-0`} />
              <span className="text-slate-700">
                <strong className={`${log.textColorClass} font-bold`}>{log.title}:</strong>{' '}
                {log.description}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Closed-Loop Verification Sequence Active
          </span>
          <button
            type="button"
            onClick={onFinish}
            className="px-5 py-2.5 rounded-xl bg-electric-blue hover:bg-brand-600 text-white text-xs font-bold shadow-glow-blue flex items-center gap-2 transition cursor-pointer"
          >
            <span>Fast-Forward to Results</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
