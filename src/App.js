import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [players, setPlayers] = useState(['']);
  const [result, setResult] = useState('');

  const handleChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleAddPlayer = () => {
    setPlayers([...players, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPlayers = players.map(player => player.split(',').map(Number));
    const response = await axios.post('http://localhost:8000/api/game', { players: formattedPlayers });
    setResult(response.data.result);
  };

  return (
    <div className="App">
      <h1>Poker Dice Game</h1>
      <form onSubmit={handleSubmit}>
        {players.map((player, index) => (
          <div key={index}>
            <label>Player {index + 1} Rolls:</label>
            <input
              type="text"
              value={player}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="e.g. 1,2,3,4,5"
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddPlayer}>Add Player</button>
        <button type="submit">Submit</button>
      </form>
      {result && <h2>{result}</h2>}
    </div>
  );
}

export default App;
