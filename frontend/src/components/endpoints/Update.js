import React                from 'react';
import { Redirect }         from 'react-router-dom';
import Container            from '@material-ui/core/Container';
import StepperWithState     from '../tools/StepperWithState';
import endpoints            from '.';

const Update = (props) =>
	<Container>
		<StepperWithState
			steps = {{
				'oracle':  { component: endpoints.Update_SelectOracle,  descr: 'Select the oracle'    },
				'app':     { component: endpoints.Update_SelectApp,     descr: 'Select the app'       },
				'params':  { component: endpoints.Update_ConfigureForm, descr: 'Configure the update' },
				'summary': { component: endpoints.Update_Summary,       descr: 'Summary'              },
				'done':    { component: () => <Redirect to='/'/>,       descr: 'Done'                 },
			}}
			base = '/update'
			stepper
			{...props}
		/>
	</Container>

export default Update;
