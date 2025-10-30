import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

// SVG-based physical balance with realistic geometry.
// - Beam rotates around fulcrum.
// - Chains hang vertically; their length adjusts to meet pans at a fixed baseline.
// - Pans remain horizontal; atoms render on top of pans.
export default function BalanceScale({ leftCounts, rightCounts }) {
  // Expand atoms list from counts
  const expandAtoms = (counts) => {
    const arr = []
    Object.entries(counts || {}).forEach(([el, cnt]) => {
      for (let i = 0; i < cnt; i++) arr.push(el)
    })
    return arr.slice(0, 40) // cap for visuals
  }

  const atomsLeft = useMemo(() => expandAtoms(leftCounts), [leftCounts])
  const atomsRight = useMemo(() => expandAtoms(rightCounts), [rightCounts])

  const totals = useMemo(() => {
    const lt = Object.values(leftCounts || {}).reduce((a, b) => a + b, 0)
    const rt = Object.values(rightCounts || {}).reduce((a, b) => a + b, 0)
    return { lt, rt }
  }, [leftCounts, rightCounts])

  const angle = useMemo(() => {
    const { lt, rt } = totals
    const total = Math.max(1, lt + rt)
    const maxTilt = 12
    return Math.max(-maxTilt, Math.min(maxTilt, ((rt - lt) / total) * maxTilt))
  }, [totals])

  // Layout constants
  const W = 900
  const H = 360
  const pivot = { x: W / 2, y: 120 }
  const beamHalf = 240
  const baselineY = 280 // where pans rest

  const rotatePoint = (x, y, cx, cy, deg) => {
    const rad = (deg * Math.PI) / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    const dx = x - cx
    const dy = y - cy
    return { x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos }
  }

  // Hook points on the beam before rotation
  const leftHook0 = { x: pivot.x - beamHalf, y: pivot.y }
  const rightHook0 = { x: pivot.x + beamHalf, y: pivot.y }

  // After rotation
  const leftHook = rotatePoint(leftHook0.x, leftHook0.y, pivot.x, pivot.y, angle)
  const rightHook = rotatePoint(rightHook0.x, rightHook0.y, pivot.x, pivot.y, angle)

  // Pans centered directly below hooks on baseline
  const leftPan = { cx: leftHook.x, cy: baselineY }
  const rightPan = { cx: rightHook.x, cy: baselineY }

  // Color mapping for atoms
  const colorFor = (el) => {
    let h = 0
    for (let i = 0; i < el.length; i++) h = (h * 31 + el.charCodeAt(i)) % 360
    return `hsl(${h}, 75%, 60%)`
  }

  // Simple pack atoms into a grid within pan area
  const panRadiusX = 90
  const panRadiusY = 16
  const atomR = 12
  const gridCols = 6
  const gridCell = 2 * atomR + 6
  const layOutAtoms = (list, pan) => {
    const rows = Math.max(1, Math.ceil(list.length / gridCols))
    const positions = []
    for (let i = 0; i < list.length; i++) {
      const col = i % gridCols
      const row = Math.floor(i / gridCols)
      const x = pan.cx - (gridCols - 1) * gridCell / 2 + col * gridCell
      const y = pan.cy - 10 - row * gridCell // above the ellipse surface
      positions.push({ x, y })
    }
    return positions
  }

  const atomsLeftPos = layOutAtoms(atomsLeft, leftPan)
  const atomsRightPos = layOutAtoms(atomsRight, rightPan)

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" role="img" aria-label="Physical balance">
        {/* Base */}
        <g>
          <rect x={W/2 - 80} y={H - 40} width="160" height="12" rx="6" fill="#475569" opacity="0.7" />
          <rect x={W/2 - 6} y={H - 160} width="12" height="120" fill="#475569" opacity="0.75" />
          {/* Fulcrum cap */}
          <polygon points={`${pivot.x - 20},${H - 160} ${pivot.x + 20},${H - 160} ${pivot.x},${H - 180}`} fill="#cbd5e1" opacity="0.8" />
        </g>

        {/* Beam drawn as a thick line between moving hooks for reliable motion */}
        <motion.line
          animate={{ x1: leftHook.x, y1: leftHook.y, x2: rightHook.x, y2: rightHook.y }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          stroke="#e2e8f0"
          strokeWidth={6}
          strokeLinecap="round"
        />
        {/* Hook caps following beam ends */}
        <motion.circle animate={{ cx: leftHook.x, cy: leftHook.y }} transition={{ duration: 0.35, ease: 'easeOut' }} r={3} fill="#94a3b8" />
        <motion.circle animate={{ cx: rightHook.x, cy: rightHook.y }} transition={{ duration: 0.35, ease: 'easeOut' }} r={3} fill="#94a3b8" />

        {/* Chains (vertical, auto-length) */}
        <g stroke="#64748b" strokeWidth="2" opacity="0.85">
          <motion.line animate={{ x1: leftHook.x, y1: leftHook.y, x2: leftPan.cx, y2: leftPan.cy - panRadiusY }} transition={{ duration: 0.35, ease: 'easeOut' }} />
          <motion.line animate={{ x1: rightHook.x, y1: rightHook.y, x2: rightPan.cx, y2: rightPan.cy - panRadiusY }} transition={{ duration: 0.35, ease: 'easeOut' }} />
        </g>

        {/* Pans (ellipses remain horizontal) */}
        <g>
          <motion.ellipse animate={{ cx: leftPan.cx, cy: leftPan.cy }} transition={{ duration: 0.35, ease: 'easeOut' }} rx={panRadiusX} ry={panRadiusY} fill="#94a3b8" opacity="0.85" />
          <motion.ellipse animate={{ cx: rightPan.cx, cy: rightPan.cy }} transition={{ duration: 0.35, ease: 'easeOut' }} rx={panRadiusX} ry={panRadiusY} fill="#94a3b8" opacity="0.85" />
        </g>

        {/* Pivot */}
        <circle cx={pivot.x} cy={pivot.y} r="5" fill="#e2e8f0" />

        {/* Atoms on pans (above) */}
        <g>
          {atomsLeftPos.map((p, i) => (
            <g key={`L-${i}`}>
              <motion.circle animate={{ cx: p.x, cy: p.y }} transition={{ duration: 0.35, ease: 'easeOut' }} r={atomR} fill={colorFor(atomsLeft[i])} />
              <text x={p.x} y={p.y + 5} fontSize="14" textAnchor="middle" fill="#000000" fontWeight="800">{atomsLeft[i]}</text>
            </g>
          ))}
          {atomsRightPos.map((p, i) => (
            <g key={`R-${i}`}>
              <motion.circle animate={{ cx: p.x, cy: p.y }} transition={{ duration: 0.35, ease: 'easeOut' }} r={atomR} fill={colorFor(atomsRight[i])} />
              <text x={p.x} y={p.y + 5} fontSize="14" textAnchor="middle" fill="#000000" fontWeight="800">{atomsRight[i]}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
