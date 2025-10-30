import React from 'react'
import { Play, RefreshCcw, Shuffle } from 'lucide-react'

export default function ControlPanel({
  algorithms,
  selectedAlgo,
  onSelectAlgo,
  onGenerate,
  onStart,
  onReset,
  speed,
  onSpeedChange,
  isRunning,
}) {
  return (
    <section className="mt-6 card p-4 sm:p-5">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={onStart}
            disabled={isRunning}
            title={isRunning ? 'Running...' : 'Start Visualization'}
          >
            <Play className="h-4 w-4" />
            Start
          </button>

          <button
            className="btn btn-ghost"
            onClick={onGenerate}
            title="Generate new random data"
          >
            <Shuffle className="h-4 w-4" />
            Generate Data
          </button>

          <button
            className="btn btn-ghost"
            onClick={onReset}
            title="Reset to last generated data"
          >
            <RefreshCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <span className="whitespace-nowrap">Algorithm</span>
            <select
              className="rounded-md bg-slate-800/70 ring-1 ring-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-brand-purple"
              value={selectedAlgo}
              onChange={(e) => onSelectAlgo(e.target.value)}
            >
              {algorithms.map((algo) => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-3">
            <label htmlFor="speed" className="text-sm text-slate-300">
              Speed
            </label>
            <input
              id="speed"
              type="range"
              min={1}
              max={100}
              value={speed}
              onChange={(e) => onSpeedChange(parseInt(e.target.value))}
              className="w-40 accent-brand-purple"
            />
            <span className="text-xs text-slate-400 w-8 text-right">{speed}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
