import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Question from "../components/Question/Question";
import SuperPower from "../components/SuperPower/SuperPower";
import CountDownTimer from "../components/CountdownTimer/CountdownTimer";
import useInterval from "../hooks/useInterval";
import someQuestions from "../data/someQuestions.json";
import somePowers from "../data/somePowers.json";

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
  const [powersAvailable, setPowersAvailable] = useState({ somePowers });
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
        setTimeRemaining(timeRemaining + superPowerExtendTime);
        break;

      case "50-50":
        removeAnswers();
        break;
      default:
        break;
    }
  };

  const removeAnswers = () => {
    let filterAns = [];
    console.log(currQuestion.answers.length);
    console.log(currQuestion.answers);
    if (currQuestion.answers.length === 1) {
      return;
    }
    while (currQuestion.answers.length / 2 > filterAns.length) {
      console.log("im looping");
      let rng = Math.floor(Math.random() * currQuestion.answers.length);
      if (
        currQuestion.answers[rng] !== currQuestion.correctAnswer &&
        filterAns.indexOf(currQuestion.answers[rng]) === -1
      ) {
        filterAns.push(currQuestion.answers[rng]);
        console.log(filterAns);
      }
    }

    if (filterAns) {
      let newAns = currQuestion.answers.filter(
        (ans) => filterAns.indexOf(ans) === -1
      );

      //ugly fix to get rid of issues with modifying "currQuestion", better fix implement a deep copy on load?
      let tmp = {};
      tmp.answers = newAns;
      tmp.question = currQuestion.question;
      tmp.correctAnswer = currQuestion.correctAnswer;
      // currQuestion.answers = newAns;
      setCurrQuestion(tmp);
    }
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

      <SuperPower spendSuper={usePower} superPowers={somePowers} />

      <div>
        Number answered: {nbrAnswered}/{nbrQuestions}
      </div>
    </div>
  );
};

export default PlayGame;
