import { BrowserRouter as Route, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
        <li>
          <Link to="/market">Market</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
