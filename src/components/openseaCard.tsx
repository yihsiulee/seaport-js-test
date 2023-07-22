import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import CancelButton from "./cancelButton";

type GameCardProps = {
  name: string;
  price: number;
  id: string;
  order: any;
  accountAddress: string;
  // live: boolean,
  // route: string,
  // image: any,
  // chainId: number
};

export default function OpenseaCard(props: GameCardProps) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md"> NFT SELL</Heading>
      </CardHeader>
      <CardBody>
        <Text>NFT id: {props.id}</Text>
        <Text>NFT address: {props.name}</Text>
        <Text>NFT price: {props.price}</Text>
      </CardBody>
      <CardFooter>
        <CancelButton
          order={props.order}
          accountAddress={props.accountAddress}
        />
      </CardFooter>
    </Card>
  );
}
