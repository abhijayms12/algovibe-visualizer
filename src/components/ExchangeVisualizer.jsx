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

function PhysicalBalance({ leftCounts, rightCounts }) {
  const leftTotal = Object.values(leftCounts || {}).reduce((a, b) => a + b, 0)
  const rightTotal = Object.values(rightCounts || {}).reduce((a, b) => a + b, 0)
  const total = Math.max(1, leftTotal + rightTotal)
  const maxTilt = 12
  const angle = Math.max(-maxTilt, Math.min(maxTilt, ((rightTotal - leftTotal) / total) * maxTilt))

  const expandAtoms = (counts) => {
    const arr = []
    Object.entries(counts || {}).forEach(([el, cnt]) => {
      for (let i = 0; i < cnt; i++) arr.push(el)
    })
    return arr.slice(0, 32) // cap for visuals
  }
  const atomsLeft = expandAtoms(leftCounts)
  const atomsRight = expandAtoms(rightCounts)

  const colorFor = (el) => {
    // Simple hash-based hue for consistency
    let h = 0
    for (let i = 0; i < el.length; i++) h = (h * 31 + el.charCodeAt(i)) % 360
    return `hsl(${h}, 75%, 60%)`
  }

  return (
    <div className="mt-8">
      <div className="relative mx-auto max-w-4xl">
        {/* Base and pillar */}
        <div className="mx-auto w-40 h-2 bg-slate-700/70 rounded" />
        <div className="mx-auto w-2 h-20 bg-slate-700/70" />
        <div className="mx-auto w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[20px] border-t-slate-400/80" />

        {/* Beam */}
        <div className="relative h-40">
          <div
            className="absolute left-1/2 top-8 -translate-x-1/2 w-[520px] h-1 bg-slate-300/80 origin-center transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
          />
          {/* Chains */}
          <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[520px] h-1" style={{ pointerEvents: 'none' }}>
            <div className="absolute left-4 top-0 w-px h-16 bg-slate-500/70" />
            <div className="absolute right-4 top-0 w-px h-16 bg-slate-500/70" />
          </div>
          {/* Pivot */}
          <div className="absolute left-1/2 top-[6px] -translate-x-1/2 w-3 h-3 bg-slate-200 rounded-full shadow-sm" />

          {/* Pans */}
          <div className="absolute left-1/2 top-24 -translate-x-[260px] w-44">
            <div className="mx-auto w-44 h-6 rounded-full bg-gradient-to-b from-slate-500/60 to-slate-700/70 shadow-inner ring-1 ring-white/10" />
            <div className="mt-2 grid grid-cols-5 gap-2 place-items-center px-2">
              {atomsLeft.map((el, idx) => (
                <div key={`L-${idx}`} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-slate-900 hover:scale-110 transition-transform" style={{ background: colorFor(el) }} title={el}>
                  {el}
                </div>
              ))}
            </div>
            <div className="mt-2 text-center text-xs text-slate-400">Reactants</div>
          </div>

          <div className="absolute left-1/2 top-24 translate-x-[260px] w-44">
            <div className="mx-auto w-44 h-6 rounded-full bg-gradient-to-b from-slate-500/60 to-slate-700/70 shadow-inner ring-1 ring-white/10" />
            <div className="mt-2 grid grid-cols-5 gap-2 place-items-center px-2">
              {atomsRight.map((el, idx) => (
                <div key={`R-${idx}`} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-slate-900 hover:scale-110 transition-transform" style={{ background: colorFor(el) }} title={el}>
                  {el}
                </div>
              ))}
            </div>
            <div className="mt-2 text-center text-xs text-slate-400">Products</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExchangeVisualizer({ leftCounts, rightCounts, diffMap, missing, extra }) {
  const lhsObj = useMemo(() => Object.fromEntries(Object.entries(leftCounts || {})), [leftCounts])
  const rhsObj = useMemo(() => Object.fromEntries(Object.entries(rightCounts || {})), [rightCounts])

  const isBalanced = useMemo(() => missing.length === 0 && extra.length === 0, [missing, extra])

  return (
    <section className="mt-6 card p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="heading-display text-xl-strong bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">Physical Balance</h2>
        <div className={"text-xs " + (isBalanced ? 'text-green-400' : 'text-red-400')}>
          {isBalanced ? 'Balanced (EQUIVALENT)' : 'Not Balanced'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CountList title="Left (Input)" counts={lhsObj} diff={diffMap} side="lhs" />
        <CountList title="Right (Output)" counts={rhsObj} diff={diffMap} side="rhs" />
      </div>

      <PhysicalBalance leftCounts={lhsObj} rightCounts={rhsObj} />

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
