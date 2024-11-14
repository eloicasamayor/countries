import { Map } from "./assets/world";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [country, setCountry] = useState("");

  useEffect(() => {
    let paths = document.querySelectorAll("path");
    for (let i = 0; i < paths.length; i++) {
      paths[i].addEventListener("click", onClickPais);
    }
  }, []);

  function onClickPais(e) {
    console.log(e.target.attributes.title.value);
    e.target.setAttribute("style", "fill:red");

    setCountry(e.target.attributes.title.value);
  }
  return (
    <>
      <p>{country}</p>
      <Map />
    </>
  );
}

export default App;
