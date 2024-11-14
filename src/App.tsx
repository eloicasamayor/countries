// @ts-ignore
import { Map } from "./assets/world";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [country, setCountry] = useState("");

  useEffect(() => {
    let paths = document.querySelectorAll("path");
    for (let i = 0; i < paths.length; i++) {
      paths[i].addEventListener("click", (e) => onClickPais(e));
    }
  }, []);

  function onClickPais(e: MouseEvent) {
    const targ = e.target as SVGPathElement;
    const title = (targ.attributes.getNamedItem("title") as Attr).value;

    if (!title || !targ) {
      return;
    }
    console.log(title);
    targ.setAttribute("style", "fill:red");
    setCountry(title);
  }
  return (
    <>
      <p>{country}</p>
      <Map />
    </>
  );
}

export default App;
