import React, { FC } from "react";
import { singleCocktailType } from "../App";

const SingleCocktail: FC<{
  clickedTab: number;
  index: number;
  cocktail: singleCocktailType;
  addToFavorite?: Function;
}> = ({ clickedTab, cocktail, addToFavorite }) => {
  return (
    <div
      key={cocktail?.idDrink}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>{cocktail?.strDrink || ""}</p>
      {clickedTab === 0 && <p>{cocktail?.strCategory || ""} </p>}
      <img
        src={cocktail.strDrinkThumb}
        style={{ width: "150px", height: "150px" }}
      />
      {clickedTab === 1 && (
        <button onClick={() => addToFavorite?.(cocktail)}>add favorite</button>
      )}
    </div>
  );
};

export default SingleCocktail;
