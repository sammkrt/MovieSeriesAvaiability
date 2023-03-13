import React, { useState } from 'react';

function App() {
  const [term, setTerm] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5297/WeatherForecast?term=${term}%20bad`);
    const data = await response.json();
    setDisplayName(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search Term:
          <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      {displayName && <p>Display Name: {displayName}</p>}
    </div>
  );
}

export default App;