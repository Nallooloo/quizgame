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
  defaultTime = 2000,
  superPowerExtendTime = 10,
}) => {
  const [nbrAnswered, setNbrAnswered] = useState(0);
  const [currQuestion, setCurrQuestion] = useState({});
  const [questionSet, setQuestionSet] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(defaultTime);
  const [superPowers, setsuperPowers] = useState([]);
  const [powersUsed, setPowersUsed] = useState([]);
  const [removedAnswers, setRemovedAnswers] = useState([]);
  const [loadingNextQuestion, setLoadingNextQuestion] = useState(false);
  let [loading, setLoading] = useState(true);
  let runTick = useRef(true);
  const questionDelay = 1500;
  //"load the questions"
  useEffect(() => {
    (async () => {
      setQuestionSet(someQuestions);
      // setCurrQuestion(someQuestions[0]);
      setsuperPowers(somePowers);
    })().then(() => setLoading(false));
  }, []);

  //on answer update question and rerender to display next question.
  useEffect(() => {
    setCurrQuestion(questionSet[nbrAnswered]);
    //reset removed answers. or we get funny results
    setRemovedAnswers([]);
  }, [questionSet, nbrAnswered]);

  useInterval(
    () => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 10);
      } else {
        runTick.current = false;
        if (nbrAnswered === nbrQuestions - 1) {
          //game is over.
          addOneMissed();

          setNbrAnswered(nbrAnswered + 1);
        } else {
          setLoadingNextQuestion(true);

          setTimeRemaining(defaultTime);

          addOneMissed();

          setTimeout(() => {
            runTick.current = true;
            setNbrAnswered(nbrAnswered + 1);

            setLoadingNextQuestion(false);
          }, questionDelay);
        }
      }
    },
    runTick.current ? 10 : null
  );

  const answerQuestion = (value) => {
    runTick.current = false;

    if (value === currQuestion.correctAnswer) {
      addOneCorrect();
    }
    addAnswerTime(defaultTime - timeRemaining);

    if (nbrQuestions === nbrAnswered + 1) {
      //game is over.
      setNbrAnswered(nbrAnswered + 1);
    } else {
      setLoadingNextQuestion(true);

      setTimeRemaining(defaultTime);
      setTimeout(() => {
        runTick.current = true;
        setNbrAnswered(nbrAnswered + 1);
        setLoadingNextQuestion(false);
      }, questionDelay);
    }
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
    //well this could be just [], but i could use my power many times before, and then it matters :-)
    let filterAns = removedAnswers;

    //not needed with current 1 power limit
    if (currQuestion.answers.length - filterAns.length === 1) {
      return;
    }
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

  const renderGame = () => {
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

  //move up stuff below to make it more clear what happens.
  return renderGame();
};

export default PlayGame;
