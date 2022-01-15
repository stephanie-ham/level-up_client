import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider.js";

export const EventList = (props) => {
  const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext);
  const history = useHistory();

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <article className="events">
      <header className="list__header">
        <h1>Level Up Events</h1>
      </header>
      <div className="button__container">
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/events/new" });
          }}
        >
          Schedule New Event
        </button>
      </div>
      {events.map((event) => {
        // const attendees = profile.events.some((evt) => evt.id === event.id);
        return (
          <section key={event.id} className="event">

            <div className="event__title">{event.description}</div>
            <div>
              <div className="event__game">{event.game.title}</div>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              @ {event.time}
            </div>
            {event.joined ? (
              <button
                className="btn btn-3"
                onClick={() => leaveEvent(event.id)}
              >
                Leave
              </button>
            ) : (
              <button className="btn btn-2" onClick={() => joinEvent(event.id)}>
                Join
              </button>
            )}
          </section>
        );
      })}
    </article>
  );
};