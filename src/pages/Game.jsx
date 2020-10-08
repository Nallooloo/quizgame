import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlayGame from "./PlayGame";
import Stats from "./Stats";
import Menu from "./Menu";

const Game = () => {
  const [nbrCorrect, setNbrCorrect] = useState(0);
  const [nbrMissed, setNbrMissed] = useState(0);
  const [answerTimes, setAnswerTimes] = useState([]);
  const nbrQuestions = 4;

  const addOneCorrect = () => {
    setNbrCorrect(nbrCorrect + 1);
  };

  const addOneMissed = () => {
    setNbrMissed(nbrMissed + 1);
  };

  const resetGame = () => {
    setNbrCorrect(0);
    setNbrMissed(0);
  };

  const addAnswerTime = (time) => {
    setAnswerTimes([...answerTimes, time]);
  };

  return (
    <Router>
      <Switch>
        <Route path="/play">
          <PlayGame
            nbrQuestions={nbrQuestions}
            addOneCorrect={addOneCorrect}
            addOneMissed={addOneMissed}
            addAnswerTime={addAnswerTime}
          />
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
