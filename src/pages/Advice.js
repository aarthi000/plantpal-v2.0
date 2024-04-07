import React, { useState } from 'react';
import './Advice.css'; // Import CSS file for styling
// Utilizing Google Deepmind's Generative AI Gemini model 

const Advice = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {

      
      const prompt = inputText;
      /*
        - https://ai.google.dev/ 
        
        Go to this site and click on generate API Key with Google Studios. Sign into your Google account.
      */
      const api = 'XXX'; // Enter your API KEY 

      const { GoogleGenerativeAI } = require("@google/generative-ai"); 

      const genAI = new GoogleGenerativeAI(api); 

      const model = genAI.getGenerativeModel( {model: "gemini-pro"}); 
      const result = await model.generateContent([prompt]);
      console.log("RESPONSE AI: ", result.response.text());
      
      setOutputText( result.response.text()); // data.choices[0].text.trim());
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setOutputText('Error fetching data. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="advice-container">
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

      {isLoading && <p>Loading...</p>}

      {outputText && (
        <div className="output-container">
          <div className="output-box">
            <h1 className="result-heading">Result</h1>
            <p className="output-text">{outputText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advice;
