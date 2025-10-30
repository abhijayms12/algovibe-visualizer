import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import VisualizationCanvas from './components/VisualizationCanvas.jsx'
import { generateArray } from './utils/generateData.js'
import { sleep } from './utils/sleep.js'
import sampleData from './data/sampleData.js'
import templateAlgo from './algorithms/template.js'

const algorithms = [templateAlgo]

const speedToMs = (s) => Math.max(10, 1000 - s * 9) // 1..100 => 991..10ms

export default function App() {
  const [data, setData] = useState(sampleData)
  const [highlight, setHighlight] = useState([])
  const [selectedAlgo, setSelectedAlgo] = useState(algorithms[0].id)
  const [speed, setSpeed] = useState(60)
  const [isRunning, setIsRunning] = useState(false)

  const initialDataRef = useRef([...sampleData])
  const cancelRef = useRef(false)

  // Recompute max value for scaling visual height
  const maxValue = useMemo(() => (data.length ? Math.max(...data) : 1), [data])

  const handleGenerate = () => {
    cancelRef.current = true
    const next = generateArray(20, 8, 120)
    initialDataRef.current = [...next]
    setHighlight([])
    setData(next)
    setIsRunning(false)
  }

  const handleReset = () => {
    cancelRef.current = true
    setHighlight([])
    setData([...initialDataRef.current])
    setIsRunning(false)
  }

  const handleStart = async () => {
    if (isRunning) return
    const algo = algorithms.find((a) => a.id === selectedAlgo)
    if (!algo) return

    setIsRunning(true)
    cancelRef.current = false

    const steps = algo.getSteps([...data])

    for (let i = 0; i < steps.length; i++) {
      if (cancelRef.current) break
      const step = steps[i]
      switch (step.type) {
        case 'highlight': {
          setHighlight(step.indices || [])
          break
        }
        case 'unhighlight': {
          setHighlight([])
          break
        }
        case 'set': {
          setData((prev) => {
            const next = [...prev]
            if (step.index >= 0 && step.index < next.length) {
              next[step.index] = step.value
            }
            return next
          })
          break
        }
        case 'swap': {
          setData((prev) => {
            const next = [...prev]
            const { i, j } = step
            if (
              i >= 0 && i < next.length &&
              j >= 0 && j < next.length
            ) {
              ;[next[i], next[j]] = [next[j], next[i]]
            }
            return next
          })
          break
        }
        case 'compare': {
          setHighlight([step.i, step.j])
          break
        }
        default:
          break
      }
      await sleep(speedToMs(speed))
    }

    setHighlight([])
    setIsRunning(false)
  }

  // Keep initialDataRef synced to current data on first load
  useEffect(() => {
    if (!initialDataRef.current?.length) {
      initialDataRef.current = [...data]
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ControlPanel
          algorithms={algorithms}
          selectedAlgo={selectedAlgo}
          onSelectAlgo={setSelectedAlgo}
          onGenerate={handleGenerate}
          onStart={handleStart}
          onReset={handleReset}
          speed={speed}
          onSpeedChange={setSpeed}
          isRunning={isRunning}
        />

        <VisualizationCanvas
          data={data}
          highlightIndices={highlight}
          maxValue={maxValue}
        />
      </main>

      <Footer />
    </div>
  )
}
