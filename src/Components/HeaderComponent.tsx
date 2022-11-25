import React, { FC, useState } from "react";

interface HeaderComponentProps {
  setSelectedTab: Function;
}

const HeaderComponent: FC<HeaderComponentProps> = ({ setSelectedTab }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <button onClick={() => setSelectedTab(0)}>home</button>
        <button onClick={() => setSelectedTab(1)}>search</button>
        <button onClick={() => setSelectedTab(2)}>favorites</button>
      </div>
    </div>
  );
};

export default HeaderComponent;
