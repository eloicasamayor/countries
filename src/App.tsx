// @ts-ignore
import { Map } from "./assets/world";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const selectedPath = useRef<SVGPathElement | null>(null);
  const [country, setCountry] = useState("");
  type countryInfoT = {
    capital: string;
    languages: object;
  };
  const [countryInfo, setCountryInfo] = useState<countryInfoT>({
    capital: "",
    languages: {},
  });

  useEffect(() => {
    if (!country) {
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        setCountryInfo(data[0]);
      });
  }, [country]);

  useEffect(() => {
    let paths = document.querySelectorAll("path");
    for (let i = 0; i < paths.length; i++) {
      paths[i].addEventListener("click", (e) => onClickPais(e));
    }
  }, []);

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
    console.log(title);
    targ.setAttribute("style", "fill:red");
    setCountry(title);
  }
  return (
    <>
      <p>{country}</p>
      <Map />
      <div>
        <p>
          <strong>Capital:</strong> {countryInfo?.capital}
        </p>
        <p>
          <strong>Languages:</strong>{" "}
          {Object.values(countryInfo?.languages).map((l) => l + ", ")}
        </p>
      </div>
    </>
  );
}

export default App;
