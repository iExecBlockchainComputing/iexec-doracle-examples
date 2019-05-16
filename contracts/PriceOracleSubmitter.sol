pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;

import "./libs/Buffer.sol";
import "./PriceOracle.sol";

contract PriceOracleSubmitter is PriceOracle
{
	using Buffer for Buffer.buffer;

	// Use _iexecHubAddr to force use of custom iexechub, leave 0x0 for autodetect
	constructor(address _iexecHubAddr)
	public PriceOracle(_iexecHubAddr)
	{
	}

	function uint2str(uint256 _i)
	public pure returns (string memory)
	{
		if (_i == 0) { return "0"; }

		uint256 j = _i;
		uint256 len = 0;
		while (j != 0) { j /= 10; ++len; }

		bytes memory bstr = new bytes(len);
		while (_i != 0) { bstr[--len] = byte(uint8(48 + _i % 10)); _i /= 10; }

		return string(bstr);
	}

	function makeParams(
		string memory _asset1,
		string memory _asset2,
		uint256       _decimal,
		uint256       _timestamp)
	public view returns (string memory)
	{
		Buffer.buffer memory buf;
		buf.init(256);
		buf.append(bytes(_asset1));
		buf.append(" ");
		buf.append(bytes(_asset2));
		buf.append(" ");
		buf.append(bytes(uint2str(_decimal)));
		buf.append(" ");
		buf.append(bytes(uint2str(_timestamp)));
		return string(buf.buf);
	}

	function submit()
	public
	{
		IexecODBLibOrders.RequestOrder memory order;
		order.app                = m_authorizedApp;                  // address
		order.appmaxprice        = 0;                                // uint256 → TODO
		order.dataset            = m_authorizedDataset;              // address
		order.datasetmaxprice    = 0;                                // uint256 → TODO
		order.workerpool         = m_authorizedWorkerpool;           // address
		order.workerpoolmaxprice = 0;                                // uint256 → TODO
		order.requester          = address(this);                    // address
		order.volume             = 1;                                // uint256
		order.tag                = m_requiredtag;                    // bytes32
		order.category           = 0;                                // uint256 → TODO
		order.trust              = m_requiredtrust;                  // uint256
		order.beneficiary        = address(0);                       // address
		order.callback           = address(this);                    // address
		order.params             = makeParams("BTC", "USD", 9, now); // string
		order.salt               = bytes32(0);                       // bytes32 → OK ?

		m_iexecClerk.signRequestOrder(order);
		m_iexecClerk.broadcastRequestOrder(order);
	}

}
