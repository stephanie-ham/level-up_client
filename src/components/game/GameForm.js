import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";

export const GameForm = () => {
  const history = useHistory();
  const { createGame, getCategories, categories } = useContext(GameContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    categoryId: 0,
  });

  const [category, setCategory] = useState(
      
  )

  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getCategories();
  }, []);

  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
  const changeGameTitleState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.title = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameMakerState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.maker = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGamePlayersState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.numberOfPlayers = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameSkillLevelState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.skillLevel = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeCategoryState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.categoryId = event.target.value;
    setCurrentGame(newGameState);
  };
  /* REFACTOR CHALLENGE END */

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameTitleState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Maker: </label>
          <input
            type="text"
            name="maker"
            required
            autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameMakerState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Number of Players: </label>
          <input
            type="number"
            placeholder="Minimum 2 Players"
            min="2"
            step="1"
            name="number-of-players"
            required
            autoFocus
            className="form-control"
            value={currentGame.numberOfPlayers || ''}
            onChange={changeGamePlayersState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Skill Level: </label>
          <input
            type="number"
            placeholder="Select a level 1-10"
            min="1"
            max="5"
            step="1"
            name="skill-level"
            required
            autoFocus
            className="form-control"
            value={currentGame.skillLevel || '1'}
            onChange={changeGameSkillLevelState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Category: </label>
          <select
            name="category"
            required
            autoFocus
            className="form-control"
            value={currentGame.categoryId}
            onChange={changeCategoryState}>
              <option value="0">Select a Category</option>
              {categories.map(c => (
                  <option key={c.id} value={c.id}>
                      {c.label}
                  </option>
              ))}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            skillLevel: parseInt(currentGame.skillLevel),
            categoryId: parseInt(currentGame.categoryId),
          };

          // Send POST request to your API
          createGame(game).then(() => history.push("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};