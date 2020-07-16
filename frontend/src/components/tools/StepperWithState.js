import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Stepper   from '@material-ui/core/Stepper';
import Step      from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const StepperWithState = (props) =>
{
	const [ state, setState ] = React.useState({});
	const update = (obj) =>  setState({ ...state, ...obj });
	return (
		<>
			{
				props.stepper &&
				<Stepper activeStep={Object.keys(props.steps).indexOf(props.routing.match.params.step)} className='w-100'>
				{
					Object.entries(props.steps).map(([ key, value ], i) =><Step key={i}><StepLabel>{value.descr || key}</StepLabel></Step>)
				}
				</Stepper>
			}
			<Route exact path='/update'><Redirect to={`${props.base}/${Object.keys(props.steps).find(Boolean)}`}/></Route>
			{
				Object.entries(props.steps).map(([ key, value ], i, array) =>
					<Route
						key    = {i}
						path   = {`${props.base}/${key}`}
						render = {(routing) =>
							<value.component
								state   = {state}
								update  = {update}
								forward = {() => array[i+1] && routing.history.push(`${props.base}/${array[i+1][0]}`)}
								routing = {routing}
								{...props}
							/>
						}
					/>
				)
			}
		</>
	);
}

export default StepperWithState;
