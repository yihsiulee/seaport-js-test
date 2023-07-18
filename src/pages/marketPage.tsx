/* eslint-disable react-hooks/rules-of-hooks */
import Navigation from "../components/navi";
import { Seaport } from "@opensea/seaport-js";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const seaport = new Seaport(provider);

function MarketPage() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <p>Market Page</p>
        <p>TODO :ADD Market card with fulfill button</p>
      </header>
    </div>
  );
}

export default MarketPage;
