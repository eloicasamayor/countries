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
      <Map onPathClick={onClickPais} />

      <div id="country-info">
        {countryInfo ? (
          <>
            <div>
              <h2>{country}</h2>{" "}
              <img className="country-flag" src={countryInfo.flags.svg} />
            </div>
            <div>
              <p>
                <strong>Official name:</strong> {countryInfo.name.official}
              </p>
              <p>
                <strong>Capital:</strong> {countryInfo?.capital}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {Object.values(countryInfo?.languages).map((l) => l + ", ")}
              </p>
            </div>
          </>
        ) : (
          "no info :/"
        )}
      </div>
    </div>
  );
}
