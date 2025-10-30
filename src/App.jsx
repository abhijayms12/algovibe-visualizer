import React, { useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import EquationInput from './components/EquationInput.jsx'
import ExchangeVisualizer from './components/ExchangeVisualizer.jsx'
import { parseFormula, compareMaps, evaluateLine } from './algorithms/main.js'

export default function App() {
  const [equation, setEquation] = useState('H2,O -> H2O')
  const [error, setError] = useState('')
  const [result, setResult] = useState({
    left: {},
    right: {},
    diff: {},
    missing: [],
    extra: [],
    status: 'EQUIVALENT',
  })

  const handleCompute = () => {
    try {
      setError('')
      const normalized = String(equation || '')
      const parts = normalized.split('->')
      if (parts.length !== 2) {
        setError('Malformed input. Expected: LHS -> RHS')
        return
      }
      const leftStr = parts[0]
      const rightStr = parts[1]
      const l = parseFormula(leftStr).counts
      const r = parseFormula(rightStr).counts
      const statusMsg = compareMaps(l, r)

      const all = new Set([...l.keys(), ...r.keys()])
      const diff = {}
      for (const k of all) {
        diff[k] = (r.get(k) || 0) - (l.get(k) || 0)
      }
      const missing = Object.keys(diff).filter((k) => diff[k] > 0)
      const extra = Object.keys(diff).filter((k) => diff[k] < 0)

      setResult({
        left: Object.fromEntries(Array.from(l.entries())),
        right: Object.fromEntries(Array.from(r.entries())),
        diff,
        missing,
        extra,
        status: statusMsg,
      })
    } catch (e) {
      setError('Failed to parse equation')
    }
  }

  // Compute once on first render for the default example
  useMemo(() => {
    handleCompute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <EquationInput
          value={equation}
          onChange={setEquation}
          onSubmit={handleCompute}
          error={error}
        />

        <ExchangeVisualizer
          leftCounts={result.left}
          rightCounts={result.right}
          diffMap={result.diff}
          missing={result.missing}
          extra={result.extra}
        />
      </main>

      <Footer />
    </div>
  )
}
