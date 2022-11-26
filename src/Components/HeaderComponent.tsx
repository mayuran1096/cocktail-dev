import React, { FC, useState } from "react";
import Logo from "../images/Logo-main.png";

interface HeaderComponentProps {
  setSelectedTab: Function;
  selectedTab: number;
}

const HeaderComponent: FC<HeaderComponentProps> = ({
  setSelectedTab,
  selectedTab,
}) => {
  return (
    <div className="header">
      <a className="logo" onClick={() => setSelectedTab(0)}>
        Cocktail hub
      </a>

      <div className="header-right">
        <a
          className={selectedTab === 0 ? "active" : ""}
          onClick={() => setSelectedTab(0)}
        >
          home
        </a>
        <a
          className={selectedTab === 1 ? "active" : ""}
          onClick={() => setSelectedTab(1)}
        >
          search
        </a>
        <a
          className={selectedTab === 2 ? "active" : ""}
          onClick={() => setSelectedTab(2)}
        >
          favorites
        </a>
      </div>
    </div>
  );
};

export default HeaderComponent;
