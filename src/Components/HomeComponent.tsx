import React, { FC } from "react";
import { BiRefresh } from "react-icons/bi";
import Loader from "./Loader";
type HomeComponentProps = {
  renderCocktails: Function;
  fetchCocktails: Function;
  loading: boolean;
};

const HomeComponent: FC<HomeComponentProps> = ({
  renderCocktails,
  fetchCocktails,
  loading,
}) => {
  return (
    <>
      <div className="home-wrapper">
        {loading ? <Loader /> : renderCocktails()}
      </div>
      <div
        onClick={() => !loading && fetchCocktails()}
        className={loading ? "btn btn-disabled" : "btn"}
      >
        {loading ? "loading" : <BiRefresh size={"large"} />}
      </div>
    </>
  );
};

export default HomeComponent;
