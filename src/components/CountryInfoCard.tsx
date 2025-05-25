import { Country } from "@/types/Country";
import { Button } from "./ui/button";

interface CountryInfoCardProps {
  countryInfo: Country;
  unselectCountry: () => void;
  country: string;
  littleCountryInfo: Record<string, unknown>;
}

export const CountryInfoCard: React.FC<CountryInfoCardProps> = ({
  countryInfo,
  unselectCountry,
  country,
  littleCountryInfo,
}) => {
  return (
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
        <strong>UN membership:</strong> {countryInfo?.unMember ? "Yes" : "No"}
        <br />
        <details>
          <pre className="text-[8px]/[8px]">
            {JSON.stringify(littleCountryInfo, null, 2).replace(/,/g, ",\n")}
          </pre>
        </details>
      </p>
    </>
  );
};
