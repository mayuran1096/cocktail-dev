import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { singleCocktailType } from "../App";
import SingleCocktail from "../Components/SingleCocktail";
import useDebounce from "../hooks/useDebounce";

let cancelToken: any;

const SearchContainer = () => {
  const [searchKey, setSearchKey] = useState("");
  const [queryCocktailResult, setQueryCocktailResult] = useState<
    singleCocktailType[]
  >([]);
  const debouncedSearchText = useDebounce(searchKey, 1000);

  useEffect(() => {
    handleSearchChange(debouncedSearchText);
  }, [debouncedSearchText]);

  const handleSearchChange = async (searchKey: string) => {
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
  };

  const renderCocktails = useMemo(() => {
    if (!queryCocktailResult?.length) return <div>No cocktails available.</div>;
    return queryCocktailResult?.map(
      (cocktail: singleCocktailType, index: number) => (
        <SingleCocktail clickedTab={1} index={index} cocktail={cocktail} />
      )
    );
  }, [queryCocktailResult]);
  return (
    <div>
      <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
      {renderCocktails}
    </div>
  );
};

export default SearchContainer;
