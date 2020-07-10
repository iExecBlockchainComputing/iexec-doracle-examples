pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@iexec/solidity/contracts/ERC1154/IERC1154.sol";
import "@iexec/solidity/contracts/ERC2362/IERC2362.sol";
import "@iexec/doracle/contracts/IexecDoracle.sol";


contract PriceOracle is IexecDoracle, Ownable, IOracleConsumer, IERC2362
{
	// Data storage
	struct TimedValue
	{
		bytes32 oracleCallID;
		uint256 date;
		int256  value;
		string  details;
	}

	mapping(bytes32 => TimedValue) public values;

	// Event
	event ValueUpdated(bytes32 indexed id, bytes32 indexed oracleCallID, uint256 date, int256 value);

	// Use _iexecHubAddr to force use of custom iexechub, leave 0x0 for autodetect
	constructor(address _iexecHubAddr)
	public IexecDoracle(_iexecHubAddr)
	{}

	function updateEnv(
	  address _authorizedApp
	, address _authorizedDataset
	, address _authorizedWorkerpool
	, bytes32 _requiredtag
	, uint256 _requiredtrust
	)
	public onlyOwner
	{
		_iexecDoracleUpdateSettings(_authorizedApp, _authorizedDataset, _authorizedWorkerpool, _requiredtag, _requiredtrust);
	}

	// ERC1154 - Callback processing
	function receiveResult(bytes32 _callID, bytes calldata)
	external override
	{
		// Parse results
		(uint256 date, string memory details, int256 value) = abi.decode(_iexecDoracleGetVerifiedResult(_callID), (uint256, string, int256));

		// Process results
		bytes32 id = keccak256(bytes(details));
		require(values[id].date < date, "new-value-is-too-old");
		values[id].oracleCallID = _callID;
		values[id].date         = date;
		values[id].value        = value;
		values[id].details      = details;

		emit ValueUpdated(id, _callID, date, value);
	}

	// ERC2362 - ADO result viewer
	function valueFor(bytes32 _id)
	external override view returns (int256, uint256, uint256)
	{
		if (values[_id].oracleCallID == bytes32(0))
		{
			return (0, 0, 404);
		}
		else
		{
			return (values[_id].value, values[_id].date, 200);
		}
	}
}
