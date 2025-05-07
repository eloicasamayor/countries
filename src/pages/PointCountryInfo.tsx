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
import {
  unMembers,
  unSecurityCouncil,
  unObservers,
} from "../data/countries-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ListFilter } from "lucide-react";

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
      common: string;
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
  const [searchValue, setSearchValue] = useState<string>("");

  const [independentChecked, setIndependentChecked] = useState(true);
  const [notIndependentChecked, setNotIndependentChecked] = useState(true);

  useEffect(() => {
    if (!country) {
      return;
    }
    fetch(`https://restcountries.com/v3.1/alpha/${country}`)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        setCountryInfo(data[0]);
      });
  }, [country]);

  useEffect(() => {
    setLoadingList(true);
    fetch(
      `https://restcountries.com/v3.1/all?fields=name,capital,cca2,independent`
    )
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

  const findCountryInUNMembers = (search: string) => {
    const normalizedSearch = normalizeText(search);

    return unMembers.find((entry) =>
      normalizeText(entry.country).includes(normalizedSearch)
    );
  };

  useEffect(
    () => applyCombinedFilters(),
    [searchValue, independentChecked, notIndependentChecked]
  );

  return (
    <div className="flex flex-col lg:flex-row-reverse">
      <div className="aspect-[4.5/3]">
        <Map onPathClick={onClickPais} selectedCountry={country} />
      </div>

      <Card className="z-20 fixed bottom-0 p-2.5 w-full bg-gray-300 rounded-b-none">
        {countryInfo && (
          <>
            <div className="flex justify-between">
              <img className="w-14" src={countryInfo.flags.svg} />
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
              <strong>{`${countryInfo.name.common} (${country})`}</strong>
              <br />
              {countryInfo.name.official}
              <br />
              <strong>Capital:</strong> {countryInfo?.capital}
              <br />
              <strong>UN membership:</strong>{" "}
              {findCountryInUNMembers(countryInfo.name.common)
                ?.admission_date ?? "no"}
              {unSecurityCouncil.includes(countryInfo.name.common)
                ? " (Permanent member of the UN Security Council)"
                : ""}
              {unObservers.includes(countryInfo.name.common)
                ? " (non-member observer)"
                : ""}
              <br />
            </p>
          </>
        )}
        {
          <form
            className={`flex gap-4 ${!!countryInfo && "hidden"}`}
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              setSearchValue((form.elements[0] as HTMLInputElement).value);
              const input = form.elements.namedItem(
                "search"
              ) as HTMLInputElement;
              input.blur();
            }}
          >
            <div className="relative grow">
              <Input
                name="search"
                type="search"
                id="default-search"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search a country"
                required
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              />
              {!!searchValue && (
                <Button
                  id="search-btn"
                  variant={"outline"}
                  type="button"
                  className=" absolute end-2 top-1.5 h-6 w-6"
                  onClick={() => {
                    setSearchValue("");
                  }}
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
                      d="M6 6l8 8m0-8l-8 8"
                    />
                  </svg>
                </Button>
              )}
            </div>
            <Dialog>
              <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3">
                <ListFilter />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <div className="items-top flex space-x-2">
                  <Checkbox
                    id="checkbox-independent"
                    onCheckedChange={(e) => setIndependentChecked(e)}
                    defaultChecked={true}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="checkbox-independent"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Independent states
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Show independent states.
                    </p>
                  </div>
                </div>

                <div className="text-left">
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      id="checkbox-not-independent"
                      onCheckedChange={(e) => setNotIndependentChecked(e)}
                      defaultChecked={true}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="checkbox-not-independent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Not independent states
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Show not independent states.
                      </p>
                    </div>
                  </div>
                  <br></br>
                  {searchValue && (
                    <label>
                      Search query:
                      <Input type="text" disabled defaultValue={searchValue} />
                    </label>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </form>
        }
      </Card>
      {loadingList ? (
        <p>{"loading list..."}</p>
      ) : countryFilteredList ? (
        <>
          <div id="country-list">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead className="max-w-10">Country name</TableHead>
                  <TableHead>Capital</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countryFilteredList.map((country, i) => {
                  const bg =
                    countryInfo?.name.common === country.name.common
                      ? "bg-gray-300"
                      : "";
                  return (
                    <TableRow
                      key={country.name.common}
                      onClick={() => setCountry(country.cca2)}
                      id={`table-country-${country.cca2}`}
                    >
                      <TableCell className={`font-medium ${bg}`}>
                        {i + 1}
                      </TableCell>
                      <TableCell className={`${bg}`}>
                        {country.name.common.length > 22
                          ? country.name.common.substring(0, 22) + "..."
                          : country.name.common}
                      </TableCell>
                      <TableCell className={`${bg}`}>
                        {country.capital}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
