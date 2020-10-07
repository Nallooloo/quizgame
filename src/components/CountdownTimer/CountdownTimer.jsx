import React from "react";
import styled from "styled-components";

const Count = styled.h3`
  margin: 0px;
  color: ${({ timeRemaining, redTimer }) =>
    timeRemaining > redTimer ? "green" : "red"};
`;

const CountDownTimer = ({
  redTimer = 5,

  timeRemaining,
}) => {
  return (
    <div>
      Remaining time:
      <Count timeRemaining={timeRemaining} redTimer={redTimer}>
        {/* .toFixed decimals to display */}
        {timeRemaining.toFixed(1)}
      </Count>
    </div>
  );
};

export default CountDownTimer;
