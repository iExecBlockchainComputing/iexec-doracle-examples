import React                from 'react';
import Grid                 from '@material-ui/core/Grid';
import Button               from '@material-ui/core/Button';
import ui                   from '../UI';
import secure_application   from '../../offchain-tee-kaiko-pricefeed/src/app.py.txt';
import secure_dockerfile    from '../../offchain-tee-kaiko-pricefeed/tee/Dockerfile.txt';
import secure_protectfs     from '../../offchain-tee-kaiko-pricefeed/tee/protect-fs.sh.txt';
import secure_smartcontract from '../../offchain-tee-kaiko-pricefeed/solidity/PriceOracle.sol.txt';

const Update_Summary = (props) =>
{
	const [ order, setOrder ] = React.useState(null);

	React.useEffect(() => {
		setOrder({
			__app:      props.state.app    ? 'trusted app'                        : 'untrusted app',
			app:        props.state.app    ? props.config.variants.trusted.app    : props.config.variants.basic.app,
			__callback: props.state.oracle ? 'trusted oracle'                     : 'untrusted oracle',
			callback:   props.state.oracle ? props.config.variants.trusted.oracle : props.config.variants.basic.oracle,
			params:
			{
				iexec_args: [ props.state.base, props.state.quote, props.state.precision, !props.state.app && JSON.stringify(props.state.endpoint || 'missing endpoint') ].filter(Boolean).join(' '),
				...props.config.requestArgs,
			}
		})
	}, [ props ])

	const submit = () =>
	{
		console.log(submit);
		console.log(order);
		props.forward();
	}

	return (
		<Grid container spacing={6} justify='center' alignItems='center' style={{ margin: 0, width: '100%' }}>
			<Grid item xs={12}>
				<h2 className='text-center'>Update request summary</h2>
			</Grid>
			<Grid item container spacing={6} justify='center' alignItems='stretch'>
				<Grid item xs={6}>
					<ui.SourceTabs tabs={{
						application:   { title: 'Application',    source: props.state.app ? secure_application   : null },
						dockerfile:    { title: 'Dockerfile',     source: props.state.app ? secure_dockerfile    : null },
						protect:       { title: 'Protect-fs',     source: props.state.app ? secure_protectfs     : null },
						smartcontract: { title: 'Smart Contract', source: props.state.app ? secure_smartcontract : null },
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
