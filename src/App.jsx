// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import the CSS styles

function Cell({ onClick, value }) {
  return (
    <button className={`cell ${value ? "cell--highlighted" : ""}`} onClick={onClick}>
      {value}
    </button>
  );
}

function GameBoard() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);

  const handleCellClick = (index) => {
    const updatedCells = cells.slice();

    if (determineWinner(updatedCells) || updatedCells[index]) {
      return;
    }

    updatedCells[index] = isNextX ? 'X' : 'O';
    setCells(updatedCells);
    setIsNextX(!isNextX);
  };

  const winner = determineWinner(cells);
  const gameStatus = winner
    ? `Winner: ${winner}`
    : `Next player: ${isNextX ? 'X' : 'O'}`;

  const handleRestart = () => {
    setIsNextX(true);
    setCells(Array(9).fill(null));
  };

  const renderCell = (index) => (
    <Cell value={cells[index]} onClick={() => handleCellClick(index)} />
  );

  return (
    <div className="board">
      <div className="board-row">
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </div>
      <div className="board-row">
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </div>
      <div className="board-row">
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
      <div className="game-status">{gameStatus}</div>
      <button className="restart-btn" onClick={handleRestart}>Restart Game</button>
    </div>
  );
}

function determineWinner(cells) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function App() {
  return <GameBoard />;
}

export default App;
