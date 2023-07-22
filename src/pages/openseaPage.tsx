/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Navigation from "../components/navi";
import { Seaport } from "@opensea/seaport-js";
import { ethers } from "ethers";
import { OpenSeaSDK, Chain } from "opensea-js";
import { GetNFTResponse } from "opensea-js/lib/api/types";
import { OpenSeaAsset } from "opensea-js/lib/types";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import OpenseaCard from "../components/openseaCard";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const openseaSDK = new OpenSeaSDK(provider, {
  chain: Chain.Mumbai,
  //if use testnet, no need to set apiKey
  apiKey: "",
});

const orderList: any[] = [];
const ERC721TOKEN = "0x304CB9f97E604AfedaF2655c1F784df9f97155e3";
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
  const [inputAddress, setInputAddress] = useState<string>(ERC721TOKEN);
  const [inputId, setInputId] = useState<string>("0");
  const [inputAmount, setInputAmount] = useState<string>("0.00001");
  // Get offers (bids), a.k.a. orders where `side == 0`
  const handleFtch = async () => {
    // const { orders } = await openseaSDK.api.getOrders({
    //   assetContractAddress: tokenAddress,
    //   tokenId,
    //   side: "bid",
    // });

    // Get page 2 of all auctions, a.k.a. orders where `side == 1`
    const { orders } = await openseaSDK.api.getOrders({
      assetContractAddress: ERC721TOKEN,
      tokenId,
      side: "ask",
    });

    orderList.length = 0;
    orders.map((order) => {
      orderList.push(order);
    });
    // setCurrentOrder(orders[0]);
    // console.log("orders:", orderList);
  };

  const handleList = async () => {
    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);

    const listing = await openseaSDK.createSellOrder({
      asset: {
        tokenId: inputId,
        tokenAddress: inputAddress,
      },
      accountAddress: address as string,
      startAmount: inputAmount,
      // If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order:
      endAmount: inputAmount,
      expirationTime,
    });
    console.log("listing:", listing);
    await handleFtch();
  };

  const handleInputAddress = (e: any) => {
    setInputAddress(e.target.value);
  };

  const handleInputId = (e: any) => {
    setInputId(e.target.value);
  };

  const handleInputAmount = (e: any) => {
    setInputAmount(e.target.value);
  };

  const handleLog = () => {
    console.log("log:", orderList);
  };

  return (
    <div className="App">
      <header>
        <p>opensea.js test Page</p>
        <Navigation />
        <ConnectButton />
      </header>
      <Text>seller address: {address}</Text>
      <FormControl>
        <FormLabel>Order: ERC721 Address</FormLabel>
        <Input
          id="address"
          onChange={handleInputAddress}
          value={inputAddress}
        />
        <FormLabel>Order: ERC721 token id</FormLabel>
        <Input id="tokenId" onChange={handleInputId} value={inputId} />
        <FormLabel>Order: sell price</FormLabel>
        <Input id="amount" onChange={handleInputAmount} value={inputAmount} />
      </FormControl>
      <div>
        <Button onClick={handleList}>list item</Button>
        <Button onClick={handleFtch}>Fetch</Button>
        <Button onClick={handleLog}>Log</Button>
      </div>
      <div>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {orderList.map((order) => (
            <OpenseaCard
              name={order.protocolData.parameters.offer[0].token}
              price={Number(
                ethers.utils.formatEther(Number(order.currentPrice._hex))
              )}
              id={order.protocolData.parameters.offer[0].identifierOrCriteria}
              order={order}
              accountAddress={address as string}
            />
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}

export default OpenseaPage;
