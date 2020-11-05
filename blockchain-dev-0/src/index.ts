import {
	ethereum,
} from '@graphprotocol/graph-ts'

import {
	IexecInterface,
} from '../generated/Oracle_0/IexecInterface'

import {
	BlockchainDev0Oracle,
	ValueReceived as ValueReceivedEvent,
} from '../generated/Oracle_0/BlockchainDev0Oracle'

import {
	Transaction,
	Oracle,
	Account,
	ValueReceived,
} from '../generated/schema'

export function createEventID(event: ethereum.Event): string
{
	return event.block.number.toString().concat('-').concat(event.logIndex.toString())
}

export function logTransaction(event: ethereum.Event): Transaction {
	let tx = new Transaction(event.transaction.hash.toHex());
	tx.timestamp   = event.block.timestamp;
	tx.blockNumber = event.block.number;
	tx.save();
	return tx as Transaction;
}

export function handleValueReceived(event: ValueReceivedEvent): void {
	let proxy = BlockchainDev0Oracle.bind(event.address).iexecproxy()
	let task  = IexecInterface.bind(proxy).viewTask(event.params.oracleCallID)
	let deal  = IexecInterface.bind(proxy).viewDeal(task.dealid)

	let oracle = new Oracle(event.address.toHex())
	oracle.save()

	let requester = new Account(deal.requester.toHex())
	requester.save()

	let ev          = new ValueReceived(createEventID(event))
	ev.transaction  = logTransaction(event).id
	ev.oracle       = oracle.id
	ev.requester    = requester.id
	ev.date         = event.params.date
	ev.value        = event.params.value
	ev.oracleCallID = event.params.oracleCallID
	ev.isValid      = event.params.isValid
	ev.save()
}
