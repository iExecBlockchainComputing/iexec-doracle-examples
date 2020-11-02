import React                from 'react';
import { Redirect }         from 'react-router-dom';
import Container            from '@material-ui/core/Container';
import StepperWithState     from '../tools/StepperWithState';
import endpoints            from '.';

const Update = (props) =>
	<Container>
		<StepperWithState
			steps = {{
				'/update/oracle':
				{
					component: endpoints.Update_SelectOracle,
					descr:     'Select the oracle',
					next:      '/update/app?'+['oracle'].map(k => `${k}=:${k}`).join('&'),
				},
				'/update/app':
				{
					component: endpoints.Update_SelectApp,
					descr:     'Select the app',
					next:      '/update/configure?'+['oracle', 'app'].map(k => `${k}=:${k}`).join('&'),
				},
				'/update/configure':
				{
					component: endpoints.Update_ConfigureForm,
					descr:     'Configure the update',
					next:      '/update/summary?'+['oracle', 'app', 'base', 'quote', 'precision', 'endpoint'].map(k => `${k}=:${k}`).join('&'),
				},
				'/update/summary':
				{
					component: endpoints.Update_Summary,
					descr:     'Summary',
					next:      '/update/done?'+['oracle', 'app', 'base', 'quote', 'precision', 'endpoint'].map(k => `${k}=:${k}`).join('&'),
				},
				'/update/done':
				{
					component: () => <Redirect to='/'/>,
					descr:     'Done',
				},
			}}
			stepper
			{...props}
		/>
	</Container>

export default Update;
