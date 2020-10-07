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
  const [powersUsed, setPowersUsed] = useState([]);
  const [removedAnswers, setRemovedAnswers] = useState([]);
  //"load the questions"
  useEffect(() => {
    setQuestionSet(someQuestions);
    setCurrQuestion(someQuestions[0]);
    console.log("i loaded questions");
  }, []);

  //on answer update question and rerender to display next question.
  useEffect(() => {
    setCurrQuestion(questionSet[nbrAnswered]);
    //reset removed answers. or we get funny results
    setRemovedAnswers([]);
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
        setPowersUsed([...powersUsed, power]);
        setTimeRemaining(timeRemaining + superPowerExtendTime);
        break;

      case "50-50":
        setPowersUsed([...powersUsed, power]);
        removeAnswers();
        break;
      default:
        break;
    }
  };

  const removeAnswers = () => {
    //well this could be just [], but i could use my powers many times :-)
    let filterAns = removedAnswers;

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

    setRemovedAnswers(filterAns);
  };

  //move up stuff below to make it more clear what happens.
  return (
    <div>
      {nbrAnswered === nbrQuestions ? <Redirect to="/stats" /> : null}
      {currQuestion ? (
        <Question
          answerQuestion={answerQuestion}
          {...currQuestion}
          removedAnswers={removedAnswers}
        />
      ) : null}
      <CountDownTimer
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
      />

      <SuperPower
        spendSuper={usePower}
        superPowers={somePowers}
        powersUsed={powersUsed}
      />

      <div>
        Number answered: {nbrAnswered}/{nbrQuestions}
      </div>
    </div>
  );
};

export default PlayGame;
