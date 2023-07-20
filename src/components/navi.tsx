import { BrowserRouter as Route, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/seaport">Seaport.js</Link>
        </li>
        <li>
          <Link to="/opensea">Opensea.js</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
