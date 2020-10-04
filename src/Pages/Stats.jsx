import React from "react";
import { Link } from "react-router-dom";

const Stats = ({ nbrCorrect, nbrQuestions, resetGame }) => {
  return (
    <div>
      <div>Number correct: {nbrCorrect}</div>
      <div>Number answered: {nbrQuestions}</div>
      <Link to="/play" onClick={() => resetGame()}>
        Play agian!
      </Link>
    </div>
  );
};

export default Stats;
