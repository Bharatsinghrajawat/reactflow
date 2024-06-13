// src/FlowDiagram.js
import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import "./FlowDiagram.css";
import CustomNode from "./CustomNode";

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

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  const onDrop = (event) => {
    event.preventDefault();

    const nodeType = event.dataTransfer.getData("application/reactflow");
    const position = {
      x: event.clientX - event.target.getBoundingClientRect().left,
      y: event.clientY - event.target.getBoundingClientRect().top,
    };

    const newNode = {
      id: `${+new Date()}`,
      type: "custom", // Use the custom node type
      position,
      data: { label: `node ${nodes.length + 1}` },
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
      height: node.style?.height || "",
      width: node.style?.width || "",
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
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          node.data.label = nodeProps.name;
          node.style = {
            ...node.style,
            background: nodeProps.color,
            height: nodeProps.height,
            width: nodeProps.width,
          };
        }
        console.log(node,"nodeee",nodeProps)
        return node;
      })
    );
    setSelectedNode(null);
  };

  const nodeTypes = useMemo(() => ({
    custom: CustomNode,
  }), []);

  return (
    <div className="dndflow">
      <aside>
        <div className="description">
          Drag these nodes to the pane on the right.
        </div>
        <div
          className="dndnode input"
          onDragStart={(event) =>
            event.dataTransfer.setData("application/reactflow", "Rectangle")
          }
          draggable
        >
          Node
        </div>
        <div
          className="dndnode default diamond"
          onDragStart={(event) =>
            event.dataTransfer.setData("application/reactflow", "Conditional")
          }
          draggable
        >
          Conditional
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) =>
            event.dataTransfer.setData("application/reactflow", "Iteration")
          }
          draggable
        >
          Iteration
        </div>
        {selectedNode && (
          <div className="node-editor">
            <h3>Edit Node</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={nodeProps.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Color:
              <input
                type="text"
                name="color"
                value={nodeProps.color}
                onChange={handleChange}
              />
            </label>
            <label>
              Height:
              <input
                type="text"
                name="height"
                value={nodeProps.height}
                onChange={handleChange}
              />
            </label>
            <label>
              Width:
              <input
                type="text"
                name="width"
                value={nodeProps.width}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </aside>
      <div
        className="reactflow-wrapper"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
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
