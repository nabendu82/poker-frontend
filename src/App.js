import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [players, setPlayers] = useState([
        { rolls: [], isRolling: false },
        { rolls: [], isRolling: false },
        { rolls: [], isRolling: false }
    ]);

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [winner, setWinner] = useState('');

    useEffect(() => {
        const allPlayersRolled = players.every(player => player.rolls.length === 5);
        setIsSubmitEnabled(allPlayersRolled);
    }, [players]);

    const rollDice = (playerIndex) => {
        setPlayers(players.map((player, index) => {
            if (index === playerIndex && player.rolls.length < 5) {
                player.isRolling = true;
            }
            return player;
        }));

        setTimeout(() => {
            setPlayers(players.map((player, index) => {
                if (index === playerIndex && player.rolls.length < 5) {
                    const newRoll = Math.floor(Math.random() * 6) + 1;
                    player.rolls = [...player.rolls, newRoll];
                    player.isRolling = false;
                }
                return player;
            }));
        }, 500);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/game', { players: players.map(player => player.rolls) });
            setWinner(response.data.result);
        } catch (error) {
            console.error('Error submitting game data:', error);
        }
    };

    const handleReset = () => {
        setPlayers(players.map(() => ({ rolls: [], isRolling: false })));
        setWinner('');
        setIsSubmitEnabled(false);
    };

    return (
        <div className="game">
            <h1 style={{ color: 'purple' }}>Poker Dice Game</h1>
            {players.map((player, index) => (
                <div key={index} className="player">
                    <h2>Player {index + 1}</h2>
                    <div>
                        {player.rolls.map((roll, rollIndex) => (
                            <span key={rollIndex} className="roll-dice">{roll}</span>
                        ))}
                        {player.isRolling && <span className="roll-dice rolling">🎲</span>}
                    </div>
                    <button
                        onClick={() => rollDice(index)}
                        disabled={player.rolls.length >= 5 || isSubmitEnabled}
                    >
                        Roll
                    </button>
                </div>
            ))}
            <button onClick={handleSubmit} disabled={!isSubmitEnabled}>Submit</button>
            <button onClick={handleReset} disabled={winner === ''}>Reset</button>
            {winner && <h2>{winner}</h2>}
        </div>
    );
};

export default App;
