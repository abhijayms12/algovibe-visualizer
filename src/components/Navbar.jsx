import React from 'react'
import { Sparkles } from 'lucide-react'
import logo from '../assets/logo.svg'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40 bg-slate-900/60 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="AlgoVibe" className="h-8 w-8 rounded-md" />
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink">AlgoVibe Visualizer</span>
            <span className="ml-1">⚡</span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center text-sm text-slate-300/80">
          <Sparkles className="h-4 w-4 mr-2 text-brand-purple" />
          <span>Build fast. Visualize beautifully.</span>
        </div>
      </div>
    </header>
  )
}
