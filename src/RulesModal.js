import React from 'react';
import './RulesModal.css';

const RulesModal = ({ show, handleClose }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Game Rules</h2>
                <p>The game is similar to poker but played with a six-faced dice.</p>
                <ul>
                    <li>Each player gets 5 chances to roll the die.</li>
                    <li>Their score is recorded for each roll.</li>
                    <li>The winner is determined based on the following rules:</li>
                    <ul>
                        <li><strong>5 of a kind:</strong> e.g., [3, 3, 3, 3, 3]</li>
                        <li><strong>4 of a kind:</strong> e.g., [1, 1, 4, 1, 1]</li>
                        <li><strong>Full House:</strong> e.g., [2, 3, 2, 3, 2]</li>
                        <li><strong>Straight:</strong> e.g., [1, 2, 3, 4, 5]</li>
                        <li><strong>Pair:</strong> e.g., [1, 1, 3, 4, 4]</li>
                    </ul>
                    <li>If none of the patterns match, or if multiple players match the same pattern, the tie is broken by the sum of scores.</li>
                </ul>
            </div>
        </div>
    );
};

export default RulesModal;
