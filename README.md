# AlgoVibe Visualizer ⚡

An elegant, production-ready React + Vite scaffold for interactive algorithm and data structure visualizations. Optimized for fast iteration during the 2-hour AlgoVibe coding competition.

## Overview

- Tech stack: React (Vite), Tailwind CSS, Framer Motion, Lucide React
- Dark, modern UI with smooth animations and responsive layout
- Plug-and-play algorithm architecture (drop new files in `src/algorithms`)

The app ships with a placeholder visualization (Sample Pulse) and a Control Panel to generate data, start animations, reset state, switch algorithms, and adjust speed.

## Getting Started

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

3. Build for production (optional)

```powershell
npm run build
```

4. Preview the production build (optional)

```powershell
npm run preview
```

## Project Structure

```
algovibe-visualizer/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── assets/
    │   └── logo.svg
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ControlPanel.jsx
    │   ├── VisualizationCanvas.jsx
    │   └── ElementBlock.jsx
    ├── algorithms/
    │   └── template.js
    ├── utils/
    │   ├── generateData.js
    │   └── sleep.js
    ├── styles/
    │   └── globals.css
    └── data/
        └── sampleData.js
```

## How to Add a New Algorithm

Adding a new visualization is quick and ergonomic:

1. Create a new file in `src/algorithms/`, e.g., `bubbleSort.js`.
2. Export an object with an `id`, `name`, and `getSteps(data)` function that returns an array of steps.
3. Import it in `src/App.jsx` and add it to the `algorithms` array.

### Minimal example (step-based API)

```js
// src/algorithms/bubbleSort.js
export function bubbleSortSteps(array) {
  const a = [...array]
  const steps = []
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ type: 'compare', i: j, j: j + 1 })
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push({ type: 'swap', i: j, j: j + 1 })
      }
    }
  }
  steps.push({ type: 'unhighlight' })
  return steps
}

const bubbleSort = { id: 'bubbleSort', name: 'Bubble Sort', getSteps: bubbleSortSteps }
export default bubbleSort
```

In `src/App.jsx`:

```js
import bubbleSort from './algorithms/bubbleSort.js'
const algorithms = [templateAlgo, bubbleSort]
```

### Step types supported
- `highlight` — `{ indices: number[] }`
- `unhighlight`
- `compare` — `{ i: number, j: number }`
- `set` — `{ index: number, value: number }`
- `swap` — `{ i: number, j: number }`

The runner in `App.jsx` applies these steps sequentially, honoring the speed slider.

## Main Components

- `Navbar` — Title header: "AlgoVibe Visualizer ⚡"
- `ControlPanel` — Generate Data, Start, Reset, Algorithm Selector, Speed Slider
- `VisualizationCanvas` — Animated area where bars/nodes render
- `ElementBlock` — Reusable unit for bars/nodes with Framer Motion animations
- `Footer` — Minimal footer crediting the team and event

## Styling & Animations

- Tailwind CSS for layout, spacing, and responsive design
- Dark theme base (`#0f172a`) with vibrant accent gradients
- Framer Motion for smooth height/color transitions and layout animations

## Team

- Team AlgoVibe: Add your member names here

## Event

Built for the AlgoVibe 2-hour coding competition — focus on clarity, speed, and extensibility.
