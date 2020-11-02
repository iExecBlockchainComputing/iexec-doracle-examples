import React             from 'react';
import queryString       from 'query-string';
import Grid              from '@material-ui/core/Grid';
import Card              from '@material-ui/core/Card';
import CardContent       from '@material-ui/core/CardContent';
import Button            from '@material-ui/core/Button';
import Dialog            from '@material-ui/core/Dialog';
import DialogActions     from '@material-ui/core/DialogActions';
import DialogContent     from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle       from '@material-ui/core/DialogTitle';


import logo from '../../assets/iExec-logo-vertical-white@2x.png';

const Update_SelectApp = (props) =>
{
	const [state        ] = React.useState(queryString.parse(props.routing.location.search));
	const [open, setOpen] = React.useState(false);
	const [app,  setApp ] = React.useState(null);

	React.useEffect(() => {
		if (app != null)
		{
			state.oracle === 'true' && !app ? setOpen(true) : submit();
		}
	}, [state, app]);

	const submit = () => {
		props.update(Object.assign(state, { app }));
	}

	return (
		<>
		<Grid container spacing={3} justify='center' alignItems='center' style={{ margin: 0, width: '100%' }}>
			<Grid item xs={12}>
				<h2 className='text-center'>Select the updating app</h2>
			</Grid>
			<Grid item xs={6} sm={5} md={4} lg={3}>
				<Card>
					<CardContent style={{ backgroundColor: '#444444' }} role='button' onClick={() => setApp(true)} className='p-0'>
						<Grid container justify='center' alignItems='center' style={{ height: 160 }}>
							<img src='https://docs.kaiko.com/images/logo.png' width='128' alt='secure'/>
						</Grid>
						<CardContent style={{ backgroundColor: '#FAE900' }} className='p-4 rounded-top'>
							<h5 className='m-0 text-center'>
								Pricefeed by Kaiko
							</h5>
							</CardContent>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={6} sm={5} md={4} lg={3}>
				<Card>
					<CardContent style={{ backgroundColor: '#444444' }} role='button' onClick={() => setApp(false)} className='p-0'>
						<Grid container justify='center' alignItems='center' style={{ height: 160 }}>
							<img src={logo} width='128' alt='basic'/>
						</Grid>
						<CardContent style={{ backgroundColor: '#FAE900' }} className='p-4 rounded-top'>
							<h5 className='m-0 text-center'>
								Open pricefeed
							</h5>
						</CardContent>
					</CardContent>
				</Card>
			</Grid>
		</Grid>

		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>Warning</DialogTitle>
			<DialogContent>
				<DialogContentText>
					You are trying to update the trusted oracle with the open pricefeed.
					The trusted oracle is configured to reject all updates not originating
					from the Kaiko pricefeed. If you confirm this combination, the update
					task will run but the new value will be rejected by the pricefeed
					smart contract.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)} color="primary">
					Cancel
				</Button>
				<Button onClick={() => submit()} color="primary" autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>

		</>
	);
}

export default Update_SelectApp;
