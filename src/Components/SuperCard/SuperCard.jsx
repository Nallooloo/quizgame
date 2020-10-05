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

const SuperCard = ({ name, spendSuper }) => {
  return <Card onClick={() => spendSuper(name)}>{name}</Card>;
};

export default SuperCard;
