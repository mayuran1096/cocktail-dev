import { useEffect, useState } from "react";
import "./Styles/MainPageStyles.scss";
import FavoriteList from "./Components/FavoriteList";
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
  const [favoriteCocktails, setFavoriteCocktails] = useState<
    singleCocktailType[]
  >([]);

  const addToFavorite = (cocktail: singleCocktailType) => {
    const prevCocktails = getPreviousFavoriteCocktails();
    const addedNewCocktails: singleCocktailType[] = prevCocktails?.length
      ? [cocktail, ...prevCocktails]
      : [cocktail];
    setFavoriteCocktails(addedNewCocktails || []);
    localStorage.setItem(
      "favoriteCocktails",
      JSON.stringify(addedNewCocktails)
    );
  };
  const removeFromFavorite = (idDrink: string) => {
    const prevCocktails = getPreviousFavoriteCocktails();
    const removeFavorite = prevCocktails?.filter(
      (cocktail: singleCocktailType) => cocktail?.idDrink !== idDrink
    );
    setFavoriteCocktails(removeFavorite || []);
    localStorage.setItem("favoriteCocktails", JSON.stringify(removeFavorite));
  };

  const getPreviousFavoriteCocktails = () =>
    JSON.parse(localStorage.getItem("favoriteCocktails") || "[]");

  useEffect(() => {
    setFavoriteCocktails(
      JSON.parse(localStorage.getItem("favoriteCocktails") || "[]")
    );
  }, []);

  return (
    <div className="App">
      <HeaderComponent
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />

      {selectedTab === 0 && <HomeContainer />}
      {selectedTab === 1 && (
        <SearchContainer
          favoriteCocktails={favoriteCocktails}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
        />
      )}
      {selectedTab === 2 && (
        <FavoriteList
          favoriteCocktails={favoriteCocktails}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
        />
      )}
    </div>
  );
}

export default App;
