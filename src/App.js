import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [players, setPlayers] = useState([{ rolls: [], count: 0 }]);
  const [result, setResult] = useState('');
  const [gameFinished, setGameFinished] = useState(false);

  const handleAddPlayer = () => {
    setPlayers([...players, { rolls: [], count: 0 }]);
  };

  const handleRoll = (index) => {
    if (players[index].count < 5) {
      const newPlayers = [...players];
      const roll = Math.floor(Math.random() * 6) + 1;
      newPlayers[index].rolls.push(roll);
      newPlayers[index].count += 1;
      setPlayers(newPlayers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPlayers = players.map(player => player.rolls);
    const response = await axios.post('http://localhost:8000/api/game', { players: formattedPlayers });
    setResult(response.data.result);
    setGameFinished(true);
  };

  const handleReset = () => {
    setPlayers([{ rolls: [], count: 0 }]);
    setResult('');
    setGameFinished(false);
  };

  return (
    <div className="App">
      <h1>Poker Dice Game</h1>
      <form onSubmit={handleSubmit}>
        {players.map((player, index) => (
          <div key={index} className="player">
            <label>Player {index + 1} Rolls:</label>
            <input
              type="text"
              value={player.rolls.join(', ')}
              readOnly
            />
            <button
              type="button"
              onClick={() => handleRoll(index)}
              disabled={player.count >= 5}
            >
              Roll
            </button>
          </div>
        ))}
        <div className="buttons">
          <button type="button" onClick={handleAddPlayer}>Add Player</button>
          <button type="submit" disabled={players.some(player => player.count < 5)}>Submit</button>
          <button type="button" onClick={handleReset} disabled={!gameFinished}>Reset</button>
        </div>
      </form>
      {result && <h2>{result}</h2>}
    </div>
  );
}

export default App;
