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

export interface MyriadFlowOfferStationInterface extends utils.Interface {
  contractName: "MyriadFlowOfferStation";
  functions: {
    "acceptOffer(uint256)": FunctionFragment;
    "createOffer(address,uint256)": FunctionFragment;
    "idToproposal(uint256)": FunctionFragment;
    "increaseOffer(uint256)": FunctionFragment;
    "paused()": FunctionFragment;
    "platformFeeBasisPoint()": FunctionFragment;
    "proposalCounter()": FunctionFragment;
    "royaltyInfo(uint256,uint256)": FunctionFragment;
    "setPause()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "updatePlatformFee(uint96)": FunctionFragment;
    "version()": FunctionFragment;
    "withdrawOffer(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptOffer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createOffer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "idToproposal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseOffer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "platformFeeBasisPoint",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proposalCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "royaltyInfo",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setPause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePlatformFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawOffer",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOffer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createOffer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "idToproposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseOffer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "platformFeeBasisPoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposalCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "royaltyInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setPause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatePlatformFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawOffer",
    data: BytesLike
  ): Result;

  events: {
    "ProposalAccepted(address,uint256,uint256,address,address,uint256)": EventFragment;
    "ProposalInitiated(address,uint256,uint256,string,address,uint256)": EventFragment;
    "ProposalUpdated(uint256,uint256,uint256)": EventFragment;
    "ProposalWithdrawn(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProposalAccepted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalInitiated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalWithdrawn"): EventFragment;
}

export type ProposalAcceptedEvent = TypedEvent<
  [string, BigNumber, BigNumber, string, string, BigNumber],
  {
    contractAddress: string;
    tokenId: BigNumber;
    offerId: BigNumber;
    seller: string;
    buyer: string;
    finalAmount: BigNumber;
  }
>;

export type ProposalAcceptedEventFilter =
  TypedEventFilter<ProposalAcceptedEvent>;

export type ProposalInitiatedEvent = TypedEvent<
  [string, BigNumber, BigNumber, string, string, BigNumber],
  {
    nftContractAddress: string;
    tokenId: BigNumber;
    offerId: BigNumber;
    metadataURI: string;
    buyer: string;
    proposedAmmount: BigNumber;
  }
>;

export type ProposalInitiatedEventFilter =
  TypedEventFilter<ProposalInitiatedEvent>;

export type ProposalUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { offerId: BigNumber; previousAmount: BigNumber; updatedAmount: BigNumber }
>;

export type ProposalUpdatedEventFilter = TypedEventFilter<ProposalUpdatedEvent>;

export type ProposalWithdrawnEvent = TypedEvent<
  [BigNumber],
  { offerId: BigNumber }
>;

export type ProposalWithdrawnEventFilter =
  TypedEventFilter<ProposalWithdrawnEvent>;

export interface MyriadFlowOfferStation extends BaseContract {
  contractName: "MyriadFlowOfferStation";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MyriadFlowOfferStationInterface;

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
    acceptOffer(
      _offerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createOffer(
      _nftContractAddress: string,
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    idToproposal(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, number] & {
        nftContractAddress: string;
        tokenId: BigNumber;
        buyer: string;
        proposedBid: BigNumber;
        status: number;
      }
    >;

    increaseOffer(
      offerId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    platformFeeBasisPoint(overrides?: CallOverrides): Promise<[BigNumber]>;

    proposalCounter(overrides?: CallOverrides): Promise<[BigNumber]>;

    royaltyInfo(
      tokenId: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>;

    setPause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    updatePlatformFee(
      _platformFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[number]>;

    withdrawOffer(
      offerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOffer(
    _offerId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createOffer(
    _nftContractAddress: string,
    _tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  idToproposal(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, BigNumber, number] & {
      nftContractAddress: string;
      tokenId: BigNumber;
      buyer: string;
      proposedBid: BigNumber;
      status: number;
    }
  >;

  increaseOffer(
    offerId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  platformFeeBasisPoint(overrides?: CallOverrides): Promise<BigNumber>;

  proposalCounter(overrides?: CallOverrides): Promise<BigNumber>;

  royaltyInfo(
    tokenId: BigNumberish,
    salePrice: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber]>;

  setPause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  updatePlatformFee(
    _platformFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<number>;

  withdrawOffer(
    offerId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOffer(
      _offerId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createOffer(
      _nftContractAddress: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    idToproposal(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, number] & {
        nftContractAddress: string;
        tokenId: BigNumber;
        buyer: string;
        proposedBid: BigNumber;
        status: number;
      }
    >;

    increaseOffer(
      offerId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    platformFeeBasisPoint(overrides?: CallOverrides): Promise<BigNumber>;

    proposalCounter(overrides?: CallOverrides): Promise<BigNumber>;

    royaltyInfo(
      tokenId: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>;

    setPause(overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updatePlatformFee(
      _platformFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<number>;

    withdrawOffer(
      offerId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "ProposalAccepted(address,uint256,uint256,address,address,uint256)"(
      contractAddress?: string | null,
      tokenId?: BigNumberish | null,
      offerId?: BigNumberish | null,
      seller?: null,
      buyer?: null,
      finalAmount?: null
    ): ProposalAcceptedEventFilter;
    ProposalAccepted(
      contractAddress?: string | null,
      tokenId?: BigNumberish | null,
      offerId?: BigNumberish | null,
      seller?: null,
      buyer?: null,
      finalAmount?: null
    ): ProposalAcceptedEventFilter;

    "ProposalInitiated(address,uint256,uint256,string,address,uint256)"(
      nftContractAddress?: string | null,
      tokenId?: BigNumberish | null,
      offerId?: null,
      metadataURI?: null,
      buyer?: null,
      proposedAmmount?: BigNumberish | null
    ): ProposalInitiatedEventFilter;
    ProposalInitiated(
      nftContractAddress?: string | null,
      tokenId?: BigNumberish | null,
      offerId?: null,
      metadataURI?: null,
      buyer?: null,
      proposedAmmount?: BigNumberish | null
    ): ProposalInitiatedEventFilter;

    "ProposalUpdated(uint256,uint256,uint256)"(
      offerId?: BigNumberish | null,
      previousAmount?: BigNumberish | null,
      updatedAmount?: BigNumberish | null
    ): ProposalUpdatedEventFilter;
    ProposalUpdated(
      offerId?: BigNumberish | null,
      previousAmount?: BigNumberish | null,
      updatedAmount?: BigNumberish | null
    ): ProposalUpdatedEventFilter;

    "ProposalWithdrawn(uint256)"(
      offerId?: BigNumberish | null
    ): ProposalWithdrawnEventFilter;
    ProposalWithdrawn(
      offerId?: BigNumberish | null
    ): ProposalWithdrawnEventFilter;
  };

  estimateGas: {
    acceptOffer(
      _offerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createOffer(
      _nftContractAddress: string,
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    idToproposal(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseOffer(
      offerId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    platformFeeBasisPoint(overrides?: CallOverrides): Promise<BigNumber>;

    proposalCounter(overrides?: CallOverrides): Promise<BigNumber>;

    royaltyInfo(
      tokenId: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setPause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updatePlatformFee(
      _platformFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawOffer(
      offerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOffer(
      _offerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createOffer(
      _nftContractAddress: string,
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    idToproposal(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increaseOffer(
      offerId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    platformFeeBasisPoint(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proposalCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    royaltyInfo(
      tokenId: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setPause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updatePlatformFee(
      _platformFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawOffer(
      offerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
