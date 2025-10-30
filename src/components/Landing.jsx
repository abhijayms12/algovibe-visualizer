import React from 'react'

export default function Landing({ onEnter }) {
  return (
    <div className="relative min-h-screen chemistry-bg chemistry-overlay">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen text-zoom-140">
        <div className="text-center space-y-6">
          <h1 className="heading-display text-5xl-hero bg-clip-text text-transparent bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-cyan drop-shadow">
            AlchemiCode
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-xl-strong">
            Balance chemical equations with an elegant, interactive scale — atoms and all.
          </p>
          <div className="pt-2">
            <button className="btn-alchemy" onClick={onEnter}>
              Start Balancing ⚗️
            </button>
          </div>
          <div className="opacity-70 text-sm text-slate-400">
            Tip: Try H2,O &rarr; H2O or Fe,O3 &rarr; Fe2O3
          </div>
        </div>
      </div>
    </div>
  )
}
