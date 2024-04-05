import React, { useState } from 'react';
import './Advice.css'; // Import CSS file for styling

const Advice = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add code here to process the input text
    // using OpenAI's API
    console.log('Input text:', inputText);
    // Clear input after submitting
    setInputText('');
  };

  return (
    <div className="advice-container">
      <div className="advice-description">
        <p>
          Welcome to PlantPal's gardening advice page! Have a question about gardening? 
          Enter your question below and our AI assistant will provide you with advice!
        </p>
      </div>
      <div className="advice-form">
        <h1 className="advice-heading">Gardening Advice</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="promptInput" className="input-label">Enter your gardening question:</label>
          <input
            type="text"
            id="promptInput"
            value={inputText}
            onChange={handleInputChange}
            className="input-field"
            placeholder="E.g., How to grow tomatoes?"
            required
          />
          <button type="submit" className="submit-button">Get Advice</button>
        </form>
      </div>
    </div>
  );
};

export default Advice;
