// @ts-ignore
import { Map } from "../assets/Map";
import "../App.css";
import { useEffect, useRef, useState } from "react";

export function PointCountryInfo() {
  const selectedPath = useRef<SVGPathElement | null>(null);
  const [country, setCountry] = useState("");
  type countryInfoT = {
    capital: string;
    languages: object;
    flags: {
      svg: string;
    };
    name: {
      official: string;
    };
  };
  const [countryInfo, setCountryInfo] = useState<countryInfoT>({
    capital: "",
    languages: {},
    flags: {
      svg: "",
    },
    name: {
      official: "",
    },
  });
  const [countryList, setCountryList] = useState([]);

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
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        setCountryList(data);
      });
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
    <div className="app-page">
      <Map onPathClick={onClickPais} selectedCountry={country} />

      <div id="country-info">
        {countryInfo ? (
          <>
            <p>
              <img className="country-flag" src={countryInfo.flags.svg} />
              <strong>{country}</strong>
              <br />
              {countryInfo.name.official}
              <br />
              <strong>Capital:</strong> {countryInfo?.capital}
            </p>
          </>
        ) : (
          "no info :/"
        )}
      </div>
      <div id="country-list">
        <ul>
          {countryList.map((country) => (
            <li onClick={() => setCountry(country.name.common)}>
              {country.name.common}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
