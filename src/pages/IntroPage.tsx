import { Link } from "react-router-dom";

export const IntroPage = () => {
  return (
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
  );
};
