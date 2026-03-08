import Square from "./Square";

type Props = {
  squares: string[];
  onClick: (i: number) => void;
};

export default function Board({ squares, onClick }: Props) {

  function renderSquare(i: number) {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  return (
    <div>
      <div>{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
      <div>{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
      <div>{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
    </div>
  );
}