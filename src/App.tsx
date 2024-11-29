// @ts-ignore
import { Map } from "./assets/Map";
import "./App.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { PointCountryGame } from "./pages/PointCountryGame";
import { PointCountryInfo } from "./pages/PointCountryInfo";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/point-country-game">Point Country Game</Link>
            </li>
            <li>
              <Link to="/point-country-info">Point Country info</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/point-country-game"
            element={<PointCountryGame />}
          ></Route>
          <Route
            path="/point-country-info"
            element={<PointCountryInfo />}
          ></Route>
          <Route path="/" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
