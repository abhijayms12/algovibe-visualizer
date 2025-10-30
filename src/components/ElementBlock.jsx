import React from 'react'
import { motion } from 'framer-motion'

export default function ElementBlock({ value, maxValue, isHighlighted, index, total }) {
  const height = Math.max(8, (value / (maxValue || 1)) * 280)
  const basis = `${Math.max(1, Math.floor(100 / Math.max(1, total)))}%`

  return (
    <motion.div
      layout
      initial={{ opacity: 0.7, height: 0 }}
      animate={{
        opacity: 1,
        height,
        backgroundColor: isHighlighted ? '#22d3ee' : '#334155',
        outlineColor: isHighlighted ? 'rgba(167,139,250,0.8)' : 'transparent',
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.7 }}
      className="relative rounded-md shadow-sm"
      style={{
        flexBasis: basis,
        outlineWidth: isHighlighted ? 2 : 0,
        outlineStyle: 'solid',
      }}
      title={`idx: ${index}, val: ${value}`}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-300 select-none">
        {value}
      </div>
    </motion.div>
  )
}
