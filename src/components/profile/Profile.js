import React, { useEffect, useContext } from "react";
import { ProfileContext } from "./ProfileProvider.js";
// import "./Profile.css";

export const Profile = () => {
  const { profile, getProfile } = useContext(ProfileContext);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <article className="profile">
      <header className="profile__header">
        <h1>Your Profile</h1>
      </header>
      <section className="profile__info">
        <header className="profile__header">
          <h3>Your Info</h3>
        </header>
        <div className="profile__name">
          Welcome: {profile.gamer && profile.gamer.user.first_name}{" "}
          {profile.gamer && profile.gamer.user.last_name}
        </div>
        <div className="profile__username">
          Username: {profile.gamer && profile.gamer.user.username}
        </div>
        <div className="profile__bio">
          About you: {profile.gamer && profile.gamer.bio}
        </div>
      </section>
      <section className="profile__events">
        <header className="events__header">
          <h3>Your Events</h3>
        </header>
        <div className="events">
          {profile.events.map((event) => {
            return (

              <div key={event.id} className="event">
                <div className="event__title">{event.description}</div>
                <div className="event__game">{event.game.title}</div>
                <div>
                  {event.date} @ {event.time}
                </div>
              </div>

            );
          })}
        </div>
      </section>
    </article>
  );
};