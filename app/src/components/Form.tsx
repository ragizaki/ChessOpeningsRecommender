import { useState } from "react";
import { RecommendedOpenings } from "../App";

interface FormProps {
  setOpenings: React.Dispatch<React.SetStateAction<RecommendedOpenings | null>>;
}

export default function Form({ setOpenings }: FormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [chessUsername, setChessUsername] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    setOpenings(null);
    e.preventDefault();
    if (chessUsername === "") {
      alert("Please enter a chess.com username");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/api/recommend/${chessUsername}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setOpenings(data);
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    }

    setLoading(false);
    setChessUsername("");
  };

  return (
    <div className="w-fit h-fit border-2 rounded-md p-4">
      <h1 className="tracking-wide text-xl font-semibold mb-2">
        Chess Openings Recommender
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Chess.com Username
          </label>
          <input
            id="username"
            placeholder="GMHikaru"
            value={chessUsername}
            onChange={(e) => setChessUsername(e.target.value)}
            className="w-full mt-1 rounkded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
