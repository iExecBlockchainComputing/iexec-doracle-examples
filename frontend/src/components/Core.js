import React      from 'react';
import Container  from 'react-bootstrap/Container';
import Col        from 'react-bootstrap/Col'
import Row        from 'react-bootstrap/Row'

import UpdateCard from './UpdateCard';
import PriceFeed  from './PriceFeed';

const Core = (props) =>
	<Container>
		<UpdateCard config={props.config}/>
		<Row>
			<Col sm={12} md={6}>
				<h3>Trusted oracle - latest values</h3>
				<PriceFeed uri='https://api.thegraph.com/subgraphs/name/amxx/price-feed-doracle' config={props.config}/>
			</Col>
			<Col sm={12} md={6}>
				<h3>Basic oracle - latest values</h3>
				<PriceFeed uri='https://api.thegraph.com/subgraphs/name/amxx/price-feed-doracle' config={props.config}/>
			</Col>
		</Row>
	</Container>


export default Core;
