import React, { useState } from "react";
import useInterval from "../hooks/useInterval";

const CountDownTimer = () => {
  let [count, setCount] = useState(0);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, 1000);

  return <h3>{count}</h3>;
};

export default CountDownTimer;
