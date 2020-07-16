import React      from 'react';
import { Link }   from 'react-router-dom';
import Container  from 'react-bootstrap/Container';
import Row        from 'react-bootstrap/Row';
import Col        from 'react-bootstrap/Col';
import PriceFeed  from '../UI/PriceFeed';

const Dashboard = (props) =>
	<Container>
		<Link to="/update">Update</Link>
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

export default Dashboard;
