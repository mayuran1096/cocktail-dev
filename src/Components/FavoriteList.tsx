import React, { FC, useMemo, useState } from "react";
import { singleCocktailType } from "../App";
import SingleCocktailComponent from "./SingleCocktailComponent";

interface FavoriteListProps {
  favoriteCocktails: singleCocktailType[];
  addToFavorite: Function;
  removeFromFavorite: Function;
}

const FavoriteList: FC<FavoriteListProps> = ({
  removeFromFavorite,
  addToFavorite,
  favoriteCocktails,
}) => {
  const renderFavoriteCocktails = useMemo(() => {
    if (!favoriteCocktails?.length) return <div>No cocktails available.</div>;
    return favoriteCocktails?.map(
      (cocktail: singleCocktailType, index: number) =>
        cocktail?.idDrink ? (
          <SingleCocktailComponent
            clickedTab={1}
            index={index}
            cocktail={cocktail}
            addToFavorite={addToFavorite}
            favoriteCocktails={favoriteCocktails}
            removeFromFavorite={removeFromFavorite}
          />
        ) : null
    );
  }, [favoriteCocktails]);
  return <div>{renderFavoriteCocktails}</div>;
};

export default FavoriteList;
