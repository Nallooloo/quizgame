import React from "react";
import styled from "styled-components";

const Card = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  background-color: ${(props) => (props.available ? "lightblue" : "grey")};
  border: solid 1px black;

  padding: 3px;
  width: 250px;
  height: 50px;

  &:hover {
    background-color: ${(props) => (props.available ? "#1db2ec" : null)};
    cursor: ${(props) => (props.available ? "pointer" : null)};
  }
`;

const SuperCard = ({ name, spendSuper, available }) => {
  return (
    <Card
      onClick={available ? () => spendSuper(name) : null}
      available={available}
    >
      {name}
    </Card>
  );
};

export default SuperCard;
