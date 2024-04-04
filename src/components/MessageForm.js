// MessageForm.js
import React, { useState } from 'react';

function MessageForm({ onAddMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default MessageForm;
