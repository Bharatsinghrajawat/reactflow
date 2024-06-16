const NodeEditor = ({ nodeProps, handleChange, handleSubmit }) => {
  return (
    <div className="node-editor">
      <h3>Node</h3>
      <h3>Node Property</h3>
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
          type="number"
          name="height"
          value={nodeProps.height}
          onChange={handleChange}
        />
      </label>
      <label>
        Width:
        <input
          type="number"
          name="width"
          value={nodeProps.width}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
export default NodeEditor;
