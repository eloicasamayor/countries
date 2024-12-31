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
  type Country = {
    name: {
      common: string;
      official: string;
      nativeName: Record<string, { official: string; common: string }>;
    };
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: Record<string, { name: string; symbol: string }>;
    idd: {
      root: string;
      suffixes: string[];
    };
    capital: string[];
    altSpellings: string[];
    region: string;
    languages: Record<string, string>;
    translations: Record<string, { official: string; common: string }>;
    latlng: [number, number];
    landlocked: boolean;
    area: number;
    demonyms: Record<string, { f: string; m: string }>;
    flag: string;
    maps: {
      googleMaps: string;
      openStreetMaps: string;
    };
    population: number;
    car: {
      signs: string[];
      side: string;
    };
    timezones: string[];
    continents: string[];
    flags: {
      png: string;
      svg: string;
    };
    coatOfArms: Record<string, string>;
    startOfWeek: string;
    capitalInfo: {
      latlng: [number, number];
    };
  };
  const [countryInfo, setCountryInfo] = useState<countryInfoT | undefined>();
  const [countryList, setCountryList] = useState<Country[] | undefined>();
  const [loadingList, setLoadingList] = useState<boolean>();

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
    setLoadingList(true);
    fetch(`https://restcountries.com/v3.1/all?fields=name`)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        setCountryList(data);
      })
      .then(() => setLoadingList(false));
  }, []);

  function unselectCountry() {
    setCountry("");
    setCountryInfo(undefined);
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
            <button onClick={unselectCountry}>X</button>
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
      {loadingList ? (
        <p>{"loading list..."}</p>
      ) : countryList ? (
        <div id="country-list">
          <ul>
            {countryList.map((country) => (
              <li onClick={() => setCountry(country.name.common)}>
                {country.name.common}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{"Couldn't load the countries list :/"}</p>
      )}
    </div>
  );
}
