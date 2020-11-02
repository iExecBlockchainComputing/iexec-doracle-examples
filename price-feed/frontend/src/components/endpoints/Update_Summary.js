import React                from 'react';
import queryString          from 'query-string';
import Grid                 from '@material-ui/core/Grid';
import Button               from '@material-ui/core/Button';
import ui                   from '../UI';
import secure_application   from '../../offchain-tee-kaiko-pricefeed/src/app.py.txt';
// import secure_dockerfile    from '../../offchain-tee-kaiko-pricefeed/tee/Dockerfile.txt';
// import secure_protectfs     from '../../offchain-tee-kaiko-pricefeed/tee/protect-fs.sh.txt';
import secure_smartcontract from '../../offchain-tee-kaiko-pricefeed/solidity/PriceOracle.sol.txt';

const Update_Summary = (props) =>
{

	const [state          ] = React.useState(queryString.parse(props.routing.location.search));
	const [order, setOrder] = React.useState(null);

	React.useEffect(() => {
		setOrder({
			__app:      state.app    === 'true' ? 'trusted app'                        : 'untrusted app',
			app:        state.app    === 'true' ? props.config.variants.trusted.app    : props.config.variants.basic.app,
			__callback: state.oracle === 'true' ? 'trusted oracle'                     : 'untrusted oracle',
			callback:   state.oracle === 'true' ? props.config.variants.trusted.oracle : props.config.variants.basic.oracle,
			params:
			{
				iexec_args: [ state.base, state.quote, state.precision, state.app !== 'true' && JSON.stringify(state.endpoint || 'missing endpoint') ].filter(Boolean).join(' '),
				...props.config.requestArgs,
			}
		})
	}, [ state, props ])

	const submit = () =>
	{
		console.log(submit);
		console.log(order);
		props.update(state);
	}

	return (
		<Grid container spacing={3} justify='center' alignItems='center' style={{ margin: 0, width: '100%' }}>
			<Grid item xs={12}>
				<h2 className='text-center'>Update request summary</h2>
			</Grid>
			<Grid item container spacing={6} justify='center' alignItems='stretch'>
				<Grid item xs={6}>
					<ui.SourceTabs tabs={{
						application:   { title: 'Application',    source: JSON.parse(state.app)    ? secure_application   : null },
						// dockerfile:    { title: 'Dockerfile',     source: JSON.parse(state.app)    ? secure_dockerfile    : null },
						// protect:       { title: 'Protect-fs',     source: JSON.parse(state.app)    ? secure_protectfs     : null },
						smartcontract: { title: 'Smart Contract', source: JSON.parse(state.oracle) ? secure_smartcontract : null },
					}} />
				</Grid>
				<Grid item container xs={6}>
					<ui.SourceView code={JSON.stringify(order, null, 2)}/>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Button
					onClick={submit}
					variant='contained'
					fullWidth
				>
					Submit request
				</Button>
			</Grid>
		</Grid>
	);
}

export default Update_Summary;
