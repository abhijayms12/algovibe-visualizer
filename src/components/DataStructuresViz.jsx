import React, { useMemo } from 'react'

function MapCard({ title, data }) {
  const entries = useMemo(() => Object.entries(data || {}).sort(([a],[b]) => a.localeCompare(b)), [data])
  return (
    <div className="rounded-xl bg-slate-900/40 ring-1 ring-white/10 p-4">
      <h3 className="heading-display text-xl-strong mb-3 text-slate-200">{title}</h3>
      {entries.length === 0 ? (
        <div className="text-slate-400">(empty)</div>
      ) : (
        <ul className="grid grid-cols-2 gap-3">
          {entries.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between">
              <span className="text-slate-300">{k}</span>
              <span className="font-mono text-slate-100 text-3xl">{v}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ListCard({ title, items }) {
  return (
    <div className="rounded-xl bg-slate-900/40 ring-1 ring-white/10 p-4">
      <h3 className="heading-display text-xl-strong mb-3 text-slate-200">{title}</h3>
      {(!items || items.length === 0) ? (
        <div className="text-slate-400">(none)</div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {items.map((x, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-slate-800/60 ring-1 ring-white/10 text-2xl">{x}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DataStructuresViz({ leftCounts, rightCounts, diffMap, missing, extra }) {
  return (
    <section className="mt-6 card p-4 sm:p-6">
      <h2 className="heading-display text-2xl-strong mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink">Algorithm Data Structures</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MapCard title="Left Map" data={leftCounts} />
        <MapCard title="Right Map" data={rightCounts} />
        <MapCard title="Diff Map (R - L)" data={diffMap} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ListCard title="Missing" items={missing} />
          <ListCard title="Extra" items={extra} />
        </div>
      </div>
    </section>
  )
}
