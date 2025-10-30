import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ElementBlock from './ElementBlock.jsx'

export default function VisualizationCanvas({ data, highlightIndices = [], maxValue }) {
  const highlightedSet = new Set(highlightIndices)

  return (
    <section className="mt-6 card p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-300">Visualization</h2>
        <div className="text-xs text-slate-400">Items: {data.length}</div>
      </div>

      <div className="relative h-80 sm:h-96 overflow-hidden rounded-lg bg-slate-950/40 ring-1 ring-white/10 p-3 flex items-end gap-1">
        <AnimatePresence initial={false}>
          {data.map((v, i) => (
            <ElementBlock
              key={i}
              value={v}
              maxValue={maxValue}
              index={i}
              total={data.length}
              isHighlighted={highlightedSet.has(i)}
            />
          ))}
        </AnimatePresence>

        {data.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 grid place-items-center text-slate-400"
          >
            No data — click Generate Data to begin.
          </motion.div>
        )}
      </div>
    </section>
  )
}
