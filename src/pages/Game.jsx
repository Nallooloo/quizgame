import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlayGame from "./PlayGame";
import Stats from "./Stats";
import Menu from "./Menu";

const Game = () => {
  const [nbrCorrect, setNbrCorrect] = useState(0);
  const nbrQuestions = 4;

  const addOneCorrect = () => {
    setNbrCorrect(nbrCorrect + 1);
  };

  const resetGame = () => {
    setNbrCorrect(0);
  };

  return (
    <Router>
      <Switch>
        <Route path="/play">
          <PlayGame nbrQuestions={nbrQuestions} addOneCorrect={addOneCorrect} />
        </Route>

        <Route path="/stats">
          <Stats
            nbrCorrect={nbrCorrect}
            nbrQuestions={nbrQuestions}
            resetGame={resetGame}
          />
        </Route>
        <Route path="/">
          <Menu />
        </Route>
      </Switch>
    </Router>
  );
};

export default Game;
