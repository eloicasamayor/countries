import { allCommonNames } from "../data/countries-data";
import { useState, useRef } from "react";
import { Map } from "../assets/Map";
export const PointCountryGame = () => {
  const [countryIndex, setCountryIndex] = useState(0);
  const [country, setCountry] = useState("");
  const selectedPath = useRef<SVGPathElement | null>(null);

  function handleNextButtonClick() {
    setCountry("");
    setCountryIndex((old) => old + 1);
  }

  function onClickPais(e: MouseEvent) {
    if (selectedPath.current) {
      selectedPath.current.setAttribute("style", "fill:black");
    }
    const targ = e.target as SVGPathElement;
    selectedPath.current = targ;
    const title = (targ.attributes.getNamedItem("title") as Attr).value;

    if (!title || !targ) {
      return;
    }
    const isCountryCorrect = title === allCommonNames[countryIndex];
    targ.setAttribute(
      "style",
      "fill:" + `${isCountryCorrect ? "green" : "red"}`
    );
    setCountry(title);
  }
  return (
    <div className="game-page">
      <h1>Point the country</h1>
      <Map onPathClick={onClickPais} />
      <div style={{ margin: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2>{allCommonNames[countryIndex] + " "}</h2>
          <button onClick={handleNextButtonClick}>next</button>
        </div>
        {country !== "" ? (
          <p>
            {country === allCommonNames[countryIndex] ? "🎉" : "❌ " + country}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
