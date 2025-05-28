import { Country } from "@/types/Country";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface CountriesTableProps {
  dataShownInTheTable: string[];
  countryFilteredList: Country[];
  countryInfo: Country | undefined;
  setCountry: (countryCode: string) => void;
}

export const CountriesTable = ({
  dataShownInTheTable,
  countryFilteredList,
  countryInfo,
  setCountry,
}: CountriesTableProps) => {
  return (
    <div id="country-list" className="lg:w-[500px] xl:w-[600px] 2xl:w-[700px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead className="max-w-10">Country name</TableHead>
            <TableHead className="max-w-10">Capital</TableHead>
            {dataShownInTheTable.length ? (
              dataShownInTheTable.map((attribute: string) => (
                <TableHead className="max-w-10 min-w-6">
                  {attribute.length > 7
                    ? attribute.substring(0, 5) + "."
                    : attribute}
                </TableHead>
              ))
            ) : (
              <></>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {countryFilteredList.map((itemData, i) => {
            const bg =
              countryInfo?.name.common === itemData.name.common
                ? "bg-gray-300"
                : "";
            return (
              <TableRow
                key={itemData.name.common}
                onClick={() => setCountry(itemData.cca2)}
                id={`table-country-${itemData.cca2}`}
              >
                <TableCell className={`font-medium ${bg}`}>{i + 1}</TableCell>
                <TableCell className={`${bg}`}>
                  {itemData.name.common.length > 22
                    ? itemData.name.common.substring(0, 22) + "..."
                    : itemData.name.common}
                </TableCell>
                <TableCell className={`${bg}`}>{itemData.capital}</TableCell>
                {dataShownInTheTable.map((attribute: string) => (
                  <TableCell className={`${bg}`}>
                    {itemData[attribute as keyof Country]?.toString()}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
