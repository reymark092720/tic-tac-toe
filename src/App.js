import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
};

const TicTacToe = () => {
  const [gameState, setGameState] = useState(initialState);

  const handleClick = (index) => {
    const squares = [...gameState.squares];

    // Return if the square is already filled or the game is already won
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    // Update the square with 'X' or 'O' based on the current turn
    squares[index] = gameState.xIsNext ? 'X' : 'O';

    setGameState({
      squares: squares,
      xIsNext: !gameState.xIsNext,
    });
  };

  const renderSquare = (index) => {
    return (
      <td>
        <button className="btn btn-outline-dark square" onClick={() => handleClick(index)}>
          {gameState.squares[index]}
        </button>
      </td>
    );
  };

  const resetGame = () => {
    setGameState(initialState);
  };

  const winner = calculateWinner(gameState.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!gameState.squares.includes(null)) {
    status = "It's a draw!";
  } else {
    status = 'Next player: ' + (gameState.xIsNext ? 'X' : 'O');
  }

  return (
    <div className="tic-tac-toe container">
      <div className="status">{status}</div>
      <table className="board">
        <tbody>
          <tr>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </tr>
          <tr>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </tr>
          <tr>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </tr>
        </tbody>
      </table>
      <button className="btn btn-dark reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

// Helper function to calculate the winner
const calculateWinner = (squares) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;
