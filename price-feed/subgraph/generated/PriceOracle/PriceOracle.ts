// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ValueUpdated extends ethereum.Event {
  get params(): ValueUpdated__Params {
    return new ValueUpdated__Params(this);
  }
}

export class ValueUpdated__Params {
  _event: ValueUpdated;

  constructor(event: ValueUpdated) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get oracleCallID(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get date(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get value(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class PriceOracle__valuesResult {
  value0: Bytes;
  value1: BigInt;
  value2: BigInt;
  value3: string;

  constructor(value0: Bytes, value1: BigInt, value2: BigInt, value3: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytes(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromSignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromString(this.value3));
    return map;
  }
}

export class PriceOracle__valueForResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromSignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class PriceOracle extends ethereum.SmartContract {
  static bind(address: Address): PriceOracle {
    return new PriceOracle("PriceOracle", address);
  }

  iexecproxy(): Address {
    let result = super.call("iexecproxy", "iexecproxy():(address)", []);

    return result[0].toAddress();
  }

  try_iexecproxy(): ethereum.CallResult<Address> {
    let result = super.tryCall("iexecproxy", "iexecproxy():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  m_authorizedApp(): Address {
    let result = super.call(
      "m_authorizedApp",
      "m_authorizedApp():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_m_authorizedApp(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "m_authorizedApp",
      "m_authorizedApp():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  m_authorizedDataset(): Address {
    let result = super.call(
      "m_authorizedDataset",
      "m_authorizedDataset():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_m_authorizedDataset(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "m_authorizedDataset",
      "m_authorizedDataset():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  m_authorizedWorkerpool(): Address {
    let result = super.call(
      "m_authorizedWorkerpool",
      "m_authorizedWorkerpool():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_m_authorizedWorkerpool(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "m_authorizedWorkerpool",
      "m_authorizedWorkerpool():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  m_requiredtag(): Bytes {
    let result = super.call("m_requiredtag", "m_requiredtag():(bytes32)", []);

    return result[0].toBytes();
  }

  try_m_requiredtag(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "m_requiredtag",
      "m_requiredtag():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  m_requiredtrust(): BigInt {
    let result = super.call(
      "m_requiredtrust",
      "m_requiredtrust():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_m_requiredtrust(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "m_requiredtrust",
      "m_requiredtrust():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  values(param0: Bytes): PriceOracle__valuesResult {
    let result = super.call(
      "values",
      "values(bytes32):(bytes32,uint256,int256,string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return new PriceOracle__valuesResult(
      result[0].toBytes(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toString()
    );
  }

  try_values(param0: Bytes): ethereum.CallResult<PriceOracle__valuesResult> {
    let result = super.tryCall(
      "values",
      "values(bytes32):(bytes32,uint256,int256,string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PriceOracle__valuesResult(
        value[0].toBytes(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toString()
      )
    );
  }

  valueFor(_id: Bytes): PriceOracle__valueForResult {
    let result = super.call(
      "valueFor",
      "valueFor(bytes32):(int256,uint256,uint256)",
      [ethereum.Value.fromFixedBytes(_id)]
    );

    return new PriceOracle__valueForResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_valueFor(_id: Bytes): ethereum.CallResult<PriceOracle__valueForResult> {
    let result = super.tryCall(
      "valueFor",
      "valueFor(bytes32):(int256,uint256,uint256)",
      [ethereum.Value.fromFixedBytes(_id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PriceOracle__valueForResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _iexecHubAddr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateEnvCall extends ethereum.Call {
  get inputs(): UpdateEnvCall__Inputs {
    return new UpdateEnvCall__Inputs(this);
  }

  get outputs(): UpdateEnvCall__Outputs {
    return new UpdateEnvCall__Outputs(this);
  }
}

export class UpdateEnvCall__Inputs {
  _call: UpdateEnvCall;

  constructor(call: UpdateEnvCall) {
    this._call = call;
  }

  get _authorizedApp(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _authorizedDataset(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _authorizedWorkerpool(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _requiredtag(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get _requiredtrust(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class UpdateEnvCall__Outputs {
  _call: UpdateEnvCall;

  constructor(call: UpdateEnvCall) {
    this._call = call;
  }
}

export class ReceiveResultCall extends ethereum.Call {
  get inputs(): ReceiveResultCall__Inputs {
    return new ReceiveResultCall__Inputs(this);
  }

  get outputs(): ReceiveResultCall__Outputs {
    return new ReceiveResultCall__Outputs(this);
  }
}

export class ReceiveResultCall__Inputs {
  _call: ReceiveResultCall;

  constructor(call: ReceiveResultCall) {
    this._call = call;
  }

  get _callID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get value1(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class ReceiveResultCall__Outputs {
  _call: ReceiveResultCall;

  constructor(call: ReceiveResultCall) {
    this._call = call;
  }
}
