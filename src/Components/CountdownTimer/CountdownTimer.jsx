import React, { useState } from "react";
import styled from "styled-components";
import useInterval from "../../hooks/useInterval";

const RedCount = styled.h3`
  margin: 0px;
  color: red;
`;

const GreenCount = styled.h3`
  margin: 0px;
  color: green;
`;

const CountDownTimer = ({
  //   setTimeRemaining,
  redTimer = 5,
  defaultTime = 15,
}) => {
  let [timeRemaining, setTimeRemaining] = useState(defaultTime);

  useInterval(() => {
    // Your custom logic here
    setTimeRemaining(timeRemaining - 0.01);
  }, 10);

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
