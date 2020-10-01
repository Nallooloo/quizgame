import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Question from "../Components/Question";
import SuperPower from "../Components/SuperPower";

const someQuestion = [
  {
    question: "Who made this?",
    answers: ["Flydiverny", "MrFluFFy", "Abakar", "God"],
    correctAnswer: "MrFluFFy",
  },
  {
    question: "Who made this yes?",
    answers: ["Flydiverny", "MrFluFFy", "Abakar", "God"],
    correctAnswer: "MrFluFFy",
  },
];

const PlayGame = () => {
  const [answered, setAnswered] = useState("");
  const [nbrCorrect, setNbrCorrect] = useState(0);
  const [nbrAnswered, setNbrAnswered] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(someQuestion[0]);
  const [questionSet, setQuestionSet] = useState([]);
  const nbrQuestions = 2;

  //"load the questions"
  useEffect(() => {
    setQuestionSet(someQuestion);
  }, []);

  //on answer update question and rerender to display next question.
  useEffect(() => {
    setCurrQuestion(questionSet[nbrAnswered]);
  }, [questionSet, nbrAnswered]);

  const answerQuestion = (value) => {
    setAnswered(value);
    if (value === currQuestion.correctAnswer) {
      setNbrCorrect(nbrCorrect + 1);
    }

    setNbrAnswered(nbrAnswered + 1);
  };

  return (
    <div>
      {nbrAnswered === nbrQuestions ? <Redirect to="/stats" /> : null}
      {currQuestion ? (
        <Question answerQuestion={answerQuestion} {...currQuestion} />
      ) : null}
      <SuperPower />
      <div>Number correct: {nbrCorrect}</div>
      <div>Number answered: {nbrAnswered}</div>
    </div>
  );
};

export default PlayGame;
