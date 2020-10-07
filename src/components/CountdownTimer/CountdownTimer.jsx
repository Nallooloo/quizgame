import React from "react";
import styled from "styled-components";

const RedCount = styled.h3`
  margin: 0px;
  color: red;
`;

const GreenCount = styled.h3`
  margin: 0px;
  color: green;
`;

const CountDownTimer = ({
  setTimeRemaining,
  redTimer = 5,

  timeRemaining,
}) => {
  return timeRemaining >= redTimer ? (
    <div>
      Remaining time:
      <GreenCount>{timeRemaining.toFixed(1)}</GreenCount>
    </div>
  ) : (
    <div>
      Remaining time:
      <RedCount>{timeRemaining.toFixed(1)}</RedCount>
    </div>
  );
};

export default CountDownTimer;
