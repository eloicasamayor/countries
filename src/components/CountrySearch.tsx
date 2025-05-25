import { Country } from "@/types/Country";
import FiltersDialog from "./FiltersDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const CountrySearch = ({
  countryInfo,
  setSearchValue,
  searchValue,
  independentChecked,
  setIndependentChecked,
  notIndependentChecked,
  setNotIndependentChecked,
  dataShownInTheTable,
  setDataShownInTheTable,
}: {
  countryInfo: Country | undefined;
  setSearchValue: (value: string) => void;
  searchValue: string;
  independentChecked: boolean;
  setIndependentChecked: (checked: boolean) => void;
  notIndependentChecked: boolean;
  setNotIndependentChecked: (checked: boolean) => void;
  dataShownInTheTable: any;
  setDataShownInTheTable: (data: any) => void;
}) => {
  return (
    <form
      className={`flex gap-4 ${!!countryInfo && "hidden"}`}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        setSearchValue((form.elements[0] as HTMLInputElement).value);
        const input = form.elements.namedItem("search") as HTMLInputElement;
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
      <FiltersDialog
        searchValue={searchValue}
        independentChecked={independentChecked}
        setIndependentChecked={setIndependentChecked}
        notIndependentChecked={notIndependentChecked}
        setNotIndependentChecked={setNotIndependentChecked}
        dataShownInTheTable={dataShownInTheTable}
        setDataShownInTheTable={setDataShownInTheTable}
      />
    </form>
  );
};
