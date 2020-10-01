import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import PlayGame from "./PlayGame";
import Menu from "./Menu";

const Game = () => {
  return (
    <Router>
      <Switch>
        <Route path="/play">
          <PlayGame />
        </Route>
        <Route path="/">
          <Menu />
        </Route>
      </Switch>
    </Router>
  );
};

export default Game;
