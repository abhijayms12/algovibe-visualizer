import React from 'react'

export default function EquationInput({ value, onChange, onSubmit, error }) {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      onSubmit?.()
    }
  }

  return (
    <section className="mt-6 card p-4 sm:p-5">
      <div className="flex flex-col gap-3">
        <label className="text-sm text-slate-300" htmlFor="equation">
          Enter an equation in the form: LHS &rarr; RHS
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="equation"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="H2,O -> H2O"
            className="flex-1 rounded-md bg-slate-800/70 ring-1 ring-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-brand-purple"
          />
          <button
            className="btn btn-primary self-start sm:self-auto"
            onClick={onSubmit}
            title="Compute counts (Ctrl/Cmd+Enter)"
          >
            Compute
          </button>
        </div>
        {error && (
          <div className="text-sm text-red-400">{error}</div>
        )}
      </div>
    </section>
  )
}
