import React from "react";
import Question from "../Components/Question";
import SuperPower from "../Components/SuperPower";

const someQuestion = {
  question: "Who made this?",
  answers: ["Flydiverny", "MrFluFFy", "Abakar", "God"],
  correctAnswer: "MrFluFFy",
};

const PlayGame = () => {
  return (
    <div>
      <Question {...someQuestion} />
      <SuperPower />
    </div>
  );
};

export default PlayGame;
