import React from "react";
import SuperCard from "../SuperCard/SuperCard";
const SuperPower = ({ superPowers = [], spendSuper }) => {
  return (
    <div>
      {superPowers.map((power) => {
        return (
          <SuperCard {...power} key={power.name} spendSuper={spendSuper} />
        );
      })}
    </div>
  );
};

export default SuperPower;
