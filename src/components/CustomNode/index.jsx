import React, { memo } from "react";
import { Handle } from "reactflow";

const CustomNode = ({ data, isConnectable, selected }) => {
  return (
    <div
      className={`custom-node ${selected ? "selected" : ""}`}
      style={data.style}
    >
      <Handle
        type="target"
        position="top"
        id="top"
        isConnectable={isConnectable}
        style={{
          background: "transparent",
          border: "none",
          width: 10,
          height: 10,
          top: -5,
          zIndex: 10,
        }}
      />
      <Handle
        type="target"
        position="right"
        id="right"
        isConnectable={isConnectable}
        style={{
          background: "transparent",
          border: "none",
          width: 10,
          height: 10,
          right: -5,
          zIndex: 10,
        }}
      />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle
        type="source"
        position="left"
        id="left"
        isConnectable={isConnectable}
        style={{
          background: "transparent",
          border: "none",
          width: 10,
          height: 10,
          left: -5,
          zIndex: 10,
        }}
        onConnect={(params) => console.log("handle onConnect", params)}
        arrowheadType="arrow"
      />
      <Handle
        type="source"
        position="bottom"
        id="bottom"
        isConnectable={isConnectable}
        style={{
          background: "transparent",
          border: "none",
          width: 10,
          height: 10,
          bottom: -5,
          zIndex: 10,
        }}
        onConnect={(params) => console.log("handle onConnect", params)}
        arrowheadType="arrow"
      />
    </div>
  );
};

export default memo(CustomNode);
