// Generate random numeric arrays for visualizations
export function generateArray(count = 16, min = 8, max = 100) {
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n))
  const a = Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  )
  // Ensure at least some variation
  if (new Set(a).size < Math.max(3, Math.floor(count / 4))) {
    for (let i = 0; i < a.length; i += 2) {
      a[i] = clamp(a[i] + (i % 3 === 0 ? 7 : -5), min, max)
    }
  }
  return a
}

export function coerceArray(input) {
  if (!Array.isArray(input)) return []
  return input.map((x) => {
    const n = Number(x)
    return Number.isFinite(n) ? n : 0
  })
}
