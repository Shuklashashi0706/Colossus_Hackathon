/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface CyberMavenInterface extends utils.Interface {
  contractName: "CyberMaven";
  functions: {
    "callSetter(address,bytes)": FunctionFragment;
    "erc1155SafeTransferFrom(address,address,uint256,uint256,bytes)": FunctionFragment;
    "erc1155setApprovalForAll(address,address,bool)": FunctionFragment;
    "erc20Approve(address,address,uint256)": FunctionFragment;
    "erc20Transfer(address,address,uint256)": FunctionFragment;
    "erc721Approve(address,address,uint256)": FunctionFragment;
    "erc721SafeTransferFrom(address,address,uint256)": FunctionFragment;
    "erc721Transfer(address,address,uint256)": FunctionFragment;
    "erc721setApprovalForAll(address,address,bool)": FunctionFragment;
    "executeCall(address,uint256,bytes)": FunctionFragment;
    "getBalance()": FunctionFragment;
    "getValueFromMyContract(address,bytes)": FunctionFragment;
    "isValidSignature(bytes32,bytes)": FunctionFragment;
    "name()": FunctionFragment;
    "nonce()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "setWalletName(string)": FunctionFragment;
    "setWalletSymbol(string)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "token()": FunctionFragment;
    "version()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "callSetter",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "erc1155SafeTransferFrom",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "erc1155setApprovalForAll",
    values: [string, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "erc20Approve",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc20Transfer",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721Approve",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721SafeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721Transfer",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721setApprovalForAll",
    values: [string, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "executeCall",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getValueFromMyContract",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSignature",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setWalletName",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setWalletSymbol",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "callSetter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "erc1155SafeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc1155setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc20Approve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc20Transfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721Approve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721SafeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721Transfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getValueFromMyContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setWalletName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWalletSymbol",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {
    "ECR6551ERC1155Transfer(address,address,uint256,uint256)": EventFragment;
    "ECR6551ERC20Transfer(address,address,uint256)": EventFragment;
    "ECR6551ERC721SafeTransferFrom(address,address,uint256)": EventFragment;
    "ECR6551ERC721Transfer(address,address,uint256)": EventFragment;
    "ERC6551ERC1155SetApprovalForAll(address,address,bool)": EventFragment;
    "ERC6551ERC20Approve(address,address,uint256)": EventFragment;
    "ERC6551ERC721Approve(address,address,uint256)": EventFragment;
    "ERC6551ERC721SetApprovalForAll(address,address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ECR6551ERC1155Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ECR6551ERC20Transfer"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ECR6551ERC721SafeTransferFrom"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ECR6551ERC721Transfer"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ERC6551ERC1155SetApprovalForAll"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ERC6551ERC20Approve"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ERC6551ERC721Approve"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ERC6551ERC721SetApprovalForAll"
  ): EventFragment;
}

export type ECR6551ERC1155TransferEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  { contractAddress: string; to: string; id: BigNumber; amount: BigNumber }
>;

export type ECR6551ERC1155TransferEventFilter =
  TypedEventFilter<ECR6551ERC1155TransferEvent>;

export type ECR6551ERC20TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { contractAddress: string; to: string; amount: BigNumber }
>;

export type ECR6551ERC20TransferEventFilter =
  TypedEventFilter<ECR6551ERC20TransferEvent>;

export type ECR6551ERC721SafeTransferFromEvent = TypedEvent<
  [string, string, BigNumber],
  { contractAddress: string; to: string; tokenId: BigNumber }
>;

export type ECR6551ERC721SafeTransferFromEventFilter =
  TypedEventFilter<ECR6551ERC721SafeTransferFromEvent>;

export type ECR6551ERC721TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { contractAddress: string; to: string; tokenId: BigNumber }
>;

export type ECR6551ERC721TransferEventFilter =
  TypedEventFilter<ECR6551ERC721TransferEvent>;

export type ERC6551ERC1155SetApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  { contractAddress: string; operator: string; approved: boolean }
>;

export type ERC6551ERC1155SetApprovalForAllEventFilter =
  TypedEventFilter<ERC6551ERC1155SetApprovalForAllEvent>;

export type ERC6551ERC20ApproveEvent = TypedEvent<
  [string, string, BigNumber],
  { contractAddress: string; spender: string; amount: BigNumber }
>;

export type ERC6551ERC20ApproveEventFilter =
  TypedEventFilter<ERC6551ERC20ApproveEvent>;

export type ERC6551ERC721ApproveEvent = TypedEvent<
  [string, string, BigNumber],
  { contractAddress: string; to: string; tokenId: BigNumber }
>;

export type ERC6551ERC721ApproveEventFilter =
  TypedEventFilter<ERC6551ERC721ApproveEvent>;

export type ERC6551ERC721SetApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  { contractAddress: string; to: string; check: boolean }
>;

export type ERC6551ERC721SetApprovalForAllEventFilter =
  TypedEventFilter<ERC6551ERC721SetApprovalForAllEvent>;

export interface CyberMaven extends BaseContract {
  contractName: "CyberMaven";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CyberMavenInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    callSetter(
      contractAddress: string,
      payload: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc1155SafeTransferFrom(
      contractAddr: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc1155setApprovalForAll(
      contractAddr: string,
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc20Approve(
      contractAddr: string,
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc20Transfer(
      contractAddr: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc721Approve(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc721SafeTransferFrom(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc721Transfer(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc721setApprovalForAll(
      contractAddr: string,
      to: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    executeCall(
      to: string,
      value: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    getValueFromMyContract(
      contractAddr: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isValidSignature(
      hash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { magicValue: string }>;

    name(overrides?: CallOverrides): Promise<[string]>;

    nonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setWalletName(
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWalletSymbol(
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    token(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber] & {
        chainId: BigNumber;
        tokenContract: string;
        tokenId: BigNumber;
      }
    >;

    version(overrides?: CallOverrides): Promise<[number]>;
  };

  callSetter(
    contractAddress: string,
    payload: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc1155SafeTransferFrom(
    contractAddr: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc1155setApprovalForAll(
    contractAddr: string,
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc20Approve(
    contractAddr: string,
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc20Transfer(
    contractAddr: string,
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc721Approve(
    contractAddr: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc721SafeTransferFrom(
    contractAddr: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc721Transfer(
    contractAddr: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc721setApprovalForAll(
    contractAddr: string,
    to: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  executeCall(
    to: string,
    value: BigNumberish,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBalance(overrides?: CallOverrides): Promise<BigNumber>;

  getValueFromMyContract(
    contractAddr: string,
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  isValidSignature(
    hash: BytesLike,
    signature: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  name(overrides?: CallOverrides): Promise<string>;

  nonce(overrides?: CallOverrides): Promise<BigNumber>;

  onERC1155BatchReceived(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onERC1155Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  setWalletName(
    _name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWalletSymbol(
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  token(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber] & {
      chainId: BigNumber;
      tokenContract: string;
      tokenId: BigNumber;
    }
  >;

  version(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    callSetter(
      contractAddress: string,
      payload: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    erc1155SafeTransferFrom(
      contractAddr: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    erc1155setApprovalForAll(
      contractAddr: string,
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    erc20Approve(
      contractAddr: string,
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc20Transfer(
      contractAddr: string,
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc721Approve(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc721SafeTransferFrom(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc721Transfer(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc721setApprovalForAll(
      contractAddr: string,
      to: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    executeCall(
      to: string,
      value: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getValueFromMyContract(
      contractAddr: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    isValidSignature(
      hash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    name(overrides?: CallOverrides): Promise<string>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    setWalletName(_name: string, overrides?: CallOverrides): Promise<void>;

    setWalletSymbol(_symbol: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    token(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber] & {
        chainId: BigNumber;
        tokenContract: string;
        tokenId: BigNumber;
      }
    >;

    version(overrides?: CallOverrides): Promise<number>;
  };

  filters: {
    "ECR6551ERC1155Transfer(address,address,uint256,uint256)"(
      contractAddress?: null,
      to?: string | null,
      id?: BigNumberish | null,
      amount?: BigNumberish | null
    ): ECR6551ERC1155TransferEventFilter;
    ECR6551ERC1155Transfer(
      contractAddress?: null,
      to?: string | null,
      id?: BigNumberish | null,
      amount?: BigNumberish | null
    ): ECR6551ERC1155TransferEventFilter;

    "ECR6551ERC20Transfer(address,address,uint256)"(
      contractAddress?: string | null,
      to?: string | null,
      amount?: BigNumberish | null
    ): ECR6551ERC20TransferEventFilter;
    ECR6551ERC20Transfer(
      contractAddress?: string | null,
      to?: string | null,
      amount?: BigNumberish | null
    ): ECR6551ERC20TransferEventFilter;

    "ECR6551ERC721SafeTransferFrom(address,address,uint256)"(
      contractAddress?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): ECR6551ERC721SafeTransferFromEventFilter;
    ECR6551ERC721SafeTransferFrom(
      contractAddress?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): ECR6551ERC721SafeTransferFromEventFilter;

    "ECR6551ERC721Transfer(address,address,uint256)"(
      contractAddress?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): ECR6551ERC721TransferEventFilter;
    ECR6551ERC721Transfer(
      contractAddress?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): ECR6551ERC721TransferEventFilter;

    "ERC6551ERC1155SetApprovalForAll(address,address,bool)"(
      contractAddress?: string | null,
      operator?: string | null,
      approved?: boolean | null
    ): ERC6551ERC1155SetApprovalForAllEventFilter;
    ERC6551ERC1155SetApprovalForAll(
      contractAddress?: string | null,
      operator?: string | null,
      approved?: boolean | null
    ): ERC6551ERC1155SetApprovalForAllEventFilter;

    "ERC6551ERC20Approve(address,address,uint256)"(
      contractAddress?: string | null,
      spender?: string | null,
      amount?: BigNumberish | null
    ): ERC6551ERC20ApproveEventFilter;
    ERC6551ERC20Approve(
      contractAddress?: string | null,
      spender?: string | null,
      amount?: BigNumberish | null
    ): ERC6551ERC20ApproveEventFilter;

    "ERC6551ERC721Approve(address,address,uint256)"(
      contractAddress?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): ERC6551ERC721ApproveEventFilter;
    ERC6551ERC721Approve(
      contractAddress?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): ERC6551ERC721ApproveEventFilter;

    "ERC6551ERC721SetApprovalForAll(address,address,bool)"(
      contractAddress?: string | null,
      to?: string | null,
      check?: boolean | null
    ): ERC6551ERC721SetApprovalForAllEventFilter;
    ERC6551ERC721SetApprovalForAll(
      contractAddress?: string | null,
      to?: string | null,
      check?: boolean | null
    ): ERC6551ERC721SetApprovalForAllEventFilter;
  };

  estimateGas: {
    callSetter(
      contractAddress: string,
      payload: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc1155SafeTransferFrom(
      contractAddr: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc1155setApprovalForAll(
      contractAddr: string,
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc20Approve(
      contractAddr: string,
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc20Transfer(
      contractAddr: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc721Approve(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc721SafeTransferFrom(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc721Transfer(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc721setApprovalForAll(
      contractAddr: string,
      to: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    executeCall(
      to: string,
      value: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getValueFromMyContract(
      contractAddr: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isValidSignature(
      hash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setWalletName(
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWalletSymbol(
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    callSetter(
      contractAddress: string,
      payload: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc1155SafeTransferFrom(
      contractAddr: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc1155setApprovalForAll(
      contractAddr: string,
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc20Approve(
      contractAddr: string,
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc20Transfer(
      contractAddr: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc721Approve(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc721SafeTransferFrom(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc721Transfer(
      contractAddr: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc721setApprovalForAll(
      contractAddr: string,
      to: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    executeCall(
      to: string,
      value: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getValueFromMyContract(
      contractAddr: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isValidSignature(
      hash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setWalletName(
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWalletSymbol(
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
