import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export const ProjectInfo = () => {
  return (
    <Dialog>
      <DialogTrigger className="h-9 w-9 fixed top-0 right-0 mr-2 mt-2 z-50">
        ?
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About me</DialogTitle>
          <DialogDescription>
            <p className="text-left">
              Hello, I am Eloi Casamayor Esteve, a web developer who also likes
              geography. Here some links:
              <ul className="pl-6">
                <li className="text-left list-disc">
                  My{" "}
                  <a
                    className="underline text-black"
                    href="https://eloicasamayor.github.io/new-portfolio/en/"
                  >
                    portfolio
                  </a>
                </li>
                <li className="text-left list-disc">
                  My{" "}
                  <a
                    className="underline text-black"
                    href="https://github.com/eloicasamayor"
                  >
                    github
                  </a>
                </li>
              </ul>
            </p>
            <br></br>
          </DialogDescription>
          <DialogTitle>About the project</DialogTitle>
          <DialogDescription>
            <p className="text-left">
              The source code is{" "}
              <a
                className="underline text-black"
                href="https://github.com/eloicasamayor/countries"
              >
                here
              </a>
              , you can contribute if you want, any idea is welcomed.
            </p>
            <p className="text-left">
              Features I would like to include: more data (area, population,
              PIB, life expectancy...), links to wikipedia or other sources...
            </p>
          </DialogDescription>
          <br></br>
          <DialogTitle>Sources</DialogTitle>
          <DialogDescription>
            <p className="text-left">The sources are the following</p>
            <ul className="pl-6">
              <li className="text-left list-disc">
                The list of countries comes from the{" "}
                <a
                  className="underline text-black"
                  href="https://restcountries.com/"
                >
                  REST countries API{" "}
                </a>
              </li>
              <li className="text-left list-disc">
                The map comes from{" "}
                <a
                  className="underline text-black"
                  href="https://mapsvg.com/maps/world"
                >
                  mapsvg.com
                </a>
              </li>
              <li>
                The area data comes from{" "}
                <a
                  className="underline text-black"
                  href="https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_area"
                >
                  Wikipedia
                </a>
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
