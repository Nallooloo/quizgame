import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  background-color: ${(props) => (props.avialable ? "lightblue" : "grey")};
  border: solid 1px black;

  padding: 3px;
  width: 250px;
  height: 100px;
  &:hover {
    background-color: ${(props) => (props.avialable ? "#1db2ec" : null)};
    cursor: ${(props) => (props.avialable ? "pointer" : null)};
  }
`;

const AnswerCard = ({ answer, choiceMade, avialable }) => {
  return (
    <Card
      onClick={avialable ? () => choiceMade(answer) : null}
      avialable={avialable}
    >
      {answer}
    </Card>
  );
};

export default AnswerCard;
