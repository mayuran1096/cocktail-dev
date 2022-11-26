import axios from "axios";
import { FC, useEffect, useMemo, useState } from "react";
import { singleCocktailType } from "../App";
import Loader from "../Components/Loader";
import SingleCocktailComponent from "../Components/SingleCocktailComponent";
import useDebounce from "../hooks/useDebounce";

let cancelToken: any;

const SearchContainer: FC<{
  favoriteCocktails: singleCocktailType[];
  addToFavorite: Function;
  removeFromFavorite: Function;
}> = ({ favoriteCocktails, addToFavorite, removeFromFavorite }) => {
  const [searchKey, setSearchKey] = useState("");
  const [queryCocktailResult, setQueryCocktailResult] = useState<
    singleCocktailType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearchText = useDebounce(searchKey, 1000);

  useEffect(() => {
    handleSearchChange(debouncedSearchText);
  }, [debouncedSearchText]);

  const handleSearchChange = async (searchKey: string) => {
    setLoading(true);
    setQueryCocktailResult([]);
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    try {
      const results = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${debouncedSearchText}`,
        { cancelToken: cancelToken.token } //Pass the cancel token to the current request
      );
      setQueryCocktailResult(results?.data?.drinks || []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const renderCocktails = useMemo(() => {
    if (!queryCocktailResult?.length)
      return (
        <div className="no-content">
          <h1>No cocktails available.</h1>
        </div>
      );
    return queryCocktailResult?.map(
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
  }, [queryCocktailResult, favoriteCocktails]);
  return (
    <>
      <div className="search-field-wrapper">
        <input
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="search-field"
          placeholder="Search cocktails"
        />
      </div>

      <div className="home-wrapper">
        {loading ? <Loader /> : renderCocktails}
      </div>
    </>
  );
};

export default SearchContainer;
