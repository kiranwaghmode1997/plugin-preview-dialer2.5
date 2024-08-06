import React from 'react'

const TestComponent = ({data}) => {
    console.log("inside test component =======>> "+data);
  
    const entries = Object.entries(data);
    console.log("entried test component =======>> "+ entries)

    return (
      <div>
        <h2>Data List</h2>
        <ul>
          {entries.map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value || '(empty)'}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default TestComponent