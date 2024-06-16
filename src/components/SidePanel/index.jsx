const SidePanel = () => {
  return (
    <div className="dndnode_container">
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
    </div>
  );
};
export default SidePanel;
