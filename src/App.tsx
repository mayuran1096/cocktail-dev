import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import HeaderComponent from "./Components/HeaderComponent";
import HomeContainer from "./Container/HomeContainer";
import SearchContainer from "./Container/SearchContainer";

export interface singleCocktailType {
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strGlass: string;
  idDrink: string;
}

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="App">
      <HeaderComponent setSelectedTab={setSelectedTab} />

      {selectedTab === 0 && <HomeContainer />}
      {selectedTab === 1 && <SearchContainer />}
    </div>
  );
}

export default App;
