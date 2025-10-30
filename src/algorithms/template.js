// Template algorithm: demonstrates a step-based API used by the visualizer.
// Each step is a plain object consumed by App.jsx to update UI state.
// Supported step types: 'highlight' | 'unhighlight' | 'set' | 'swap' | 'compare'

// Example algorithm: "Sample Pulse" — walk across the array and gently bump each bar.
export function samplePulseSteps(array) {
  const steps = []
  const n = array.length
  if (!n) return steps

  // Determine a nice bump amount approx 35% of base value
  const bumpFor = (x) => Math.max(5, Math.round(x * 0.35))

  for (let i = 0; i < n; i++) {
    const base = array[i]
    const bump = base + bumpFor(base)

    // Focus on i
    steps.push({ type: 'highlight', indices: [i] })

    // Friendly compare with neighbor (if any) to demo multi-highlight
    if (i + 1 < n) {
      steps.push({ type: 'compare', i, j: i + 1 })
      steps.push({ type: 'highlight', indices: [i, i + 1] })
    }

    // Bump up, then return
    steps.push({ type: 'set', index: i, value: bump })
    steps.push({ type: 'set', index: i, value: base })

    // Unfocus
    steps.push({ type: 'unhighlight', indices: [i] })
  }

  return steps
}

const templateAlgo = {
  id: 'samplePulse',
  name: 'Sample Pulse (template)',
  getSteps: samplePulseSteps,
}

export default templateAlgo
