import axios from "axios";
import React, { useEffect, useState } from "react";
import Game from "../../components/Game/Game";
import "./Home.css";
const apiURL = process.env.REACT_APP_URL;

export default function Home() {
  const [page, setPage] = useState(1);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(1);
  const [sortBy, setSortBy] = useState("Name");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(
        apiURL +
          "/games?page=" +
          page +
          "&sortBy=" +
          sortBy +
          "&sortOrder=" +
          sortOrder
      )
      .then((data) => {
        setGames(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page, sortOrder, sortBy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(apiURL + "/search?searchQuery=" + searchQuery)
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSort = (type, order) => {
    setSortBy(type);
    if (order) {
      if (order === 1) {
        return setSortOrder(-1);
      }
      if (order === -1) {
        return setSortOrder(1);
      }
    }
    return setSortOrder(1);
  };

  return (
    <div>
      <h1>Games Leaderboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search games"
        />
        <button>Search</button>
      </form>

      {loading && "Loading..."}
      {!loading && (
        <div className="game-header">
          <div
            className="header-column header-name"
            onClick={() => handleSort("Name", sortOrder)}
          >
            Name {sortBy === "Name" && sortOrder === 1 && <span>&uarr;</span>}
            {sortBy === "Name" && sortOrder === -1 && <span>&darr;</span>}
          </div>
          <div
            className="header-column"
            onClick={() => handleSort("Rank", sortOrder)}
          >
            Rank {sortBy === "Rank" && sortOrder === 1 && <span>&uarr;</span>}
            {sortBy === "Rank" && sortOrder === -1 && <span>&darr;</span>}
          </div>
          <div
            className="header-column"
            onClick={() => handleSort("Platform", sortOrder)}
          >
            Platform{" "}
            {sortBy === "Platform" && sortOrder === 1 && <span>&uarr;</span>}
            {sortBy === "Platform" && sortOrder === -1 && <span>&darr;</span>}
          </div>
          <div
            className="header-column"
            onClick={() => handleSort("Publisher", sortOrder)}
          >
            Publisher{" "}
            {sortBy === "Publisher" && sortOrder === 1 && <span>&uarr;</span>}
            {sortBy === "Publisher" && sortOrder === -1 && <span>&darr;</span>}
          </div>
          <div
            className="header-column"
            onClick={() => handleSort("Genre", sortOrder)}
          >
            Genre {sortBy === "Genre" && sortOrder === 1 && <span>&uarr;</span>}
            {sortBy === "Genre" && sortOrder === -1 && <span>&darr;</span>}
          </div>
          <div
            className="header-column"
            onClick={() => handleSort("Global_Sales", sortOrder)}
          >
            Global Sales{" "}
            {sortBy === "Global_Sales" && sortOrder === 1 && (
              <span>&uarr;</span>
            )}
            {sortBy === "Global_Sales" && sortOrder === -1 && (
              <span>&darr;</span>
            )}
          </div>
          <div
            className="header-column header-year"
            onClick={() => handleSort("Year", sortOrder)}
          >
            Year {sortBy === "Year" && sortOrder === 1 && <span>&uarr;</span>}
            {sortBy === "Year" && sortOrder === -1 && <span>&darr;</span>}
          </div>
        </div>
      )}
      {games.map((game) => (
        <Game
          key={game._id}
          game={game}
          sortBy={sortBy}
          sortOrder={sortOrder}
          page={page}
          setGames={setGames}
          setLoading={setLoading}
        />
      ))}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="pagination-button"
        >
          Prev
        </button>
        <button onClick={() => setPage(page + 1)} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
}
