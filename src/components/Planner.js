import React, { useState } from 'react';
import "./Planner.css";

const Planner = () => {
  const [grid, setGrid] = useState(Array(80).fill(null)); // Initialize grid of 10x8 (80 cells)
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = {
    'red': 'Tomato',
    'green': 'Lettuce',
    'yellow': 'Squash',
    'purple': 'Eggplant',
    'orange': 'Carrot',
    'blue': 'Cucumber'
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleCellClick = (index) => {
    if (selectedColor !== null) {
      const updatedGrid = [...grid];
      updatedGrid[index] = selectedColor;
      setGrid(updatedGrid);
    }
  };

  return (
    <div className="planner-container">
      {/* Legend */}
      <div className="legend">
        <div className="legend-title">Legend</div>
        {Object.keys(colors).map((color) => (
          <div
            key={color}
            className={`legend-item ${selectedColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelection(color)}
          >
            {colors[color]}
          </div>
        ))}
      </div>

      {/* Garden Bed Grid */}
      <div className="grid-container">
        <div className="grid">
          {grid.map((cell, index) => (
            <div
              key={index}
              className="grid-item"
              style={{ backgroundColor: cell || 'white' }}
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
