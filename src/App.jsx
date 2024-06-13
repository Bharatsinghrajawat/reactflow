import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LayoutFlow from './components/FlowDiagram'
import HorizontalFlow from './components/FlowDiagram'
import FlowDiagram from './components/FlowDiagram'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        {/* <LayoutFlow /> */}
        {/* <HorizontalFlow /> */}
        <FlowDiagram />
    </>
  )
}

export default App
