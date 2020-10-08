import React from "react";
import AnswerCard from "../AnswerCard/AnswerCard";
import styled from "styled-components";

const AnswerArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 556px;
  margin: auto;
  align-items: center;
  justify-content: center;
  height: 256px;
`;

const Question = ({
  question,
  answers,
  correctAnswer,
  answerQuestion,
  removedAnswers = [],
  loadingNextQuestion,
}) => {
  return (
    <div>
      <h4>{question}</h4>
      <AnswerArea>
        {loadingNextQuestion ? (
          <p>Get ready for next question! </p>
        ) : (
          answers.map((answer, index) => {
            return (
              <AnswerCard
                answer={answer}
                key={index}
                choiceMade={answerQuestion}
                avialable={removedAnswers.indexOf(answer) === -1}
              />
            );
          })
        )}
      </AnswerArea>
    </div>
  );
};

/* {answers
          .map((ans) => ({ sort: Math.random(), value: { ans } }))
          .sort((ansA, ansB) => ansA.sort - ansB.sort)
          .map((ans) => ans.value)
          .map((ans, index) => {
            return <AnswerCard answer={ans} key={index} />;
          })} */

export default Question;
