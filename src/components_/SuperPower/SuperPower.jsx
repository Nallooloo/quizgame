import React from "react";
import SuperCard from "../SuperCard/SuperCard";
import styled from "styled-components";

const SuperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 556px;
  margin: auto;
`;

const Heading = styled.h4`
  margin-bottom: 5px;
  margin-top: 50px;
`;
const SuperPower = ({ superPowers = [], spendSuper, powersUsed = [] }) => {
  return (
    <div>
      <Heading>Use a super power if needed!</Heading>
      <SuperDiv>
        {superPowers.map((power) => {
          return (
            <SuperCard
              name={power.name}
              key={power.name}
              spendSuper={spendSuper}
              available={powersUsed.indexOf(power.name) === -1}
            />
          );
        })}
      </SuperDiv>
    </div>
  );
};

export default SuperPower;
