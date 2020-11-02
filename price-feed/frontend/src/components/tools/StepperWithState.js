import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Stepper   from '@material-ui/core/Stepper';
import Step      from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const StepperWithState = (props) =>
	<>
		{
			props.stepper &&
			<Stepper activeStep={Object.keys(props.steps).indexOf(props.routing.match.url)} className='w-100'>
			{
				Object.entries(props.steps).map(([ key, value ], i) =><Step key={i}><StepLabel>{value.descr || key}</StepLabel></Step>)
			}
			</Stepper>
		}
		<Route exact path={props.base}><Redirect to={Object.keys(props.steps).find(Boolean)}/></Route>
		{
			Object.entries(props.steps).map(([ key, value ], i, array) =>
				<Route
					key = {i}
					path = {key}
					render = {(routing) =>
						<value.component
							routing = {routing}
							update = {(state) => routing.history.push(Object.entries(state).reduce((acc, [key, value]) => acc.replace(`:${key}`, value), value.next || ''))}
							{...props}
						/>
					}
				/>
			)
		}
	</>

export default StepperWithState;
