import React, { FC } from "react";
import { singleCocktailType } from "../App";

const SingleCocktailComponent: FC<{
  clickedTab: number;
  index: number;
  cocktail: singleCocktailType;
  addToFavorite?: Function;
  favoriteCocktails?: singleCocktailType[];
  removeFromFavorite?: Function;
}> = ({
  clickedTab,
  cocktail,
  addToFavorite,
  favoriteCocktails,
  removeFromFavorite,
}) => {
  console.log(favoriteCocktails, "kkk");
  const favoriteCocktailIds =
    favoriteCocktails?.map(
      (cocktail: singleCocktailType) => cocktail?.idDrink
    ) || [];

  const { idDrink, strCategory, strDrink, strDrinkThumb } = cocktail;
  return (
    <div
      key={idDrink}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>{strDrink || ""}</p>
      {clickedTab === 0 && <p>{strCategory || ""} </p>}
      <img src={strDrinkThumb} style={{ width: "150px", height: "150px" }} />
      {clickedTab === 1 && (
        <button
          onClick={() =>
            favoriteCocktailIds.includes(idDrink)
              ? removeFromFavorite?.(idDrink)
              : addToFavorite?.(cocktail)
          }
        >
          {favoriteCocktailIds.includes(idDrink)
            ? "remove favorite"
            : "add favorite"}
        </button>
      )}
    </div>
  );
};

export default SingleCocktailComponent;
