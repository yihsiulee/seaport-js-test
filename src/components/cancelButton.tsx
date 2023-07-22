import { Button } from "@chakra-ui/react";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import { OpenSeaSDK, Chain } from "opensea-js";

declare global {
  interface Window {
    ethereum: any;
  }
}

const CancelButton = (props: { order: any; accountAddress: string }) => {
  window.Buffer = window.Buffer || Buffer;

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const openseaSDK = new OpenSeaSDK(provider, {
    chain: Chain.Mumbai,
    //if use testnet, no need to set apiKey
    apiKey: "",
  });
  const { order, accountAddress } = props;

  console.log("order", order);
  console.log("accountAddress", accountAddress);
  const callTransaction = async () => {
    const cancel = await openseaSDK.cancelOrder({
      order: order,
      accountAddress: accountAddress as string,
    });
    console.log("cancel:", cancel);
  };
  return <Button onClick={callTransaction}>cancel</Button>;
};

export default CancelButton;
