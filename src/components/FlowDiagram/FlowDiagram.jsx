import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "./FlowDiagram.css";
import CustomNode from "../CustomNode";
import NodeEditor from "../NodeEditor";
import SidePanel from "../SidePanel";

const initialNodes = [];

const FlowDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeProps, setNodeProps] = useState({
    name: "",
    color: "",
    height: "",
    width: "",
  });
  const [flowKey, setFlowKey] = useState(0);
  const { project } = useReactFlow();
  const onConnect = useCallback(
    (params) =>
      setEdges((els) =>
        addEdge(
          { ...params, type: "step", markerEnd: { type: "arrowclosed" } },
          els
        )
      ),
    []
  );

  const onDrop = (event) => {
    event.preventDefault();

    const nodeType = event.dataTransfer.getData("application/reactflow");
    const reactFlowBounds = event.target.getBoundingClientRect();

    const position = project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: `${+new Date()}`,
      type: "custom",
      position,
      data: { label: `node ${nodes.length + 1}` },
      className: `dndnode ${nodeType}`,
      style: {
        background:
          nodeType === "Rectangle"
            ? "blue"
            : nodeType === "Conditional"
            ? "orange"
            : "green",
        width: 100,
        height: 50,
        clipPath:
          nodeType === "Rectangle"
            ? "none"
            : nodeType === "Conditional"
            ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
            : "polygon(22% 0%, 92% 0%, 76% 100%, 6% 100%)",
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeDoubleClick = (event, node) => {
    setSelectedNode(node);
    setNodeProps({
      name: node.data.label,
      color: node.style?.background || "",
      height: parseInt(node.style?.height) || "",
      width: parseInt(node.style?.width) || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNodeProps((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const height = parseInt(nodeProps.height);
    const width = parseInt(nodeProps.width);
    const fontSize = Math.min(height, width) / 4;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeProps.name,
            },
            style: {
              ...node.style,
              background: nodeProps.color,
              height: `${height}px`,
              width: `${width}px`,
              fontSize: `${fontSize}px`,
            },
          };
        }
        return node;
      })
    );
    setFlowKey(flowKey + 1);
    setSelectedNode(null);
  };

  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  return (
    <div className="dndflow">
      <aside>
        <SidePanel />
        {selectedNode && (
          <NodeEditor
            nodeProps={nodeProps}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </aside>
      <div
        className="reactflow-wrapper"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          key={flowKey}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          connectionLineType="step"
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowDiagram;
