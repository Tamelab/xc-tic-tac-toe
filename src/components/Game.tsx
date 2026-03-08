"use client";

import { useState, useEffect } from "react";
import Board from "./Board";

const moveOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];

export default function Game() {

  const [squares, setSquares] = useState<string[]>(Array(9).fill("-"));
  const [xIsNext, setXIsNext] = useState(true);
  const [player, setPlayer] = useState<"X" | "O">("X");

  const winner = calculateWinner(squares);

  function handleClick(i: number) {

    if (squares[i] !== "-" || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill("-"));
    setXIsNext(true);
  }

  useEffect(() => {

    if (!xIsNext && !winner) {

      const timer = setTimeout(() => {
        const move = findBestMove(squares);

        if (move !== null) {
          const newSquares = squares.slice();
          newSquares[move] = "O";
          setSquares(newSquares);
          setXIsNext(true);
        }
      }, 0);

      return () => clearTimeout(timer);
    }

  }, [squares, xIsNext, winner]);

  function switchPlayer() {

    const move = findBestMove(squares);

    if (move !== null) {

      const newSquares = squares.slice();
      newSquares[move] = player;

      setSquares(newSquares);
      setPlayer(player === "X" ? "O" : "X");

    }
  }

  const status = winner
    ? "Winner: " + winner
    : squares.includes("-")
    ? "Next player: " + (xIsNext ? "X" : "O")
    : "Draw";

  return (
    <div>

      <Board squares={squares} onClick={handleClick} />

      <p>{status}</p>

      <button onClick={resetGame} style={{ marginRight: "10px" }}>
        Reset
      </button>

      <button onClick={switchPlayer}>
        Switch to Player {player}
      </button>

    </div>
  );
}

function calculateWinner(squares: string[]) {

  const re =
    /^(?:(?:...){0,2}([OX])\1\1|.{0,2}([OX])..\2..\2|([OX])...\3...\3|..([OX]).\4.\4)/;

  const str = squares.join("");

  const match = re.exec(str);

  if (!match) return null;

  return match[1] || match[2] || match[3] || match[4];
}

function findBestMove(board: string[]) {

  for (let i = 0; i < board.length; i++) {

    if (board[i] === "-") {

      const copy = [...board];
      copy[i] = "O";

      if (calculateWinner(copy) === "O") return i;
    }
  }

  for (let i = 0; i < board.length; i++) {

    if (board[i] === "-") {

      const copy = [...board];
      copy[i] = "X";

      if (calculateWinner(copy) === "X") return i;
    }
  }

  for (const i of moveOrder) {
    if (board[i] === "-") return i;
  }

  return null;
}

function minimax(board: string[], depth: number, isMaximizing: boolean) {

  const winner = calculateWinner(board);

  if (winner === "X") return 10 - depth;
  if (winner === "O") return depth - 10;
  if (!board.includes("-")) return 0;

  if (isMaximizing) {

    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {

      if (board[i] === "-") {

        board[i] = "X";

        const score = minimax(board, depth + 1, false);

        board[i] = "-";

        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;

  } else {

    let bestScore = Infinity;

    for (let i = 0; i < board.length; i++) {

      if (board[i] === "-") {

        board[i] = "O";

        const score = minimax(board, depth + 1, true);

        board[i] = "-";

        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore;
  }
}