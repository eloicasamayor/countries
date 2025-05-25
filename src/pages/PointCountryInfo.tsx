// @ts-ignore
import { Map } from "../assets/Map";
import "../App.css";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { ProjectInfo } from "@/components/ProjectInfo";
import { Country } from "../types/Country";
import { CountryInfoCard } from "@/components/CountryInfoCard";
import { CountrySearch } from "@/components/CountrySearch";
import { CountriesTable } from "@/components/CountriesTable";

export function PointCountryInfo() {
  const selectedPath = useRef<SVGPathElement | null>(null);
  const [country, setCountry] = useState("");
  const [dataShownInTheTable, setDataShownInTheTable] = useState<string[]>([]);

  const [countryInfo, setCountryInfo] = useState<Country | undefined>();
  const [countryList, setCountryList] = useState<Country[] | undefined>();
  const [countryFilteredList, setCountryFilteredList] = useState<
    Country[] | undefined
  >();
  const [loadingList, setLoadingList] = useState<boolean>();
  const [searchValue, setSearchValue] = useState<string>("");

  const [independentChecked, setIndependentChecked] = useState(true);
  const [notIndependentChecked, setNotIndependentChecked] = useState(true);

  useEffect(() => {
    console.log("dataShownInTheTable", dataShownInTheTable);
  }, [dataShownInTheTable]);

  useEffect(() => {
    if (!country) {
      return;
    }
    fetch(`https://restcountries.com/v3.1/alpha/${country}`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data[0]);
      });
  }, [country]);

  useEffect(() => {
    setLoadingList(true);
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountryList(data);
        setCountryFilteredList(data);
      })
      .then(() => setLoadingList(false));
  }, []);

  function unselectCountry() {
    if (selectedPath?.current) {
      selectedPath.current.setAttribute("className", "fill-stone-800");
    }
    setCountry("");
    setCountryInfo(undefined);
  }

  function onClickPais(e: MouseEvent) {
    const targ = e.target as SVGPathElement;
    selectedPath.current = targ;
    const id = (targ.attributes.getNamedItem("id") as Attr).value;

    if (!targ || !id) {
      return;
    }
    setCountry(id);
    const countryRow = document.getElementById(`table-country-${id}`);
    countryRow?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }

  const normalizeText = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const applyCombinedFilters = () => {
    const normalizedSearch = normalizeText(searchValue);

    const filteredCountries = countryList?.filter((countryToFilter) => {
      // Filtre per independència
      const isIndependent = countryToFilter.independent === true;
      const isNotIndependent = countryToFilter.independent === false;

      let passesIndependenceFilter = false;
      if (independentChecked && notIndependentChecked) {
        passesIndependenceFilter = true; // mostra tots
      } else if (independentChecked) {
        passesIndependenceFilter = isIndependent;
      } else if (notIndependentChecked) {
        passesIndependenceFilter = isNotIndependent;
      } else {
        passesIndependenceFilter = false; // cap checkbox → no passa
      }

      // Filtre per cerca
      const normalizedName = normalizeText(countryToFilter.name.common);
      const normalizedCapital = countryToFilter.capital?.[0]
        ? normalizeText(countryToFilter.capital[0])
        : "";

      const passesSearchFilter =
        !normalizedSearch ||
        normalizedName.includes(normalizedSearch) ||
        normalizedCapital.includes(normalizedSearch);

      // Només incloure si passa els dos filtres
      return passesIndependenceFilter && passesSearchFilter;
    });

    setCountryFilteredList(filteredCountries);
  };

  useEffect(
    () => applyCombinedFilters(),
    [searchValue, independentChecked, notIndependentChecked]
  );

  const littleCountryInfo = {
    independent: countryInfo?.independent,
    unMember: countryInfo?.unMember,
    area: countryInfo?.area,
    population: countryInfo?.population,
    region: countryInfo?.region,
    latlng: countryInfo?.latlng,
    languages: countryInfo?.languages,
    landLocked: countryInfo?.landlocked,
  };

  return (
    <>
      {<ProjectInfo />}
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="aspect-[4.5/3]">
          <Map onPathClick={onClickPais} selectedCountry={country} />
        </div>

        <Card className="z-20 fixed bottom-0 p-2.5 w-full bg-gray-300 rounded-b-none">
          {countryInfo && (
            <CountryInfoCard
              countryInfo={countryInfo}
              unselectCountry={unselectCountry}
              country={country}
              littleCountryInfo={littleCountryInfo}
            />
          )}
          {
            <CountrySearch
              countryInfo={countryInfo}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              independentChecked={independentChecked}
              setIndependentChecked={setIndependentChecked}
              notIndependentChecked={notIndependentChecked}
              setNotIndependentChecked={setNotIndependentChecked}
              dataShownInTheTable={dataShownInTheTable}
              setDataShownInTheTable={setDataShownInTheTable}
            />
          }
        </Card>
        {loadingList ? (
          <p>{"loading list..."}</p>
        ) : countryFilteredList ? (
          <CountriesTable
            dataShownInTheTable={dataShownInTheTable}
            countryFilteredList={countryFilteredList}
            countryInfo={countryInfo}
            setCountry={setCountry}
          />
        ) : (
          <p>{"Couldn't load the countries list :/"}</p>
        )}
      </div>
    </>
  );
}
