import React, { useState } from 'react';
// Import Tailwind CSS directly
// Removed './Advice.css' import

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
    <div className="bg-[#151321] min-h-screen">
      <div className='flex justify-between items-center align-center px-12 py-6'>
          <img src="./plantpallogo.png" alt="leaf" className="h-8"/>

          <div className='flex gap-4'>
            <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold text-xs" > My Profile</button>
            <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold text-xs" >💭 Get Advice</button>
            <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold text-xs">📝 My Journal</button>
            <div className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold w-[100px] text-xs font-semibold">
                <button >logout</button>
          </div>
          </div>
      </div>

      <div className="flex justify-center">
          <div className="flex gap-24">

          </div>
      </div>

      <div className="flex flex-col items-center justify-center pt-24 px-24">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-[#151321] mb-6">Gardening Advice</h1>
          <form onSubmit={handleSubmit} className="mb-6">
            <label htmlFor="promptInput" className="block text-[#151321] text-sm font-semibold mb-2">Enter your gardening question:</label>
            <input
              type="text"
              id="promptInput"
              value={inputText}
              onChange={handleInputChange}
              className="block w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              placeholder="E.g., How to grow tomatoes?"
              required
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:bg-green-600">Get Advice</button>
          </form>

          {isLoading && <p>Loading...</p>}

          {outputText && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-xl font-bold text-[#151321] mb-4">Result</h1>
              <p className="text-[#151321]">{outputText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Advice;
