import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NewGame = styled.div`
  border-radius: 15px;
  padding: 3px;
  width: 250px;
  height: 100px;
  background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 25px;
  border: 1px solid black;

  &:hover {
    background: #1db2ec;
  }
`;

const NoUnderLineLink = styled(Link)`
  text-decoration: none;
`;

const Menu = () => {
  return (
    <div>
      <NoUnderLineLink to="/play">
        <NewGame>New game</NewGame>
      </NoUnderLineLink>
    </div>
  );
};

export default Menu;
