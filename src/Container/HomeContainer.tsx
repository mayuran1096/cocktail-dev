import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { singleCocktailType } from "../App";
import "../App.css";
import HomeComponent from "../Components/HomeComponent";
import SingleCocktailComponent from "../Components/SingleCocktailComponent";

function HomeContainer() {
  const [randomCocktails, setRandomCockTails] = useState<
    singleCocktailType[] | []
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchRandomCocktails() {
    setLoading(true);
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
    setLoading(false);
  }

  const renderRandomCockTails = useMemo(() => {
    return randomCocktails?.map(
      (cocktail: singleCocktailType, index: number) => {
        return cocktail?.idDrink ? (
          <SingleCocktailComponent
            clickedTab={0}
            index={index}
            cocktail={cocktail}
          />
        ) : null;
      }
    );
  }, [randomCocktails]);

  useEffect(() => {
    fetchRandomCocktails();
  }, []);

  return (
    <HomeComponent
      renderCocktails={() => renderRandomCockTails}
      fetchCocktails={fetchRandomCocktails}
      loading={loading}
    />
  );
}

export default HomeContainer;
