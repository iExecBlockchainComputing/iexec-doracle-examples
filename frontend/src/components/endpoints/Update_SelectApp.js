import React       from 'react';
import Grid        from '@material-ui/core/Grid';
import Card        from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import logo from '../../assets/iExec-logo-vertical-white@2x.png';

const Update_SelectApp = (props) =>
	<Grid container spacing={6} justify='center' alignItems='center' style={{ margin: 0, width: '100%' }}>
		<Grid item xs={12}>
			<h2 className='text-center'>Select the updating app</h2>
		</Grid>
		<Grid item xs={3}>
			<Card>
				<CardContent style={{ backgroundColor: '#444444' }} role='button' onClick={() => { props.update({ app: true }); props.forward(); }} className='p-0'>
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
		<Grid item xs={3}>
			<Card>
				<CardContent style={{ backgroundColor: '#444444' }} role='button' onClick={() => { props.update({ app: false }); props.forward(); }} className='p-0'>
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

export default Update_SelectApp;
