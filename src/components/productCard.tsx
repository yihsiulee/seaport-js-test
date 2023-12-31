import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import FulfillButton from "./fulfillButton";

type GameCardProps = {
  name: string;
  price: number;
  id: string;
  order: any;
  fulfiller: string;
  // live: boolean,
  // route: string,
  // image: any,
  // chainId: number
};

export default function ProductCard(props: GameCardProps) {
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
        <FulfillButton currentOrder={props.order} fulfiller={props.fulfiller} />
      </CardFooter>
    </Card>
  );
}
