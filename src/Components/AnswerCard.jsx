import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  background-color: lightblue;
  border: solid 1px black;

  padding: 3px;
  width: 250px;
  height: 100px;
`;

const AnswerCard = ({ answer, choiceMade }) => {
  return <Card onClick={() => choiceMade(answer)}>{answer}</Card>;
};

export default AnswerCard;
