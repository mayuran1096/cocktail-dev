import React, { FC } from "react";
type HomeComponentProps = {
  renderCocktails: Function;
  fetchCocktails: Function;
};

const HomeComponent: FC<HomeComponentProps> = ({
  renderCocktails,
  fetchCocktails,
}) => {
  return (
    <div>
      {renderCocktails()}
      <button onClick={() => fetchCocktails()}>refresh</button>
    </div>
  );
};

export default HomeComponent;
