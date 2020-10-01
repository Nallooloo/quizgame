import React from "react";
import AnswerCard from "./AnswerCard";
import styled from "styled-components";

const AnswerArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 556px;
  margin: auto;
`;

const Question = ({ question, answers, correctAnswer }) => {
  return (
    <div>
      <h4>{question}</h4>
      <AnswerArea>
        {answers.map((answer, index) => {
          return <AnswerCard answer={answer} key={index} />;
        })}
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
