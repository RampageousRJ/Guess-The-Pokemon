import React from "react";
import pikachu from "../../assets/pikachu.webp";

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <img
        src={pikachu}
        alt="Loading Pokémon..."
        className="loader-image"
      />
    </div>
  );
};

export default Loader;
