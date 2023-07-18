import { Button } from "@chakra-ui/react";
import { Seaport } from "@opensea/seaport-js";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { Buffer } from "buffer";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const FulfillButton = (props: { currentOrder: any; fulfiller: string }) => {
  window.Buffer = window.Buffer || Buffer;

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const seaport = new Seaport(provider);

  const { currentOrder, fulfiller } = props;

  console.log("currentOrder", currentOrder);
  console.log("fulfiller", fulfiller);
  const callTransaction = async () => {
    const { executeAllActions: executeAllFulfillActions } =
      await seaport.fulfillOrder({
        order: currentOrder as OrderWithCounter,
        accountAddress: fulfiller,
      });

    await executeAllFulfillActions();
  };
  return <Button onClick={callTransaction}>fulfill order</Button>;
};

export default FulfillButton;
