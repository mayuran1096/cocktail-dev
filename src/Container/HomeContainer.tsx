import React, { useEffect, useState, useMemo } from "react";
import "../App.css";
import axios from "axios";
import { singleCocktailType } from "../App";
import HomeComponent from "../Components/HomeComponent";
import SingleCocktail from "../Components/SingleCocktail";

function HomeContainer() {
  const [randomCocktails, setRandomCockTails] = useState<
    singleCocktailType[] | []
  >([]);

  async function fetchRandomCocktails() {
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
    setRandomCockTails(filterCockTailList || []);
  }

  const renderRandomCockTails = useMemo(() => {
    return randomCocktails?.map(
      (cocktail: singleCocktailType, index: number) => {
        return (
          <SingleCocktail clickedTab={0} index={index} cocktail={cocktail} />
        );
      }
    );
  }, [randomCocktails]);

  useEffect(() => {
    fetchRandomCocktails();
  }, []);

  return (
    <div>
      <HomeComponent
        renderCocktails={() => renderRandomCockTails}
        fetchCocktails={fetchRandomCocktails}
      />
    </div>
  );
}

export default HomeContainer;
