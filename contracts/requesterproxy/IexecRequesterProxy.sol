pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

import "iexec-doracle-base/contracts/IexecInterface.sol";
import "iexec-solidity/contracts/ERC20_Token/ERC20.sol";

contract IexecRequesterProxy is IexecInterface, ERC20
{
	IERC20 public baseToken;

	using IexecODBLibOrders for bytes32;
	using IexecODBLibOrders for IexecODBLibOrders.RequestOrder;

	struct OrderDetail
	{
		uint256 maxprice;
		address requester;
	}
	mapping(bytes32 => OrderDetail) m_orderDetails;
	mapping(bytes32 =>        bool) m_dealUnlocked;

	// Use _iexecHubAddr to force use of custom iexechub, leave 0x0 for autodetect
	constructor(address _iexecHubAddr)
	public IexecInterface(_iexecHubAddr)
	{
		baseToken = iexecClerk.token();
	}

	function deposit(uint256 _amount)
		external returns (bool)
	{
		require(baseToken.transferFrom(msg.sender, address(this), _amount));
		require(baseToken.approve(address(iexecClerk), _amount));
		require(iexecClerk.deposit(_amount));

		_mint(msg.sender, _amount);
		return true;
	}

	function depositFor(uint256 _amount, address _target)
		public returns (bool)
	{
		require(_target != address(0));

		require(baseToken.transferFrom(msg.sender, address(this), _amount));
		require(baseToken.approve(address(iexecClerk), _amount));
		require(iexecClerk.deposit(_amount));

		_mint(_target, _amount);
		return true;
	}

	function submit(IexecODBLibOrders.RequestOrder memory order)
		public
	{
		// compute order price and total necessary lock.
		uint256 maxprice = order.appmaxprice
			.add(order.datasetmaxprice)
			.add(order.workerpoolmaxprice);
		uint256 lock = maxprice.mul(order.volume);

		// lock price from requester
		_transfer(msg.sender, address(this), lock);

		// record details for refund of unspent tokens
		bytes32 requestorderHash = order.hash().toEthTypedStructHash(iexecClerk.EIP712DOMAIN_SEPARATOR());

		OrderDetail storage od = m_orderDetails[requestorderHash];
		require(od.requester == address(0));
		od.maxprice  = maxprice;
		od.requester = msg.sender;

		// set requester
		order.requester = address(this);

		// sign and broadcast
		iexecClerk.signRequestOrder(order);
		iexecClerk.broadcastRequestOrder(order);
	}

	function cancel(IexecODBLibOrders.RequestOrder memory order)
		public
	{
		bytes32 requestorderHash = order.hash().toEthTypedStructHash(iexecClerk.EIP712DOMAIN_SEPARATOR());
		OrderDetail storage od = m_orderDetails[requestorderHash];

		require(msg.sender == od.requester);

		uint256 consumed = iexecClerk.viewConsumed(requestorderHash);
		uint256 refund   = od.maxprice.mul(order.volume.sub(consumed));

		_transfer(address(this), od.requester, refund);
		iexecClerk.cancelRequestOrder(order);
	}

	function unlockUnspent(bytes32 requestorderhash, uint256 firstTask)
		public
	{
		bytes32 dealid = keccak256(abi.encodePacked(requestorderhash, firstTask));

		// only refund the difference once per deal
		require(!m_dealUnlocked[dealid]);
		m_dealUnlocked[dealid] = true;

		IexecODBLibCore.Deal memory  deal = iexecClerk.viewDeal(dealid);
		OrderDetail          storage od   = m_orderDetails[requestorderhash];

		uint256 actualprice = deal.app.price
			.add(deal.dataset.price)
			.add(deal.workerpool.price);

		uint256 delta = actualprice
			.sub(od.maxprice);

		_transfer(address(this), od.requester, delta.mul(deal.botSize));
		_burn    (address(this), actualprice.mul(deal.botSize));
	}

}
