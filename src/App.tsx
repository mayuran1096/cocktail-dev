import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import axios from "axios";

interface singleCocktailType {
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strGlass: string;
}

function App() {
  const [randomCocktails, setRandomCockTails] = useState<
    singleCocktailType[] | []
  >([]);

  async function fetchData() {
    console.log("calling");

    const cocktailRandomList = await Promise.all([
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`),
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`),
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`),
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`),
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`),
    ]);
    const filterCockTailList = cocktailRandomList?.map(
      (cocktail: any, index: Number) => {
        const { data } = cocktail;
        return data?.drinks?.[0] || [];
      }
    );
    console.log(filterCockTailList, "www");
    setRandomCockTails(filterCockTailList || []);
  }

  const renderRandomCockTails = useMemo(() => {
    return randomCocktails?.map(
      (cocktail: singleCocktailType, index: number) => {
        return <div key={index}>{cocktail?.strDrink || ""}</div>;
      }
    );
  }, [randomCocktails]);

  useEffect(() => {
    fetchData();
  }, []);

  return <div className="App">{renderRandomCockTails}</div>;
}

export default App;
