// src/CustomNode.js
import React, { memo } from "react";
import { Handle } from "reactflow";

const CustomNode = ({ data, isConnectable, selected }) => {
  return (
    <div
      className={`custom-node ${selected ? 'selected' : ''}`}
      style={data.style}
    >
      <Handle type="target" position="left" isConnectable={isConnectable} />
      <div>{data.label}</div>
      <Handle type="source" position="right" isConnectable={isConnectable} />
    </div>
  );
};

export default memo(CustomNode);
