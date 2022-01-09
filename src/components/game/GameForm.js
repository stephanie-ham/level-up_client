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

  /*
        Get categories on initialization so that the <select>
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
  // const changeGameTitleState = (event) => {
  //   const newGameState = { ...currentGame };
  //   newGameState.title = event.target.value;
  //   setCurrentGame(newGameState);
  // };

  // const changeGameMakerState = (event) => {
  //   const newGameState = { ...currentGame };
  //   newGameState.maker = event.target.value;
  //   setCurrentGame(newGameState);
  // };

  // const changeGamePlayersState = (event) => {
  //   const newGameState = { ...currentGame };
  //   newGameState.numberOfPlayers = event.target.value;
  //   setCurrentGame(newGameState);
  // };

  // const changeGameSkillLevelState = (event) => {
  //   const newGameState = { ...currentGame };
  //   newGameState.skillLevel = event.target.value;
  //   setCurrentGame(newGameState);
  // };

  // const changeCategoryState = (event) => {
  //   const newGameState = { ...currentGame };
  //   newGameState.categoryId = event.target.value;
  //   setCurrentGame(newGameState);
  // };
  /* REFACTOR CHALLENGE END */

  // const changeGameState = (event) => {
  //   const newGameState = event.target.value;

  //   setCurrentGame({
  //     ...currentGame,
  //     [event.target.name]: newGameState
  //   });
  // }

  const changeGameState = (event) => {
    const newGameState = {...currentGame}
    
    newGameState[event.target.name] = event.target.value
    
    setCurrentGame(newGameState)
  }

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
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            required
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players: </label>
          <input
            type="number"
            placeholder="Minimum 2 Players"
            min="2"
            step="1"
            name="numberOfPlayers"
            required
            className="form-control"
            defaultValue={currentGame.numberOfPlayers}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level: </label>
          <input
            name="skillLevel"
            type="number"
            placeholder="Select a level 1-10"
            min="1"
            // max="5"
            step="1"
            required
            className="form-control"
            defaultValue={currentGame.skillLevel}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="categoryId">Category: </label>
          <select
            name="categoryId"
            required
            className="form-control"
            defaultValue={currentGame.categoryId}
            onChange={changeGameState}>
              <option value="0">Select a category...</option>
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
        Create Game
      </button>
    </form>
  );
};