import React    from 'react';
import Table    from 'react-bootstrap/Table'
import Provider from '../../tools/Provider';
import Query    from '../../tools/Query';
import graphql  from '../../graphql';

const formatDate = (timestamp) => new Date(parseInt(timestamp)).toLocaleString('fr-Fr')

const PairList = (props) =>
	<Table responsive size='sm'>
		<thead>
			<tr>
				<th>Timestamp</th>
				<th>Exchange rate</th>
			</tr>
		</thead>
		<tbody>
			{
				props.data.pairs.map((pair, i) =>
					<tr key={i}>
						<td>{formatDate(pair.latest.timestamp)}</td>
						<td>1 {pair.asset_base.id} = {pair.latest.value} {pair.asset_quote.id}</td>
					</tr>
				)
			}
		</tbody>
	</Table>

const PriceFeed = (props) =>
	<Provider uri={ props.uri }>
		<Query query={ graphql.overview }>
			<PairList/>
		</Query>
	</Provider>

export default PriceFeed;
