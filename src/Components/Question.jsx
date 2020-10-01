import React from "react";
import AnswerCard from "./AnswerCard";

const Question = ({ question, answers, correctAnswer }) => {
  return (
    <div>
      <h4>{question}</h4>
      <div>
        {answers.map((answer, index) => {
          return <AnswerCard answer={answer} key={index} />;
        })}
      </div>
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
