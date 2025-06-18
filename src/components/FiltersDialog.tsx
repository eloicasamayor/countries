import { Checkbox } from "@/components/ui/checkbox";
import { ListFilter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction } from "react";

const availableCountryData = [
  { name: "cca2", description: "Two-letter country code" },
  { name: "ccn3", description: "Three-digit country code" },
  { name: "cca3", description: "Three-letter country code" },
  { name: "independent", description: "Independent state" },
  { name: "unMember", description: "United Nations member" },
  { name: "region", description: "Region of the country" },
];

export default function FiltersDialog({
  searchValue,
  independentChecked,
  setIndependentChecked,
  notIndependentChecked,
  setNotIndependentChecked,
  dataShownInTheTable,
  setDataShownInTheTable,
}: {
  searchValue: string;
  independentChecked: boolean;
  setIndependentChecked: (value: boolean) => void;
  notIndependentChecked: boolean;
  setNotIndependentChecked: (value: boolean) => void;
  dataShownInTheTable: string[];
  setDataShownInTheTable: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3">
        <ListFilter />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter countries</DialogTitle>
        </DialogHeader>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="checkbox-independent"
            onCheckedChange={(e) => setIndependentChecked(e === true)}
            defaultChecked={independentChecked}
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
              onCheckedChange={(e) => setNotIndependentChecked(e === true)}
              defaultChecked={notIndependentChecked}
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
        <DialogHeader>
          <DialogTitle>Filter countries data</DialogTitle>
        </DialogHeader>
        {availableCountryData.map((countryAttribute) => (
          <div className="items-top flex space-x-2">
            <Checkbox
              id={countryAttribute.name}
              onCheckedChange={(e) => {
                setDataShownInTheTable((prev: string[]) => {
                  if (e === true) {
                    return [...prev, countryAttribute.name];
                  } else {
                    return prev.filter(
                      (item: string) => item !== countryAttribute.name
                    );
                  }
                });
              }}
              checked={dataShownInTheTable.includes(countryAttribute.name)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={countryAttribute.name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {countryAttribute.name}
              </label>
              <p className="text-sm text-muted-foreground">
                {countryAttribute.description}
              </p>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
