/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFT, NFTInterface } from "../NFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ERC721EnumerableForbiddenBatchMint",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "ERC721OutOfBoundsIndex",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "counter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mintNFT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040525f600a5534801562000014575f80fd5b506040518060400160405280600881526020016726ac902a27a5a2a760c11b815250604051806040016040528060038152602001624d544b60e81b815250815f908162000062919062000118565b50600162000071828262000118565b505050620001e4565b634e487b7160e01b5f52604160045260245ffd5b600181811c90821680620000a357607f821691505b602082108103620000c257634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200011357805f5260205f20601f840160051c81016020851015620000ef5750805b601f840160051c820191505b8181101562000110575f8155600101620000fb565b50505b505050565b81516001600160401b038111156200013457620001346200007a565b6200014c816200014584546200008e565b84620000c8565b602080601f83116001811462000182575f84156200016a5750858301515b5f19600386901b1c1916600185901b178555620001dc565b5f85815260208120601f198616915b82811015620001b25788860151825594840194600190910190840162000191565b5085821015620001d057878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b61139480620001f25f395ff3fe608060405234801561000f575f80fd5b506004361061011c575f3560e01c80634f6ccce7116100a957806395d89b411161006e57806395d89b4114610250578063a22cb46514610258578063b88d4fde1461026b578063c87b56dd1461027e578063e985e9c514610291575f80fd5b80634f6ccce7146101fb57806354ba0f271461020e57806361bc221a146102215780636352211e1461022a57806370a082311461023d575f80fd5b806318160ddd116100ef57806318160ddd1461019d57806323b872dd146101af5780632f745c59146101c257806342842e0e146101d5578063439e2e45146101e8575f80fd5b806301ffc9a71461012057806306fdde0314610148578063081812fc1461015d578063095ea7b314610188575b5f80fd5b61013361012e366004610fc1565b6102a4565b60405190151581526020015b60405180910390f35b6101506102ce565b60405161013f9190611029565b61017061016b36600461103b565b61035d565b6040516001600160a01b03909116815260200161013f565b61019b61019636600461106d565b610384565b005b6008545b60405190815260200161013f565b61019b6101bd366004611095565b610393565b6101a16101d036600461106d565b610421565b61019b6101e3366004611095565b610484565b61019b6101f6366004611095565b6104a3565b6101a161020936600461103b565b6104ae565b6101a161021c3660046110ce565b610503565b6101a1600a5481565b61017061023836600461103b565b61052c565b6101a161024b3660046110ce565b610536565b61015061057b565b61019b6102663660046110e7565b61058a565b61019b610279366004611134565b610595565b61015061028c36600461103b565b6105ac565b61013361029f366004611209565b61061d565b5f6001600160e01b0319821663780e9d6360e01b14806102c857506102c88261064a565b92915050565b60605f80546102dc9061123a565b80601f01602080910402602001604051908101604052809291908181526020018280546103089061123a565b80156103535780601f1061032a57610100808354040283529160200191610353565b820191905f5260205f20905b81548152906001019060200180831161033657829003601f168201915b5050505050905090565b5f61036782610699565b505f828152600460205260409020546001600160a01b03166102c8565b61038f8282336106d1565b5050565b6001600160a01b0382166103c157604051633250574960e11b81525f60048201526024015b60405180910390fd5b5f6103cd8383336106de565b9050836001600160a01b0316816001600160a01b03161461041b576040516364283d7b60e01b81526001600160a01b03808616600483015260248201849052821660448201526064016103b8565b50505050565b5f61042b83610536565b821061045c5760405163295f44f760e21b81526001600160a01b0384166004820152602481018390526044016103b8565b506001600160a01b03919091165f908152600660209081526040808320938352929052205490565b61049e83838360405180602001604052805f815250610595565b505050565b61049e838383610484565b5f6104b860085490565b82106104e05760405163295f44f760e21b81525f6004820152602481018390526044016103b8565b600882815481106104f3576104f3611272565b905f5260205f2001549050919050565b600a80545f91826105138361129a565b919050555061052482600a546107b1565b5050600a5490565b5f6102c882610699565b5f6001600160a01b038216610560576040516322718ad960e21b81525f60048201526024016103b8565b506001600160a01b03165f9081526003602052604090205490565b6060600180546102dc9061123a565b61038f3383836107ca565b6105a0848484610393565b61041b84848484610868565b60606105b782610699565b505f6105cd60408051602081019091525f815290565b90505f8151116105eb5760405180602001604052805f815250610616565b806105f58461098e565b6040516020016106069291906112b2565b6040516020818303038152906040525b9392505050565b6001600160a01b039182165f90815260056020908152604080832093909416825291909152205460ff1690565b5f6001600160e01b031982166380ac58cd60e01b148061067a57506001600160e01b03198216635b5e139f60e01b145b806102c857506301ffc9a760e01b6001600160e01b03198316146102c8565b5f818152600260205260408120546001600160a01b0316806102c857604051637e27328960e01b8152600481018490526024016103b8565b61049e8383836001610a1e565b5f806106eb858585610b22565b90506001600160a01b0381166107475761074284600880545f838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b61076a565b846001600160a01b0316816001600160a01b03161461076a5761076a8185610c14565b6001600160a01b0385166107865761078184610ca1565b6107a9565b846001600160a01b0316816001600160a01b0316146107a9576107a98585610d48565b949350505050565b61038f828260405180602001604052805f815250610d96565b6001600160a01b0382166107fc57604051630b61174360e31b81526001600160a01b03831660048201526024016103b8565b6001600160a01b038381165f81815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b1561041b57604051630a85bd0160e11b81526001600160a01b0384169063150b7a02906108aa9033908890879087906004016112e0565b6020604051808303815f875af19250505080156108e4575060408051601f3d908101601f191682019092526108e19181019061131c565b60015b61094b573d808015610911576040519150601f19603f3d011682016040523d82523d5f602084013e610916565b606091505b5080515f0361094357604051633250574960e11b81526001600160a01b03851660048201526024016103b8565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b1461098757604051633250574960e11b81526001600160a01b03851660048201526024016103b8565b5050505050565b60605f61099a83610dac565b60010190505f8167ffffffffffffffff8111156109b9576109b9611120565b6040519080825280601f01601f1916602001820160405280156109e3576020820181803683370190505b5090508181016020015b5f19016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846109ed57509392505050565b8080610a3257506001600160a01b03821615155b15610af3575f610a4184610699565b90506001600160a01b03831615801590610a6d5750826001600160a01b0316816001600160a01b031614155b8015610a805750610a7e818461061d565b155b15610aa95760405163a9fbf51f60e01b81526001600160a01b03841660048201526024016103b8565b8115610af15783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b50505f90815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b5f828152600260205260408120546001600160a01b0390811690831615610b4e57610b4e818486610e83565b6001600160a01b03811615610b8857610b695f855f80610a1e565b6001600160a01b0381165f90815260036020526040902080545f190190555b6001600160a01b03851615610bb6576001600160a01b0385165f908152600360205260409020805460010190555b5f8481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b5f610c1e83610536565b5f83815260076020526040902054909150808214610c6f576001600160a01b0384165f9081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b505f9182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b6008545f90610cb290600190611337565b5f8381526009602052604081205460088054939450909284908110610cd957610cd9611272565b905f5260205f20015490508060088381548110610cf857610cf8611272565b5f918252602080832090910192909255828152600990915260408082208490558582528120556008805480610d2f57610d2f61134a565b600190038181905f5260205f20015f9055905550505050565b5f6001610d5484610536565b610d5e9190611337565b6001600160a01b039093165f908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b610da08383610ee7565b61049e5f848484610868565b5f8072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610dea5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610e16576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610e3457662386f26fc10000830492506010015b6305f5e1008310610e4c576305f5e100830492506008015b6127108310610e6057612710830492506004015b60648310610e72576064830492506002015b600a83106102c85760010192915050565b610e8e838383610f48565b61049e576001600160a01b038316610ebc57604051637e27328960e01b8152600481018290526024016103b8565b60405163177e802f60e01b81526001600160a01b0383166004820152602481018290526044016103b8565b6001600160a01b038216610f1057604051633250574960e11b81525f60048201526024016103b8565b5f610f1c83835f6106de565b90506001600160a01b0381161561049e576040516339e3563760e11b81525f60048201526024016103b8565b5f6001600160a01b038316158015906107a95750826001600160a01b0316846001600160a01b03161480610f815750610f81848461061d565b806107a95750505f908152600460205260409020546001600160a01b03908116911614919050565b6001600160e01b031981168114610fbe575f80fd5b50565b5f60208284031215610fd1575f80fd5b813561061681610fa9565b5f5b83811015610ff6578181015183820152602001610fde565b50505f910152565b5f8151808452611015816020860160208601610fdc565b601f01601f19169290920160200192915050565b602081525f6106166020830184610ffe565b5f6020828403121561104b575f80fd5b5035919050565b80356001600160a01b0381168114611068575f80fd5b919050565b5f806040838503121561107e575f80fd5b61108783611052565b946020939093013593505050565b5f805f606084860312156110a7575f80fd5b6110b084611052565b92506110be60208501611052565b9150604084013590509250925092565b5f602082840312156110de575f80fd5b61061682611052565b5f80604083850312156110f8575f80fd5b61110183611052565b915060208301358015158114611115575f80fd5b809150509250929050565b634e487b7160e01b5f52604160045260245ffd5b5f805f8060808587031215611147575f80fd5b61115085611052565b935061115e60208601611052565b925060408501359150606085013567ffffffffffffffff80821115611181575f80fd5b818701915087601f830112611194575f80fd5b8135818111156111a6576111a6611120565b604051601f8201601f19908116603f011681019083821181831017156111ce576111ce611120565b816040528281528a60208487010111156111e6575f80fd5b826020860160208301375f60208483010152809550505050505092959194509250565b5f806040838503121561121a575f80fd5b61122383611052565b915061123160208401611052565b90509250929050565b600181811c9082168061124e57607f821691505b60208210810361126c57634e487b7160e01b5f52602260045260245ffd5b50919050565b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b5f600182016112ab576112ab611286565b5060010190565b5f83516112c3818460208801610fdc565b8351908301906112d7818360208801610fdc565b01949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f9061131290830184610ffe565b9695505050505050565b5f6020828403121561132c575f80fd5b815161061681610fa9565b818103818111156102c8576102c8611286565b634e487b7160e01b5f52603160045260245ffdfea2646970667358221220c25bb548ee7618237f02f521ee6210ee03da1936c98bc611ba2ee57c58e62d4864736f6c63430008180033";

type NFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFT__factory extends ContractFactory {
  constructor(...args: NFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "NFT";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFT> {
    return super.deploy(overrides || {}) as Promise<NFT>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NFT {
    return super.attach(address) as NFT;
  }
  connect(signer: Signer): NFT__factory {
    return super.connect(signer) as NFT__factory;
  }
  static readonly contractName: "NFT";
  public readonly contractName: "NFT";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTInterface {
    return new utils.Interface(_abi) as NFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NFT {
    return new Contract(address, _abi, signerOrProvider) as NFT;
  }
}
