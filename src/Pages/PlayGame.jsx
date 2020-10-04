import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Question from "../Components/Question";
import SuperPower from "../Components/SuperPower";
import CountDownTimer from "../Components/CountdownTimer";

const someQuestions = [
  {
    question: "Who made this?",
    answers: ["Flydiverny", "MrFluFFy", "Abakar", "God"],
    correctAnswer: "MrFluFFy",
  },

  {
    question: "Snus is probably made in...",
    answers: ["Finland", "Norway", "Sweden", "Denmark"],
    correctAnswer: "Sweden",
  },
  {
    question: "Math is hard: 1+3",
    answers: ["13", "31", "2", "4"],
    correctAnswer: "4",
  },
  {
    question: "Who is my brother?",
    answers: ["Flydiverny", "MrFluFFy", "Abakar", "God"],
    correctAnswer: "Flydiverny",
  },
];

const PlayGame = ({ nbrQuestions, addOneCorrect }) => {
  const [nbrAnswered, setNbrAnswered] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [questionSet, setQuestionSet] = useState([]);

  //"load the questions"
  useEffect(() => {
    setQuestionSet(someQuestions);
    setCurrQuestion(someQuestions[0]);
    console.log("i loaded questions");
  }, []);

  //on answer update question and rerender to display next question.
  useEffect(() => {
    setCurrQuestion(questionSet[nbrAnswered]);
  }, [questionSet, nbrAnswered]);

  const answerQuestion = (value) => {
    if (value === currQuestion.correctAnswer) {
      addOneCorrect();
    }

    setNbrAnswered(nbrAnswered + 1);
  };
  //move up stuff below to make it more clear what happens.
  return (
    <div>
      {nbrAnswered === nbrQuestions ? <Redirect to="/stats" /> : null}
      {currQuestion ? (
        <Question answerQuestion={answerQuestion} {...currQuestion} />
      ) : null}
      <CountDownTimer />
      <SuperPower />

      <div>
        Number answered: {nbrAnswered}/{nbrQuestions}
      </div>
    </div>
  );
};

export default PlayGame;
