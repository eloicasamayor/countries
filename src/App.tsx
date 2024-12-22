// @ts-ignore
import { Map } from "./assets/Map";
import "./App.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { PointCountryGame } from "./pages/PointCountryGame";
import { PointCountryInfo } from "./pages/PointCountryInfo";
import { IntroPage } from "./pages/IntroPage";

function App() {
  return (
    <>
      <BrowserRouter basename="countries">
        <Routes>
          <Route
            path="/point-country-game"
            element={<PointCountryGame />}
          ></Route>
          <Route
            path="/point-country-info"
            element={<PointCountryInfo />}
          ></Route>
          <Route path="/" element={<IntroPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
