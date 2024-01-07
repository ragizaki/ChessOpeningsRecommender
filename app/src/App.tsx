import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [chessUsername, setChessUsername] = useState<string>("");
  const [chessData, setChessData] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (chessUsername === "") {
      alert("Please enter a chess.com username");
      return;
    }
    const res = await fetch(
      `http://127.0.0.1:8000/api/recommend/${chessUsername}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log(data);
    setChessUsername("");
  };

  return (
    <div className="app">
      <h1>Chess Openings Recommender</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-container">
          <label htmlFor="username-input">Chess.com Username:</label>
          <input
            id="username-input"
            type="text"
            value={chessUsername}
            onChange={(e) => setChessUsername(e.target.value)}
          />
        </div>
        <input type="submit" value="Submit" id="submit-button" />
      </form>
    </div>
  );
}

export default App;
