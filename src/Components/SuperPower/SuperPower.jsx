import React from "react";
import SuperCard from "../SuperCard/SuperCard";
const SuperPower = ({ superPowers = [], spendSuper, powersUsed = [] }) => {
  return (
    <div>
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
    </div>
  );
};

export default SuperPower;
