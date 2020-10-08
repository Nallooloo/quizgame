import React from "react";
import { Link } from "react-router-dom";

const Stats = ({
  nbrCorrect,
  nbrQuestions,
  resetGame,
  nbrMissed,
  answerTimes,
}) => {
  return (
    <div>
      <div>Number correct: {nbrCorrect}</div>
      <div>Number answered: {nbrQuestions}</div>
      <div>Number missed: {nbrMissed}</div>
      {answerTimes.map((time, index) => {
        return <div key={index}>{time.toFixed(1)}</div>;
      })}
      <Link to="/play" onClick={() => resetGame()}>
        Play agian!
      </Link>
    </div>
  );
};

export default Stats;
