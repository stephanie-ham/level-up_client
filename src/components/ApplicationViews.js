import React from "react";
import { Route } from "react-router-dom";
import { GameForm } from "./game/GameForm.js";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { EventForm } from "./event/EventForm.js";
import { EventList } from "./event/EventList.js";
import { EventProvider } from "./event/EventProvider.js";
import { Profile } from "./profile/Profile.js";
import { ProfileProvider } from "./profile/ProfileProvider.js";
import "../styles/list.css"

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 10rem",
          lineHeight: "1.75rem",
        }}
      >
        <GameProvider>
          <EventProvider>
            <ProfileProvider>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/games">
                <GameList />
              </Route>
              <Route exact path="/games/new">
                <GameForm />
              </Route>
              <Route exact path="/events">
                <EventList />
              </Route>
              <Route exact path="/events/new">
                <EventForm />
              </Route>
            </ProfileProvider>
          </EventProvider>
        </GameProvider>
      </main>
    </>
  );
};