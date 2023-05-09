/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface VaultInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "ROLE_CONTROLLER()": FunctionFragment;
    "ROLE_GOVERNANCE()": FunctionFragment;
    "ROLE_GOVERNOR()": FunctionFragment;
    "allAssets(uint256)": FunctionFragment;
    "assets(address)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "countAssets()": FunctionFragment;
    "deposit(address,uint256)": FunctionFragment;
    "depositFrom(address,address,uint256)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getRoleMember(bytes32,uint256)": FunctionFragment;
    "getRoleMemberCount(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasAsset(address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "recoverAsset(address,address)": FunctionFragment;
    "registerAsset(address)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeAsset(address,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "withdraw(address,uint256)": FunctionFragment;
    "withdrawTo(address,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_ADMIN_ROLE"
      | "ROLE_CONTROLLER"
      | "ROLE_GOVERNANCE"
      | "ROLE_GOVERNOR"
      | "allAssets"
      | "assets"
      | "balanceOf"
      | "countAssets"
      | "deposit"
      | "depositFrom"
      | "getRoleAdmin"
      | "getRoleMember"
      | "getRoleMemberCount"
      | "grantRole"
      | "hasAsset"
      | "hasRole"
      | "initialize"
      | "recoverAsset"
      | "registerAsset"
      | "renounceRole"
      | "revokeAsset"
      | "revokeRole"
      | "supportsInterface"
      | "withdraw"
      | "withdrawTo"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ROLE_CONTROLLER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ROLE_GOVERNANCE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ROLE_GOVERNOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allAssets",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "assets",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "countAssets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "depositFrom",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMember",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMemberCount",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasAsset",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverAsset",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerAsset",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeAsset",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawTo",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ROLE_CONTROLLER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ROLE_GOVERNANCE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ROLE_GOVERNOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allAssets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "assets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "countAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMemberCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasAsset", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "recoverAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawTo", data: BytesLike): Result;

  events: {
    "DepositAsset(address,uint256,address)": EventFragment;
    "DepositAssetFailed(address,uint256,address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "RecoveredAsset(address,uint256,address)": EventFragment;
    "RecoveredAssetFailed(address,uint256,address)": EventFragment;
    "RegisterAssetToVault(address)": EventFragment;
    "RevokeAssetFromVault(address)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "WithdrawAsset(address,uint256,address)": EventFragment;
    "WithdrawAssetFailed(address,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DepositAsset"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DepositAssetFailed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RecoveredAsset"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RecoveredAssetFailed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RegisterAssetToVault"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevokeAssetFromVault"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawAsset"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawAssetFailed"): EventFragment;
}

export interface DepositAssetEventObject {
  assetAddress: string;
  assetAmount: BigNumber;
  depositer: string;
}
export type DepositAssetEvent = TypedEvent<
  [string, BigNumber, string],
  DepositAssetEventObject
>;

export type DepositAssetEventFilter = TypedEventFilter<DepositAssetEvent>;

export interface DepositAssetFailedEventObject {
  assetAddress: string;
  assetAmount: BigNumber;
  depositer: string;
}
export type DepositAssetFailedEvent = TypedEvent<
  [string, BigNumber, string],
  DepositAssetFailedEventObject
>;

export type DepositAssetFailedEventFilter =
  TypedEventFilter<DepositAssetFailedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RecoveredAssetEventObject {
  assetAddress: string;
  assetAmount: BigNumber;
  receiver: string;
}
export type RecoveredAssetEvent = TypedEvent<
  [string, BigNumber, string],
  RecoveredAssetEventObject
>;

export type RecoveredAssetEventFilter = TypedEventFilter<RecoveredAssetEvent>;

export interface RecoveredAssetFailedEventObject {
  assetAddress: string;
  assetAmount: BigNumber;
  receiver: string;
}
export type RecoveredAssetFailedEvent = TypedEvent<
  [string, BigNumber, string],
  RecoveredAssetFailedEventObject
>;

export type RecoveredAssetFailedEventFilter =
  TypedEventFilter<RecoveredAssetFailedEvent>;

export interface RegisterAssetToVaultEventObject {
  assetAddress: string;
}
export type RegisterAssetToVaultEvent = TypedEvent<
  [string],
  RegisterAssetToVaultEventObject
>;

export type RegisterAssetToVaultEventFilter =
  TypedEventFilter<RegisterAssetToVaultEvent>;

export interface RevokeAssetFromVaultEventObject {
  assetAddress: string;
}
export type RevokeAssetFromVaultEvent = TypedEvent<
  [string],
  RevokeAssetFromVaultEventObject
>;

export type RevokeAssetFromVaultEventFilter =
  TypedEventFilter<RevokeAssetFromVaultEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface WithdrawAssetEventObject {
  assetAddress: string;
  assetAmount: BigNumber;
  withdrawer: string;
}
export type WithdrawAssetEvent = TypedEvent<
  [string, BigNumber, string],
  WithdrawAssetEventObject
>;

export type WithdrawAssetEventFilter = TypedEventFilter<WithdrawAssetEvent>;

export interface WithdrawAssetFailedEventObject {
  assetAddress: string;
  assetAmount: BigNumber;
  withdrawer: string;
}
export type WithdrawAssetFailedEvent = TypedEvent<
  [string, BigNumber, string],
  WithdrawAssetFailedEventObject
>;

export type WithdrawAssetFailedEventFilter =
  TypedEventFilter<WithdrawAssetFailedEvent>;

export interface Vault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VaultInterface;

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
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    ROLE_CONTROLLER(overrides?: CallOverrides): Promise<[string]>;

    ROLE_GOVERNANCE(overrides?: CallOverrides): Promise<[string]>;

    ROLE_GOVERNOR(overrides?: CallOverrides): Promise<[string]>;

    allAssets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    assets(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    balanceOf(
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    countAssets(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { assetCount: BigNumber }>;

    deposit(
      asset: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositFrom(
      asset: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRoleMember(
      role: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRoleMemberCount(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hasAsset(
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean] & { has: boolean }>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      _controller: PromiseOrValue<string>,
      _governance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    recoverAsset(
      asset: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerAsset(
      asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeAsset(
      asset: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    withdraw(
      asset: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawTo(
      asset: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  ROLE_CONTROLLER(overrides?: CallOverrides): Promise<string>;

  ROLE_GOVERNANCE(overrides?: CallOverrides): Promise<string>;

  ROLE_GOVERNOR(overrides?: CallOverrides): Promise<string>;

  allAssets(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  assets(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  balanceOf(
    asset: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  countAssets(overrides?: CallOverrides): Promise<BigNumber>;

  deposit(
    asset: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositFrom(
    asset: PromiseOrValue<string>,
    from: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getRoleAdmin(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getRoleMember(
    role: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getRoleMemberCount(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  grantRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hasAsset(
    asset: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  hasRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    _controller: PromiseOrValue<string>,
    _governance: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  recoverAsset(
    asset: PromiseOrValue<string>,
    receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerAsset(
    asset: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeAsset(
    asset: PromiseOrValue<string>,
    receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  withdraw(
    asset: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawTo(
    asset: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    ROLE_CONTROLLER(overrides?: CallOverrides): Promise<string>;

    ROLE_GOVERNANCE(overrides?: CallOverrides): Promise<string>;

    ROLE_GOVERNOR(overrides?: CallOverrides): Promise<string>;

    allAssets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    assets(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    countAssets(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      asset: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositFrom(
      asset: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getRoleMember(
      role: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getRoleMemberCount(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    hasAsset(
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      _controller: PromiseOrValue<string>,
      _governance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    recoverAsset(
      asset: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    registerAsset(
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeAsset(
      asset: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdraw(
      asset: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdrawTo(
      asset: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "DepositAsset(address,uint256,address)"(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      depositer?: PromiseOrValue<string> | null
    ): DepositAssetEventFilter;
    DepositAsset(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      depositer?: PromiseOrValue<string> | null
    ): DepositAssetEventFilter;

    "DepositAssetFailed(address,uint256,address)"(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      depositer?: PromiseOrValue<string> | null
    ): DepositAssetFailedEventFilter;
    DepositAssetFailed(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      depositer?: PromiseOrValue<string> | null
    ): DepositAssetFailedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "RecoveredAsset(address,uint256,address)"(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      receiver?: PromiseOrValue<string> | null
    ): RecoveredAssetEventFilter;
    RecoveredAsset(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      receiver?: PromiseOrValue<string> | null
    ): RecoveredAssetEventFilter;

    "RecoveredAssetFailed(address,uint256,address)"(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      receiver?: PromiseOrValue<string> | null
    ): RecoveredAssetFailedEventFilter;
    RecoveredAssetFailed(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      receiver?: PromiseOrValue<string> | null
    ): RecoveredAssetFailedEventFilter;

    "RegisterAssetToVault(address)"(
      assetAddress?: PromiseOrValue<string> | null
    ): RegisterAssetToVaultEventFilter;
    RegisterAssetToVault(
      assetAddress?: PromiseOrValue<string> | null
    ): RegisterAssetToVaultEventFilter;

    "RevokeAssetFromVault(address)"(
      assetAddress?: PromiseOrValue<string> | null
    ): RevokeAssetFromVaultEventFilter;
    RevokeAssetFromVault(
      assetAddress?: PromiseOrValue<string> | null
    ): RevokeAssetFromVaultEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;

    "WithdrawAsset(address,uint256,address)"(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      withdrawer?: PromiseOrValue<string> | null
    ): WithdrawAssetEventFilter;
    WithdrawAsset(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      withdrawer?: PromiseOrValue<string> | null
    ): WithdrawAssetEventFilter;

    "WithdrawAssetFailed(address,uint256,address)"(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      withdrawer?: PromiseOrValue<string> | null
    ): WithdrawAssetFailedEventFilter;
    WithdrawAssetFailed(
      assetAddress?: PromiseOrValue<string> | null,
      assetAmount?: null,
      withdrawer?: PromiseOrValue<string> | null
    ): WithdrawAssetFailedEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    ROLE_CONTROLLER(overrides?: CallOverrides): Promise<BigNumber>;

    ROLE_GOVERNANCE(overrides?: CallOverrides): Promise<BigNumber>;

    ROLE_GOVERNOR(overrides?: CallOverrides): Promise<BigNumber>;

    allAssets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    assets(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOf(
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    countAssets(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      asset: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositFrom(
      asset: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMember(
      role: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMemberCount(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hasAsset(
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _controller: PromiseOrValue<string>,
      _governance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    recoverAsset(
      asset: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerAsset(
      asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeAsset(
      asset: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      asset: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawTo(
      asset: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ROLE_CONTROLLER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ROLE_GOVERNANCE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ROLE_GOVERNOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allAssets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    assets(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOf(
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    countAssets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      asset: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositFrom(
      asset: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMember(
      role: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMemberCount(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hasAsset(
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _controller: PromiseOrValue<string>,
      _governance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    recoverAsset(
      asset: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerAsset(
      asset: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeAsset(
      asset: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      asset: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawTo(
      asset: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
