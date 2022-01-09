import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "../game/GameProvider";
import { EventContext } from "./EventProvider";

export const EventForm = () => {
  const history = useHistory();
  const { createEvent } = useContext(EventContext)
  const { getGames, games } = useContext(GameContext)

  const [currentEvent, setCurrentEvent] = useState({
    time: "",
    date: "",
    description: "",
    gameId: 0,
  });

  useEffect(() => {
    getGames();
  }, []);

  const changeEventState = (domEvent) => {
    const newEventState = {...currentEvent};
    
    newEventState[domEvent.target.name] = domEvent.target.value;
    
    setCurrentEvent(newEventState)
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input 
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={currentEvent.description}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            name="gameId"
            className="form-control"
            defaultValue={currentEvent.gameId}
            onChange={changeEventState}
          >
            <option value="0">Select a game...</option>
            {games.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input 
            type="date"
            name="date"
            required
            className="form-control"
            defaultValue={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input 
            type="time"
            name="time"
            required
            className="form-control"
            defaultValue={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>


      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          const event = {
            gameId: parseInt(currentEvent.gameId),
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time
          };

          createEvent(event).then(() => history.push("/events"));
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};




// event.time = request.data["time"]
// event.date = request.data["date"]
// event.description = request.data["description"]
// event.organizer = gamer