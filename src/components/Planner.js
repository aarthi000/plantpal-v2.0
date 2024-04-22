import React, { useState } from 'react';
import './Planner.css';

const Planner = () => {
  // Default grid size in feet
  const defaultWidthFeet = 10;
  const defaultHeightFeet = 8;
  const cellSizeFeet = 1; // Each grid cell represents 1 foot

  // State to manage grid cells and selected vegetable
  const [grid, setGrid] = useState(Array(defaultWidthFeet * defaultHeightFeet).fill(null));
  const [selectedVegetable, setSelectedVegetable] = useState(null);

  // Vegetables with corresponding emojis
  const vegetables = {
    'Tomato': '🍅',
    'Lettuce': '🥬',
    'Squash': '🧅',
    'Eggplant': '🍆',
    'Carrot': '🥕',
    'Cucumber': '🥒',
    'Bell Pepper': '🫑', // New vegetable
    'Broccoli': '🥦', // New vegetable
    'Potato': '🥔', // New vegetable
    'Corn': '🌽', // New vegetable
    'Radish': '🫒', // New vegetable
  };

  // Handle vegetable selection from legend
  const handleVegetableSelection = (vegetable) => {
    setSelectedVegetable(vegetable);
  };

  // Handle cell click in the grid
  const handleCellClick = (index) => {
    if (selectedVegetable !== null) {
      const updatedGrid = [...grid];
      updatedGrid[index] = selectedVegetable;
      setGrid(updatedGrid);
    }
  };

  // Handle form submission to update grid size
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const widthFeet = parseInt(formData.get('widthFeet'));
    const heightFeet = parseInt(formData.get('heightFeet'));

    if (!isNaN(widthFeet) && !isNaN(heightFeet) && widthFeet > 0 && heightFeet > 0) {
      const columns = widthFeet / cellSizeFeet;
      const rows = heightFeet / cellSizeFeet;
      setGrid(Array(columns * rows).fill(null));
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

      {/* Grid Size Form */}
      <div className="grid-size-form-container">
        <div className="grid-size-form-box">
          <form onSubmit={handleFormSubmit} className="grid-size-form">
            <label>
              Width (feet):{' '}
              <input type="number" name="widthFeet" defaultValue={defaultWidthFeet} step="1" min="1" />
            </label>
            <br />
            <label>
              Height (feet):{' '}
              <input type="number" name="heightFeet" defaultValue={defaultHeightFeet} step="1" min="1" />
            </label>
            <br />
            <button type="submit" className="set-grid-button">Set Grid Size</button>
          </form>
        </div>
      </div>

      {/* Garden Bed Grid */}
      <div className="grid-container">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${defaultWidthFeet / cellSizeFeet}, 40px)`,
            gridTemplateRows: `repeat(${defaultHeightFeet / cellSizeFeet}, 40px)`,
          }}
        >
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
