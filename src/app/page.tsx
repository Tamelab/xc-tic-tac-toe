import Game from "../components/Game";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Tic Tac Toe</h1>
      <Game />
    </main>
  );
}