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
    // <div className="product-card">
    //   <div className="w-full md:w-[170px] lg:w-full">
    //     {/* <Image src={props.image} alt="" width={700} className="rounded-lg" /> */}
    //   </div>

    //   <div className="p-3">
    //     {/* Name */}
    //     <p
    //       className={`mt-2 font-bold text-[#fff]
    //                             md:mt-1`}
    //     >
    //       {props.name}
    //     </p>

    //     <p
    //       className={`mt-2 font-bold text-[#fff]
    //                             md:mt-1`}
    //     >
    //       {props.id}
    //     </p>

    //     {/* Price + Items */}
    //     <div
    //       className="flex justify-between mt-2
    //                             md:mt-1"
    //     >
    //       <div>
    //         <p className={`text-[#6F6F6F] font-bold text-xs`}>Price</p>
    //         <div className="flex mt-1">
    //           {/* <Image src={CoinImg} alt="" className="w-[14px] h-[14px]" /> */}
    //           <p
    //             className={`text-[#fff] font-bold text-xs
    //                                         md:font-semibold md:ml-1
    //                                         lg:font-bold lg:ml-2`}
    //           >
    //             {props.price}
    //           </p>
    //         </div>
    //       </div>
    //       {/* <div>
    //                     <p className={`text-[#6F6F6F] font-bold text-xs`}>
    //                         Items
    //                     </p>
    //                     <div>
    //                         <p className={`mt-1 text-[#fff] font-bold text-xs
    //                                         md:font-semibold md:mt-1
    //                                         lg:font-bold`}>
    //                             {props.supply}
    //                         </p>
    //                     </div>
    //                 </div> */}
    //     </div>

    //     {/* Button */}
    //     <div
    //       // onClick={() => router.push(props.route)}
    //       className="gradient-border p-0.5 rounded-full mt-4"
    //     >
    //       <FulfillButton
    //         currentOrder={props.order}
    //         fulfiller={props.fulfiller}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}
