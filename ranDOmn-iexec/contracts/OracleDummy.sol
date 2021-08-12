// SPDX-License-Identifier: Apache-2.0

/******************************************************************************
 * Copyright 2021 IEXEC BLOCKCHAIN TECH                                       *
 *                                                                            *
 * Licensed under the Apache License, Version 2.0 (the "License");            *
 * you may not use this file except in compliance with the License.           *
 * You may obtain a copy of the License at                                    *
 *                                                                            *
 *     http://www.apache.org/licenses/LICENSE-2.0                             *
 *                                                                            *
 * Unless required by applicable law or agreed to in writing, software        *
 * distributed under the License is distributed on an "AS IS" BASIS,          *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   *
 * See the License for the specific language governing permissions and        *
 * limitations under the License.                                             *
 ******************************************************************************/

// The following code is a dummy contract, it is to be used only for validation and testing purposes

pragma solidity ^0.8.3;
pragma experimental ABIEncoderV2;

contract OracleDummy {

    mapping (bytes32 => bytes) oracleValue;

    function receiveResult(bytes32 id, bytes memory _calldata)
    public
    {
        oracleValue[id] = _calldata;
    }

    function getRaw(bytes32 _oracleId)
    public view
    returns(bytes memory bytesValue)
    {
        return oracleValue[_oracleId];
    }

}
