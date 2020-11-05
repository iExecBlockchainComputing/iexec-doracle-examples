#!/bin/bash

# Copyright 2020 IEXEC BLOCKCHAIN TECH
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.



# graph create iexecblockchaincomputing/iexec-blockchain-dev0 --node http://thegraph.iex.ec:8020
# graph deploy iexecblockchaincomputing/iexec-blockchain-dev0 --node http://thegraph.iex.ec:8020      --ipfs http://thegraph.iex.ec:5001    subgraph.yaml;
graph deploy iexecblockchaincomputing/iexec-blockchain-dev0 --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ subgraph.yaml;
