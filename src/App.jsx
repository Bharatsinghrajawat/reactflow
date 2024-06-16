import './App.css'
import FlowDiagram from './components/FlowDiagram/FlowDiagram'
import { ReactFlowProvider } from "reactflow";
function App() {

  return (
    <ReactFlowProvider>
        <FlowDiagram />
    </ReactFlowProvider>
  )
}

export default App
