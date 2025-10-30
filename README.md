# AlchemiCode ⚗️

An elegant React + Vite app for balancing chemical equations with a vibrant, interactive physical balance and atom visuals. Formerly AlgoVibe Visualizer — now remixed for chemistry.

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
# AlchemiCode ⚗️

An interactive, chemistry-themed equation visualizer built with React + Vite. Type equations, see element counts, and watch a physical balance tilt with atoms on the pans.

## Overview

- Tech stack: React (Vite), Tailwind CSS, Framer Motion, Lucide React
- Modern dark-blue theme with vibrant gradients and a subtle chemistry background (glassware, molecules, periodic tiles)
- Landing page with "AlchemiCode" branding and a one-click CTA to enter
- Physical balance visualization: realistic beam, vertical chains, horizontal pans, and colored atom circles with element symbols
- Data structure visualizer: Left/Right count maps, Diff Map (R − L), Missing and Extra lists

## Getting Started

1) Install dependencies

```powershell
npm install
```

2) Start the dev server (opens on http://localhost:3000)

```powershell
npm run dev
```

3) Build for production

```powershell
npm run build
```

4) Preview the production build

```powershell
npm run preview
```

## How to Use

- On first load, you’ll see the AlchemiCode landing page. Click “Start Balancing ⚗️” to enter the app.
- Enter an equation in the format: `LHS -> RHS`.
  - Separate distinct species on a side with commas.
  - Parentheses and numeric multipliers are supported.
  - Examples:
    - `H2,O -> H2O`
    - `Fe,O3 -> Fe2O3`
    - `C,O2 -> CO2`
- Click “Compute” (or use Ctrl/Cmd+Enter) to parse and visualize.
- The balance tilts smoothly depending on total counts on each side; atoms render as colored circles with their symbols on top of the pans.
- Below the balance, you’ll see large, legible tables for Left/Right counts and status.
- The “Algorithm Data Structures” section shows the underlying maps/arrays computed by the parser.

## Project Structure

```
algovibe-visualizer/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── assets/
    │   └── logo.svg
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Landing.jsx
    │   ├── EquationInput.jsx
    │   ├── ExchangeVisualizer.jsx
    │   ├── BalanceScale.jsx
    │   ├── DataStructuresViz.jsx
    │   ├── VisualizationCanvas.jsx
    │   └── ElementBlock.jsx
    ├── algorithms/
    │   └── main.js
    ├── utils/
    │   ├── generateData.js
    │   └── sleep.js
    ├── styles/
    │   └── globals.css
    └── data/
        └── sampleData.js
```

## Algorithm Notes (src/algorithms/main.js)

- `parseFormula(s)`: recursively parses chemical formulas (supports parentheses and multipliers) into a Map of `element -> count`.
- `compareMaps(leftMap, rightMap)`: computes `missing` and `extra` lists and returns a status string.
- `evaluateLine(input)`: processes `LEFT -> RIGHT`, validates, and compares the resulting maps.

These structures are surfaced in the UI via the counts tables and the Data Structures visualizer.

## Styling & Animations

- Tailwind CSS for layout and a themed palette (`background`, `surface`, and a vibrant `brand` scale)
- Subtle, layered SVG chemistry background that doesn’t interfere with content
- Framer Motion for smooth, subtle animations on the balance (beam/chain/pan/atom transitions)

## Deployment (Vercel)

- `vercel.json` defines the framework (Vite), the build command, and the output directory (`dist`).
- The project specifies Node 18+ in `package.json` engines to match Vite’s requirements.
- Typical Vercel settings:
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm ci` (or leave default to use `vercel.json`)

If a build fails due to environment/engine mismatch, confirm Node >= 18.17 and that no conflicting project-level overrides exist.

## Credits

Crafted with curiosity — AlchemiCode: Chemistry meets Code.
