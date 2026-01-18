import React, { useContext } from "react";
import { DataContext } from "../../context/Data";

const capitalizeWords = (text: string) =>
  text
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const Table: React.FC = () => {
  const { data } = useContext(DataContext);
  const hints = data?.hints;

  const typeText =
    hints?.types
      ?.map(t => capitalizeWords(t.type.name))
      .join(", ") || "???";

  const abilitiesText =
    hints?.abilities
      ?.map(a => capitalizeWords(a.ability.name))
      .join(", ") || "???";

  const evolutionLevel = (hints?.evolutionStage === 0) ? `Basic Form` : hints?.evolutionStage === 1 ? "First Evolution" : hints?.evolutionStage === 2 ? "Final Evolution" : "???" ;  

  return (
    <table className="table table-dark table-hover">
      <tbody>
        <tr>
          <th style={{ width: "40%" }}>Type</th>
          <td>{typeText}</td>
        </tr>

        <tr>
          <th>Evolution Chain</th>
          <td>{evolutionLevel ?? "???"}</td>
        </tr>

        <tr>
          <th>Abilities</th>
          <td>{abilitiesText}</td>
        </tr>

        <tr>
          <th>Capture Rate</th>
          <td>{hints?.captureRate ?? "???"}</td>
        </tr>

        <tr>
          <th>Colour</th>
          <td>{hints?.color ? capitalizeWords(hints.color) : "???"}</td>
        </tr>

        <tr>
          <th>Generation</th>
          <td>{hints?.generation ? capitalizeWords(hints.generation.replace("-", " ")) : "???"}</td>
        </tr>

        <tr>
          <th>Habitat</th>
          <td>{hints?.habitat ? capitalizeWords(hints.habitat) : "???"}</td>
        </tr>

        <tr>
          <th>Shape</th>
          <td>{hints?.shape ? capitalizeWords(hints.shape) : "???"}</td>
        </tr>

        <tr>
          <th>Legendary</th>
          <td>{hints ? (hints.isLegendary ? "Yes" : "No") : "???"}</td>
        </tr>

        <tr>
          <th>Mythical</th>
          <td>{hints ? (hints.isMythical ? "Yes" : "No") : "???"}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
