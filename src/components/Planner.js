import React, { useState } from 'react';
import './Planner.css';

const Planner = () => {
  const [grid, setGrid] = useState(Array(80).fill(null)); // Initialize grid of 10x8 (80 cells)
  const [selectedVegetable, setSelectedVegetable] = useState(null);

  const vegetables = {
    'Tomato': '🍅', // Tomato
    'Tomato': '🍅', // Tomato

    'Lettuce': '🥬', // Lettuce
    'Squash': '🧅', // Squash
    'Eggplant': '🍆', // Eggplant
    'Carrot': '🥕', // Carrot
    'Cucumber': '🥒', // Cucumber
  };

  const handleVegetableSelection = (vegetable) => {
    setSelectedVegetable(vegetable);
  };

  const handleCellClick = (index) => {
    if (selectedVegetable !== null) {
      const updatedGrid = [...grid];
      updatedGrid[index] = selectedVegetable;
      setGrid(updatedGrid);
    }
  };

  return (
    <div className="planner-container">
      {/* Legend */}
      <div className="legend-box">
        <div className="legend-title">Legend</div>
        <div className="legend">
          {Object.keys(vegetables).map((vegetable) => (
            <div
              key={vegetable}
              className={`legend-item ${selectedVegetable === vegetable ? 'selected' : ''}`}
              onClick={() => handleVegetableSelection(vegetable)}
            >
              <span
                role="img"
                aria-label={vegetables[vegetable]}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              >
                {vegetables[vegetable]}
              </span>
              <div>{vegetable}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Garden Bed Grid */}
      <div className="grid-container">
        <div className="grid">
          {grid.map((cell, index) => (
            <div
              key={index}
              className="grid-item"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCellClick(index)}
            >
              {cell && (
                <span role="img" aria-label={cell} style={{ fontSize: '24px' }}>
                  {vegetables[cell]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
