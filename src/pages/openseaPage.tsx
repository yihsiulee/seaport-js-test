/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@chakra-ui/react";
import Navigation from "../components/navi";
import { Seaport } from "@opensea/seaport-js";
import { ethers } from "ethers";
import { OpenSeaSDK, Chain } from "opensea-js";
import { GetNFTResponse } from "opensea-js/lib/api/types";
import { OpenSeaAsset } from "opensea-js/lib/types";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const openseaSDK = new OpenSeaSDK(provider, {
  chain: Chain.Mumbai,
  //if use testnet, no need to set apiKey
  apiKey: "",
});

const tokenAddress = "0x304CB9f97E604AfedaF2655c1F784df9f97155e3";
const tokenId = "0";
// const asset: GetNFTResponse = await openseaSDK.api.getNFT(
//   Chain.Mumbai, // string
//   tokenAddress, // string
//   tokenId
//   // string | number | BigNumber | null
// );

// console.log("asset:", asset);

function OpenseaPage() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [currentOrder, setCurrentOrder] = useState<any>();
  // Get offers (bids), a.k.a. orders where `side == 0`
  const handleFtch = async () => {
    // const { orders } = await openseaSDK.api.getOrders({
    //   assetContractAddress: tokenAddress,
    //   tokenId,
    //   side: "bid",
    // });

    // Get page 2 of all auctions, a.k.a. orders where `side == 1`
    const { orders } = await openseaSDK.api.getOrders({
      assetContractAddress: tokenAddress,
      tokenId,
      side: "ask",
    });
    console.log("orders:", orders);
    setCurrentOrder(orders[0]);
  };

  const handleList = async () => {
    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);

    const listing = await openseaSDK.createSellOrder({
      asset: {
        tokenId: tokenId,
        tokenAddress: tokenAddress,
      },
      accountAddress: address as string,
      startAmount: 3,
      // If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order:
      endAmount: 3,
      expirationTime,
    });
    console.log("listing:", listing);
  };

  const handleCancel = async () => {
    const cancel = await openseaSDK.cancelOrder({
      order: currentOrder,
      accountAddress: address as string,
    });
    console.log("cancel:", cancel);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <ConnectButton />

        <p>opensea.js test Page</p>
        <p>TODO :connect open sea list api</p>
        <p> open sea list api</p>
        <p> open sea buy api</p>
      </header>
      <Button onClick={handleList}>list iten</Button>
      <Button onClick={handleFtch}>Fetch</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
}

export default OpenseaPage;
