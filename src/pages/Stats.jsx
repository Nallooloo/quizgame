import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NewGame = styled.div`
  border-radius: 15px;
  padding: 3px;
  width: 250px;
  height: 100px;
  background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 25px;
  border: 1px solid black;

  &:hover {
    background: #1db2ec;
  }
`;

const NoUnderLineLink = styled(Link)`
  text-decoration: none;
`;

const Stats = ({
  nbrCorrect,
  nbrQuestions,
  resetGame,
  nbrMissed,
  answerTimes,
}) => {
  return (
    <div>
      <div>
        <h4>Questions</h4>
        <div>Number correct: {nbrCorrect}</div>
        <div>Number answered: {nbrQuestions}</div>
        <div>Number missed: {nbrMissed}</div>
      </div>

      <div>
        <h4>Speed!</h4>
        <div>
          Fastest answer:
          {answerTimes.length > 0 ? (
            <>{Math.min(...answerTimes).toFixed(2)}s </>
          ) : (
            <>not available</>
          )}
        </div>
        <div>
          Slowest answer:
          {answerTimes.length > 0 ? (
            <>{Math.max(...answerTimes).toFixed(2)}s </>
          ) : (
            <>not available</>
          )}
        </div>
        <div>
          Average:
          {answerTimes.length > 0 ? (
            <>
              {(
                answerTimes.reduce((acc, x) => {
                  return acc + x;
                }) / answerTimes.length
              ).toFixed(2)}
              s
            </>
          ) : (
            <>not available</>
          )}
        </div>
      </div>

      <NoUnderLineLink to="/play" onClick={() => resetGame()}>
        <NewGame>Play agian!</NewGame>
      </NoUnderLineLink>
    </div>
  );
};

export default Stats;
