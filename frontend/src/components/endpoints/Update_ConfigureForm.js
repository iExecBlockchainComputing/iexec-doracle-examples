import React      from 'react';
import queryString from 'query-string';
import Grid        from '@material-ui/core/Grid';
import Card        from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button      from '@material-ui/core/Button';
import TextField   from '@material-ui/core/TextField';
import MenuItem    from '@material-ui/core/MenuItem';

const Update_ConfigureForm = (props) =>
{
	const [state                 ] = React.useState(queryString.parse(props.routing.location.search));
	const [base,      setBase    ] = React.useState(props.config.assets[0]);
	const [quote,     setQuote   ] = React.useState(props.config.assets[1]);
	const [precision             ] = React.useState(9);
	const [endpoint,  setEndpoint] = React.useState('');
	const [pairID,    setPairID  ] = React.useState('');

	const invert       = () => { setBase(quote); setQuote(base); }
	const updateBase   = (newBase ) => { (newBase === quote) ? invert() : setBase(newBase)   }
	const updateQuote  = (newQuote) => { (newQuote === base) ? invert() : setQuote(newQuote) }

	React.useEffect(() => {
		state.app === 'true' && setEndpoint(`https://us.market-api.kaiko.io/v1/data/trades.v1/spot_direct_exchange_rate/${base}/${quote}/recent?interval=1m&limit=720`);
		setPairID(`Price-${base}/${quote}-${precision}`);
	}, [ state, base, quote, precision, props ]);

	React.useEffect(() => {
		state.app !== 'true' && setEndpoint(props.config.variants.basic.endpoint);
	}, [ state, props ])

	return (
		<Grid container spacing={6} justify='center' alignItems='center' style={{ margin: 0, width: '100%' }}>

			<Grid item xs={12}>
				<h2 className='text-center'>Configure update request</h2>
			</Grid>

			<Grid item xs={12} sm={10} md={8} lg={6}>
				<Card>
					<CardContent>
						<Grid container spacing={3} justify='center' alignItems='center'>

							<Grid item xs={6}>
								<TextField
									select
									label='Base'
									value={base}
									onChange={ev => updateBase(ev.target.value)}
									helperText='Please select base asset'
									variant='outlined'
									fullWidth
								>
									{ props.config.assets.map((asset,i) => <MenuItem key={i} value={asset}>{asset}</MenuItem>) }
								</TextField>
							</Grid>

							<Grid item xs={6}>
								<TextField
									select
									label='Quote'
									value={quote}
									onChange={ev => updateQuote(ev.target.value)}
									helperText='Please select quote asset'
									variant='outlined'
									fullWidth
								>
									{ props.config.assets.map((asset,i) => <MenuItem key={i} value={asset}>{asset}</MenuItem>) }
								</TextField>
							</Grid>

							<Grid item xs={12}>
								<TextField
									label='ADO Pair identifier'
									value={pairID}
									variant='outlined'
									fullWidth
									disabled
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									label='Endpoint'
									value={endpoint}
									onChange={ev => setEndpoint(ev.target.value)}
									variant='outlined'
									fullWidth
									disabled={state.app === 'true'}
								/>
							</Grid>

							<Grid item xs={12}>
								<Button
									onClick={() => props.update(Object.assign(state, { quote, base, precision, endpoint }))}
									variant='contained'
									fullWidth
								>
									Request update
								</Button>
							</Grid>

						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default Update_ConfigureForm;
