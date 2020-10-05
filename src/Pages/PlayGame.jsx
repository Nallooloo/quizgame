import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Question from "../components/Question/Question";
import SuperPower from "../components/SuperPower/SuperPower";
import CountDownTimer from "../components/CountdownTimer/CountdownTimer";
import useInterval from "../hooks/useInterval";

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

const powers = [
  {
    name: "Extend Time",
  },
  { name: "50-50" },
];

const PlayGame = ({
  nbrQuestions,
  addOneCorrect,
  defaultTime = 15,
  superPowerExtendTime = 10,
}) => {
  const [nbrAnswered, setNbrAnswered] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [questionSet, setQuestionSet] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(defaultTime);
  const [powersAvailable, setPowersAvailable] = useState({ powers });
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

  useInterval(() => {
    // Your custom logic here
    setTimeRemaining(timeRemaining - 0.01);
  }, 10);
  const answerQuestion = (value) => {
    if (value === currQuestion.correctAnswer) {
      addOneCorrect();
    }

    setNbrAnswered(nbrAnswered + 1);
  };

  const usePower = (power) => {
    switch (power) {
      case "Extend Time":
        setTimeRemaining(timeRemaining + 10);
        break;

      case "50-50":
        break;
      default:
        break;
    }
  };

  const extendTime = () => {
    setTimeRemaining(timeRemaining + superPowerExtendTime);
  };
  //move up stuff below to make it more clear what happens.
  return (
    <div>
      {nbrAnswered === nbrQuestions ? <Redirect to="/stats" /> : null}
      {currQuestion ? (
        <Question answerQuestion={answerQuestion} {...currQuestion} />
      ) : null}
      <CountDownTimer
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
      />

      <SuperPower spendSuper={usePower} superPowers={powers} />

      <div>
        Number answered: {nbrAnswered}/{nbrQuestions}
      </div>
    </div>
  );
};

export default PlayGame;
