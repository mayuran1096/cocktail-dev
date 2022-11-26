import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { singleCocktailType } from "../App";

import { FcLike, FcLikePlaceholder, FcRating } from "react-icons/fc";

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
  const favoriteCocktailIds =
    favoriteCocktails?.map(
      (cocktail: singleCocktailType) => cocktail?.idDrink
    ) || [];

  const { idDrink, strCategory, strDrink, strDrinkThumb } = cocktail;
  return (
    <div key={idDrink} className="cocktail-card">
      <LazyLoadImage
        className="cocktail-image"
        effect="blur"
        src={strDrinkThumb}
      />

      <div className="content-wrapper">
        <div className="title-wrapper">
          <FcRating />
          <p className="card-title">{strDrink || ""}</p>
        </div>

        {clickedTab === 0 && (
          <p className="card-subtitle">{strCategory || ""} </p>
        )}
        {clickedTab === 1 && (
          <div
            className="like-btn"
            onClick={() =>
              favoriteCocktailIds.includes(idDrink)
                ? removeFromFavorite?.(idDrink)
                : addToFavorite?.(cocktail)
            }
          >
            {favoriteCocktailIds.includes(idDrink) ? (
              <FcLike size={"large"} />
            ) : (
              <FcLikePlaceholder size={"large"} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCocktailComponent;
