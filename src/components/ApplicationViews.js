import React from "react";
import { Route } from "react-router-dom";
import { GameForm } from "./game/GameForm.js";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { EventList } from "./event/EventList.js";
import { EventProvider } from "./event/EventProvider.js";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <Route exact path="/">

        </Route>
        <GameProvider>
          <EventProvider>
            <Route exact path="/games">
              <GameList />
            </Route>
            <Route exact path="/games/new">
              <GameForm />
            </Route>
            <Route exact path="/events">
              <EventList />
            </Route>
          </EventProvider>
        </GameProvider>
      </main>
    </>
  );
};