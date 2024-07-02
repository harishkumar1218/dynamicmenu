import React from 'react';
import axios from 'axios';

function Tmp() {
  const handleSendData = async () => {
    const data = {
      key1: 'value1',
      key2: 'value2'
    };
    const data2={
      item1:"biryani",
      action:"search"
    }

    try {
      const response = await axios.post('http://localhost:5000/data', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response from Flask:', response.data);
    
    } catch (error) {
      console.error('Error sending data to Flask:', error);
    }
  };


  return (
    <div>
      <h1>React to Flask</h1>
      <button onClick={handleSendData}>Send Data to Flask</button>
    </div>
  );
}

export default Tmp;
