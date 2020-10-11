import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Question from "../components/Question/Question";
import SuperPower from "../components/SuperPower/SuperPower";
import CountDownTimer from "../components/CountdownTimer/CountdownTimer";
import useInterval from "../hooks/useInterval";
import someQuestions from "../data/someQuestions.json";
import somePowers from "../data/somePowers.json";
import { useRef } from "react";

const PlayGame = ({
  nbrQuestions,
  addOneCorrect,
  addOneMissed,
  addAnswerTime,
  defaultTime = 3000,
  superPowerExtendTime = 10000,
}) => {
  const [nbrAnswered, setNbrAnswered] = useState(0);
  const [currQuestion, setCurrQuestion] = useState({});
  const [questionSet, setQuestionSet] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(defaultTime);

  const [powersUsed, setPowersUsed] = useState([]);
  const [removedAnswers, setRemovedAnswers] = useState([]);
  const [loadingNextQuestion, setLoadingNextQuestion] = useState(false);
  let [loading, setLoading] = useState(true);
  const superPowers = somePowers;
  const questionDelay = 1500;

  let extendTimeUsed = useRef(false);
  //"load the questions"
  useEffect(() => {
    setQuestionSet(someQuestions);
    setLoading(false);
  }, []);

  //on answer update question and rerender to display next question.
  useEffect(() => {
    //reset removed answers. or we get funny results with overlapping answers.
    setRemovedAnswers([]);
    setLoadingNextQuestion(true);
    extendTimeUsed.current = false;

    let timer = setTimeout(() => {
      setCurrQuestion(questionSet[nbrAnswered]);
      setLoadingNextQuestion(false); //triggers rerender...
    }, questionDelay);

    return () => clearTimeout(timer);
  }, [questionSet, nbrAnswered]);

  useInterval(() => {
    if (loadingNextQuestion) {
      return;
    }

    if (timeRemaining > 0 && !loadingNextQuestion) {
      setTimeRemaining(timeRemaining - 10);
      return;
    }

    addOneMissed();
    setLoadingNextQuestion(true);
    setTimeRemaining(defaultTime);
    setNbrAnswered(nbrAnswered + 1);
  }, 10);

  const answerQuestion = (value) => {
    if (value === currQuestion.correctAnswer) {
      addOneCorrect();
    }
    if (extendTimeUsed.current) {
      addAnswerTime(defaultTime + superPowerExtendTime - timeRemaining);
    } else {
      addAnswerTime(defaultTime - timeRemaining);
    }

    setLoadingNextQuestion(true);
    setTimeRemaining(defaultTime);
    setNbrAnswered(nbrAnswered + 1);
  };

  const usePower = (power) => {
    switch (power) {
      case "Extend Time":
        setPowersUsed([...powersUsed, power]);
        extendTimeUsed.current = true;
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
    let filterAns = [];

    while (currQuestion.answers.length / 2 > filterAns.length) {
      //get a random index
      let randomIdx = Math.floor(Math.random() * currQuestion.answers.length);
      //make sure the found index is not the correct answer, and that it s not "removed" already.
      if (
        currQuestion.answers[randomIdx] !== currQuestion.correctAnswer &&
        filterAns.indexOf(currQuestion.answers[randomIdx]) === -1
      ) {
        filterAns.push(currQuestion.answers[randomIdx]);
      }
    }

    setRemovedAnswers(filterAns);
  };

  //render loading duh
  if (loading) {
    return <div> Loading game...</div>;
  }

  /* if we have answered all questions we r done, go to stats... */
  if (nbrAnswered === nbrQuestions) {
    return <Redirect to="/stats" />;
  }

  //render game:
  return (
    <div>
      <Question
        answerQuestion={answerQuestion}
        {...currQuestion}
        removedAnswers={removedAnswers}
        loadingNextQuestion={loadingNextQuestion}
      />

      <CountDownTimer
        timeRemaining={timeRemaining / 1000}
        setTimeRemaining={setTimeRemaining}
      />

      <SuperPower
        spendSuper={usePower}
        superPowers={superPowers}
        powersUsed={powersUsed}
      />

      <div>
        Number answered: {nbrAnswered}/{nbrQuestions}
      </div>
    </div>
  );
};

export default PlayGame;
