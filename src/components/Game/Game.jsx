import axios from "axios";
import React, { useState } from "react";
import "./Game.css";

const apiURL = process.env.REACT_APP_URL;

export default function Game({
  game,
  sortBy,
  sortOrder,
  page,
  setGames,
  setLoading,
}) {
  const [edit, setEdit] = useState(false);
  const [updatedGame, setUpdatedGame] = useState({ ...game });
  const handleChange = (e) => {
    const newUpdated = { ...updatedGame };
    newUpdated[e.target.name] = e.target.value;
    setUpdatedGame(newUpdated);
  };

  const handleSubmit = () => {
    axios
      .post(apiURL + "/games/" + game._id, updatedGame)
      .then((res) => {
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
      })
      .then(() => setEdit(false))
      .catch((err) => console.log(err));
  };
  return (
    <>
      {edit ? (
        <div className="game">
          <div className="column">
            <input
              onChange={handleChange}
              type="text"
              name="Name"
              value={updatedGame.Name}
            />
          </div>
          <div className="column">
            <input
              onChange={handleChange}
              type="number"
              name="Rank"
              value={updatedGame.Rank}
            />
          </div>
          <div className="column">
            <input
              onChange={handleChange}
              type="text"
              name="Platform"
              value={updatedGame.Platform}
            />
          </div>
          <div className="column">
            <input
              onChange={handleChange}
              type="text"
              name="Publisher"
              value={updatedGame.Publisher}
            />
          </div>
          <div className="column">
            <input
              onChange={handleChange}
              type="text"
              name="Genre"
              value={updatedGame.Genre}
            />
          </div>
          <div className="column">
            <input
              onChange={handleChange}
              type="number"
              name="Global_Sales"
              value={updatedGame.Global_Sales}
            />
          </div>
          <div className="column year">
            <input
              onChange={handleChange}
              type="number"
              name="Year"
              value={updatedGame.Year}
            />
            <button onClick={handleSubmit} className="edit-button">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="game">
          <div className="column name">{game.Name}</div>
          <div className="column">{game.Rank}</div>
          <div className="column">{game.Platform}</div>
          <div className="column">{game.Publisher}</div>
          <div className="column">{game.Genre}</div>
          <div className="column ">{game.Global_Sales}</div>
          <div className="column  year">
            {game.Year}
            <button onClick={() => setEdit(true)} className="edit-button">
              Edit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
