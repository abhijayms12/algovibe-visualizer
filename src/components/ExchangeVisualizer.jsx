import React, { useMemo } from 'react'

function CountList({ title, counts, diff, side }) {
  const entries = useMemo(() => {
    const keys = new Set(Object.keys(counts || {}))
    Object.keys(diff || {}).forEach((k) => keys.add(k))
    return Array.from(keys).sort()
  }, [counts, diff])

  return (
    <div className="flex-1">
      <h3 className="text-sm font-medium text-slate-300 mb-3">{title}</h3>
      <div className="rounded-lg bg-slate-950/40 ring-1 ring-white/10 p-3 min-h-[14rem]">
        {entries.length === 0 && (
          <div className="text-slate-500 text-sm">No elements</div>
        )}
        <ul className="space-y-2">
          {entries.map((el) => {
            const c = counts?.[el] ?? 0
            const d = diff?.[el] ?? 0
            const isMismatchOnRhs = side === 'rhs' && d !== 0
            const color = isMismatchOnRhs ? 'text-red-400' : 'text-slate-200'
            return (
              <li key={el} className="flex items-center justify-between gap-3">
                <span className="text-slate-400">{el}</span>
                <span className={`font-mono ${color}`}>{c}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function Scale({ sumPositive, sumNegative }) {
  const net = sumPositive - sumNegative
  // Tilt between -12deg (LHS heavier) to +12deg (RHS heavier)
  const maxTilt = 12
  const magnitude = Math.min(1, Math.abs(net) / Math.max(1, sumPositive + sumNegative))
  const angle = (net >= 0 ? 1 : -1) * maxTilt * magnitude

  return (
    <div className="mt-6">
      <div className="flex items-end justify-center gap-6">
        {/* Bases */}
        <div className="w-28 h-2 bg-slate-700 rounded" />
        <div className="w-28 h-2 bg-slate-700 rounded" />
      </div>
      <div className="relative h-20 flex items-center justify-center">
        <div
          className="origin-center w-72 h-[2px] bg-slate-400/70"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        {/* Pivot */}
        <div className="absolute w-2 h-2 bg-slate-300 rounded-full" />
        {/* Labels */}
        <div className="absolute left-6 top-2 text-xs text-slate-400">LHS</div>
        <div className="absolute right-6 top-2 text-xs text-slate-400">RHS</div>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Heavier if missing on RHS (LHS &gt; RHS)</span>
        <span>Heavier if extra on RHS (RHS &gt; LHS)</span>
      </div>
    </div>
  )
}

export default function ExchangeVisualizer({ leftCounts, rightCounts, diffMap, missing, extra }) {
  const lhsObj = useMemo(() => Object.fromEntries(Object.entries(leftCounts || {})), [leftCounts])
  const rhsObj = useMemo(() => Object.fromEntries(Object.entries(rightCounts || {})), [rightCounts])

  const sums = useMemo(() => {
    let pos = 0, neg = 0
    for (const [k, d] of Object.entries(diffMap || {})) {
      if (d > 0) pos += d
      else if (d < 0) neg += -d
    }
    return { sumPositive: pos, sumNegative: neg }
  }, [diffMap])

  return (
    <section className="mt-6 card p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-300">Equivalent Exchange Visualizer</h2>
        <div className="text-xs text-slate-400">
          {missing.length === 0 && extra.length === 0 ? 'Balanced (EQUIVALENT)' : 'Not Balanced'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CountList title="Left (Input)" counts={lhsObj} diff={diffMap} side="lhs" />
        <CountList title="Right (Output)" counts={rhsObj} diff={diffMap} side="rhs" />
      </div>

      <Scale sumPositive={sums.sumPositive} sumNegative={sums.sumNegative} />

      {(missing.length > 0 || extra.length > 0) && (
        <div className="mt-4 text-sm text-slate-300">
          <span className="text-slate-400">Status: </span>
          {missing.length === 0 && extra.length === 0 ? (
            <span className="text-green-400">EQUIVALENT</span>
          ) : (
            <span className="text-red-400">
              NOT_EQUIVALENT{': '}
              {[
                missing.length ? `Missing ${missing.join(',')}` : null,
                extra.length ? `Extra ${extra.join(',')}` : null,
              ].filter(Boolean).join(' and ')}
            </span>
          )}
        </div>
      )}
    </section>
  )
}
