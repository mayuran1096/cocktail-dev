import React, { FC } from "react";
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
    <div>
      {renderCocktails()}
      <button onClick={() => fetchCocktails()} disabled={loading}>
        {loading ? "loading" : "refresh"}
      </button>
    </div>
  );
};

export default HomeComponent;
