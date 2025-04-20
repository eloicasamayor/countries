// @ts-ignore
import { Map } from "../assets/Map";
import "../App.css";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const [countryFilteredList, setCountryFilteredList] = useState<
    Country[] | undefined
  >();
  const [loadingList, setLoadingList] = useState<boolean>();
  const searchRef = useRef(null);

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
    fetch(`https://restcountries.com/v3.1/all?fields=name,capital,currencies`)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        console.log(data);
        setCountryList(data);
      })
      .then(() => setLoadingList(false));
  }, []);

  function unselectCountry() {
    if (selectedPath?.current) {
      selectedPath.current.setAttribute("style", "fill:black");
    }
    setCountry("");
    setCountryInfo(undefined);
  }
  function onClickPais(e: MouseEvent) {
    const targ = e.target as SVGPathElement;
    selectedPath.current = targ;
    const title = (targ.attributes.getNamedItem("title") as Attr).value;

    if (!title || !targ) {
      return;
    }
    setCountry(title);
  }

  const countryListToRender = countryFilteredList?.length
    ? countryFilteredList
    : countryList;

  const filterBySearch = () => {
    if (!searchRef?.current?.value) return;
    setCountryFilteredList(
      countryList?.filter((countryToSearch) => {
        const foundInName = countryToSearch.name.common
          .toLowerCase()
          .includes(searchRef.current.value.toLowerCase());
        console.log(countryToSearch.name.common, countryToSearch.capital[0]);
        const foundInCapital = countryToSearch.capital?.[0]
          ?.toLowerCase()
          .includes(searchRef.current.value.toLowerCase());
        return foundInName || foundInCapital;
      })
    );
  };

  return (
    <div className="app-page">
      <Map onPathClick={onClickPais} selectedCountry={country} />

      <Card id="country-info">
        {countryInfo ? (
          <>
            <div className="flex justify-between">
              <img className="country-flag" src={countryInfo.flags.svg} />
              <Button onClick={unselectCountry} variant={"outline"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-x-icon lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
            <p>
              <strong>{country}</strong>
              <br />
              {countryInfo.name.official}
              <br />
              <strong>Capital:</strong> {countryInfo?.capital}
            </p>
          </>
        ) : (
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              filterBySearch();
            }}
          >
            <input
              type="search"
              id="default-search"
              ref={searchRef}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search a country"
              required
              onChange={filterBySearch}
            />
            <Button
              variant={"outline"}
              type="submit"
              className=" absolute end-3.5 top-3.5 h-10 w-10"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </Button>
          </form>
        )}
      </Card>
      {loadingList ? (
        <p>{"loading list..."}</p>
      ) : countryListToRender ? (
        <>
          <div id="country-list">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead className="max-w-10">Country name</TableHead>
                  <TableHead>Capital</TableHead>
                  <TableHead>Currencies</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countryListToRender.map((country, i) => (
                  <TableRow
                    key={country.name.common}
                    onClick={() => setCountry(country.name.common)}
                  >
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>
                      {country.name.common.length > 22
                        ? country.name.common.substring(0, 22) + "..."
                        : country.name.common}
                    </TableCell>
                    <TableCell>{country.capital}</TableCell>
                    <TableCell>
                      {Object.values(country.currencies)
                        .map(({ name, symbol }) => `${name} (${symbol})`)
                        .join(", ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <p>{"Couldn't load the countries list :/"}</p>
      )}
    </div>
  );
}
