pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "iexec-solidity/contracts/ERC20_Token/IERC20.sol";
import "iexec-solidity/contracts/Libs/SafeMath.sol";
import "./PriceOracle.sol";

contract TokenDistributor is Ownable
{
	using SafeMath for uint256;

	IERC20      public token;
	PriceOracle public oracle;
	string      public descr;
	uint256     public validity;

	constructor(address _token, address _oracle, string memory _descr)
	public
	{
		token    = IERC20(_token);
		oracle   = PriceOracle(_oracle);
		descr    = _descr;
		validity = 1 days;
	}

	function setValidity(uint256 _validity)
	external onlyOwner
	{
		validity = _validity;
	}

	function buyTokens()
	external payable
	{
		(,uint256 date,uint256 value,) = oracle.values(keccak256(bytes(descr)));
		require(date.add(validity) > now, "value-too-old");

		// cast from address to address payable is messed up
		address(uint160(owner())).transfer(msg.value);

		require(token.transferFrom(
			owner(),
			msg.sender,
			value.mul(msg.value).div(10**18).mulByFraction(990000, 1000000)
		));
	}
}
