// Load the ABI of your smart contract
let abi = [
  {
    type: "function",
    name: "UpdateDistributor",
    inputs: [
      {
        type: "string",
        name: "_ProdCode",
        internalType: "string",
      },
      {
        type: "string",
        name: "_DistributorID",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "UpdateRetailor",
    inputs: [
      {
        type: "string",
        name: "_ProdCode",
        internalType: "string",
      },
      {
        type: "string",
        name: "_RetailorID",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "create",
    inputs: [
      {
        type: "string",
        name: "_ProdCode",
        internalType: "string",
      },
      {
        type: "string",
        name: "_ProductDetails",
        internalType: "string",
      },
      {
        type: "string",
        name: "_SnEDate",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "retrieve",
    inputs: [
      {
        type: "string",
        name: "_ProdCode",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
      {
        type: "string",
        name: "",
        internalType: "string",
      },
      {
        type: "string",
        name: "",
        internalType: "string",
      },
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
];

module.exports = JSON.stringify(abi);
