/* eslint-disable react-hooks/rules-of-hooks */
import Navigation from "../components/navi";
import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import FulfillButton from "../components/fulfillButton";
import { useAccount } from "wagmi";

window.Buffer = window.Buffer || Buffer;

declare global {
  interface Window {
    ethereum: any;
  }
}
const provider = new ethers.providers.Web3Provider(window.ethereum);

const seaport = new Seaport(provider);

const orderList: any[] = [];
const ERC721TOKEN = "0x304CB9f97E604AfedaF2655c1F784df9f97155e3";
const offerer = "0xeeEFbDFa58878e73ac087325a41EdFdf12eF4dbd";
const identifier = "0";
const fulfiller = "0x1D75e36227d5455E6Ad7B33ADDD7f0092142e6f1";

function Test() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [currentOrder, setCurrentOrder] = useState<any>();
  const [inputAddress, setInputAddress] = useState<string>(ERC721TOKEN);
  const [inputId, setInputId] = useState<string>("0");
  const [inputAmount, setInputAmount] = useState<string>("0.00001");
  const [currentOrderList, setCurrentOrderList] = useState<any[]>([]);
  const prepareOrder = async () => {
    const { executeAllActions } = await seaport.createOrder(
      {
        offer: [
          {
            itemType: ItemType.ERC721,
            token: inputAddress,
            identifier: inputId,
          },
        ],
        consideration: [
          {
            amount: ethers.utils.parseEther(inputAmount).toString(),
            recipient: address,
          },
        ],
      },
      address
    );

    console.log("prepareOrder");
    const order = await executeAllActions();
    console.log("order", order);

    setCurrentOrder(order);
    orderList.push(order);
    setCurrentOrderList(orderList);
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

  return (
    <div className="App">
      <header>
        <p>test page</p>

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

      <Button onClick={() => prepareOrder()}>prepare order</Button>
      {/* <Button onClick={() => callTransaction()}>transaction</Button> */}
      <Button onClick={() => console.log("aa:", currentOrderList)}>log</Button>
      <FulfillButton currentOrder={currentOrder} fulfiller={offerer} />
      <Text>{JSON.stringify(currentOrderList)}</Text>
      {/* <Button onClick={() => transaction()}>fulfill</Button> */}
    </div>
  );
}

export default Test;
