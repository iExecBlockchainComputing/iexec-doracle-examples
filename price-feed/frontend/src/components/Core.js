import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import endpoints from './endpoints';

const Core = (props) =>
	<Router>
		<Route exact path='/'><Redirect to='/dashboard'/></Route>
		<Route path='/dashboard'     render={ (routing) => <endpoints.Dashboard routing={routing} {...props}/> }/>
		<Route path='/update/:args?' render={ (routing) => <endpoints.Update    routing={routing} {...props}/> }/>
	</Router>


export default Core;
