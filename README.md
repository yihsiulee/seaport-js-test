# To start the project
 `yarn start`

 `yarn i`

# Opensea SDK

reference: [opensea-js](https://github.com/ProjectOpenSea/opensea-js#making-listings--selling-items), openseaAPI [doc](https://docs.opensea.io/reference/api-overview)

```
yarn add opensea-js
```
## overview
Interact with opensea api, the functions e.g.`createSellOrder`, `cancelOrder` , will directly change thhe status of the item on opensea. Also if the transaction is successful, you need to pay the royalty fee and service fee to the opensea.

If you want to use testnet, no need to set apiKey.
And they will show on Opensea test market.

## setup
```javescript
const provider = new ethers.providers.Web3Provider(window.ethereum);

const openseaSDK = new OpenSeaSDK(provider, {
  chain: Chain.Mumbai,
  //if use testnet, no need to set apiKey
  apiKey: "",
});
```
## getOrders
```javescript
const { orders } = await openseaSDK.api.getOrders({
      assetContractAddress: ERC721TOKEN,
      tokenId,
      side: "ask",
    });
```

## createSellOrder
```javescript
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
```

```javescript
const cancel = await openseaSDK.cancelOrder({
      order: order,
      accountAddress: accountAddress as string,
    });
```

# Seaport-js
reference: [seaport-js](https://github.com/ProjectOpenSea/seaport-js/tree/main)
```
yarn add @opensea/seaport
```
## overview
Interact with [seaport protocol contract](https://github.com/ProjectOpenSea/seaport), function `createOrder` will not directly change the status of the item on Opensea. We need to store the order data in our database, and then use the function `fulfillOrder` to change the status of the item on blockchain.That means we will no need to pay the royalty fee and service fee to Opensea.

## setup
```javescript
const provider = new ethers.providers.Web3Provider(window.ethereum);

const seaport = new Seaport(provider);
```

## createOrder
```javescript
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

    const order = await executeAllActions();
```

## fulfillOrder
```javescript
const { executeAllActions: executeAllFulfillActions } =
      await seaport.fulfillOrder({
        order: currentOrder as OrderWithCounter,
        accountAddress: fulfiller,
      });

    await executeAllFulfillActions();
```


# TL;DR:
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
