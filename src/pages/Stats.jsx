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
      <div>Fastest answer: {Math.min(...answerTimes).toFixed(2)}s</div>
      <div>Slowest answer: {Math.max(...answerTimes).toFixed(2)}s</div>
      <div>
        Average:
        {answerTimes.reduce((acc, x) => {
          return acc + x;
        }) / answerTimes.length}
        s
      </div>
      {answerTimes.map((time, index) => {
        return <div key={index}>{time.toFixed(2)}</div>;
      })}
      <Link to="/play" onClick={() => resetGame()}>
        Play agian!
      </Link>
    </div>
  );
};

export default Stats;
