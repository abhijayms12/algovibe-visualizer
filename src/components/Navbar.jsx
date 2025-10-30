import React from 'react'
import { FlaskConical } from 'lucide-react'
import logo from '../assets/logo.svg'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40 bg-slate-900/60 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="AlchemiCode" className="h-8 w-8 rounded-md" />
          <h1 className="text-lg-strong heading-display">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-cyan">AlchemiCode</span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center text-sm text-slate-300/80">
          <FlaskConical className="h-4 w-4 mr-2 text-brand-cyan" />
          <span>Transmute equations. Balance beautifully.</span>
        </div>
      </div>
    </header>
  )
}
