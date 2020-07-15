import React      from 'react';
import Modal      from 'react-bootstrap/Modal';
import Card       from 'react-bootstrap/Card';
import Col        from 'react-bootstrap/Col'
import Row        from 'react-bootstrap/Row'
import Form       from 'react-bootstrap/Form';
import Button     from 'react-bootstrap/Button';
import Switch     from '@material-ui/core/Switch';

import SourceTabs   from './SourceTabs';
import { WithHelp } from './tools';

import secure_application   from '../offchain-tee-kaiko-pricefeed/src/app.py.txt';
import secure_dockerfile    from '../offchain-tee-kaiko-pricefeed/tee/Dockerfile.txt';
import secure_protectfs     from '../offchain-tee-kaiko-pricefeed/tee/protect-fs.sh.txt';
import secure_smartcontract from '../offchain-tee-kaiko-pricefeed/solidity/PriceOracle.sol.txt';
// import basic_application    from '../offchain-tee-kaiko-pricefeed/src/app.py.txt';
// import basic_dockerfile     from '../offchain-tee-kaiko-pricefeed/tee/Dockerfile.txt';
// import basic_protectfs      from '../offchain-tee-kaiko-pricefeed/tee/protect-fs.sh.txt';
// import basic_smartcontract  from '../offchain-tee-kaiko-pricefeed/tee/Dockerfile.txt';


const UpdateCard = (props) =>
{
	// Request modal
	const [ modal,        setModal        ] = React.useState(false);
	const [ mode,         setMode         ] = React.useState(true);
	const [ oracle,       setOracle       ] = React.useState(true);
	const [ base,         setBase         ] = React.useState(props.config.assets[0]);
	const [ quote,        setQuote        ] = React.useState(props.config.assets[1]);
	const [ precision,                    ] = React.useState(9);
	const [ pairID,       setPairID       ] = React.useState('');
	const [ endpoint,     setEndpoint     ] = React.useState('');
	// Validation modal & order
	const [ modal2,       setModal2       ] = React.useState(false);
	const [ order,        setOrder        ] = React.useState(null);

	const toggleMode   = () => setMode(!mode);
	const toggleOracle = () => setOracle(!oracle);
	const invert       = () => { setBase(quote); setQuote(base); }
	const updateBase   = (newBase ) => { (newBase === quote) ? invert() : setBase(newBase)   }
	const updateQuote  = (newQuote) => { (newQuote === base) ? invert() : setQuote(newQuote) }


	React.useEffect(() => {
		mode && setEndpoint(`https://us.market-api.kaiko.io/v1/data/trades.v1/spot_direct_exchange_rate/${base}/${quote}/recent?interval=1m&limit=720`);
		setPairID(`Price-${base}/${quote}-${precision}`);
	}, [ base, quote, precision, mode ]);

	React.useEffect(() => {
		!mode && setEndpoint(props.config.default_endpoint);
	}, [ mode, props.config.default_endpoint ])

	React.useEffect(() => {
		setOrder({
			__app:      mode   ? 'trusted app'                         : 'untrusted app',
			app:        mode   ? props.config.addresses.app.trusted    : props.config.addresses.app.basic,
			__callback: oracle ? 'trusted oracle'                      : 'untrusted oracle',
			callback:   mode   ? props.config.addresses.oracle.trusted : props.config.addresses.oracle.basic,
			params:
			{
				iexec_args: [ base, quote, precision, !mode && JSON.stringify(endpoint || 'missing endpoint') ].filter(Boolean).join(' '),
				...props.config.requestArgs,
			}
		})
	}, [ modal2 ])

	const submit = () =>
	{
		console.log(submit)
	}

	return (
		<>
			<Button variant='primary' onClick={() => setModal(true)}>
				Request an update
			</Button>

			<Modal show={modal} onHide={() => setModal(false)} size='xl' centered>
				<Modal.Header closeButton>
					<Modal.Title>
						Oracle update modal
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className='m-0'>
						{/* Left: sources */}
						<Col className='p-0 pr-2'>
							<SourceTabs tabs={{
								application:   { title: 'Application',    source: mode ? secure_application   : null },
								dockerfile:    { title: 'Dockerfile',     source: mode ? secure_dockerfile    : null },
								protect:       { title: 'Protect-fs',     source: mode ? secure_protectfs     : null },
								smartcontract: { title: 'Smart Contract', source: mode ? secure_smartcontract : null },
							}} />
						</Col>
						{/* Right: form */}
						<Col className='d-flex flex-column p-0 pl-2'>
							<Card body className='flex-grow-1 mb-2'>
								<Form>
								{/* Execution mode */}
								<Form.Group>
									<Form.Label className='d-block font-weight-bold'>
										Execution mode
										<WithHelp message='Select the iExec mode: standard or TEE'/>
									</Form.Label>
									<Form.Control as='span' className='d-flex border-0'>
										<span className='text-right' style={{flex: '1 1 0'}}>Standard mode</span>
										<Switch
											size='small'
											color='primary'
											checked={mode}
											onChange={toggleMode}
										/>
										<span className='text-left' style={{flex: '1 1 0'}}>TEE mode</span>
									</Form.Control>
								</Form.Group>
								{/* Oracle target */}
								<Form.Group>
									<Form.Label className='d-block font-weight-bold'>
										Oracle target
										<WithHelp message='Select which oracle to update'/>
									</Form.Label>
									<Form.Control as='span' className='d-flex border-0'>
										<span className='text-right' style={{flex: '1 1 0'}}>Basic oracle</span>
										<Switch
											size='small'
											color='primary'
											checked={oracle}
											onChange={toggleOracle}
										/>
										<span className='text-left' style={{flex: '1 1 0'}}>Trusted oracle</span>
									</Form.Control>
								</Form.Group>
								{/* Form row */}
								<Form.Row>
									{/* Base asset */}
									<Form.Group as={Col}>
										<Form.Label className='font-weight-bold'>Base Asset</Form.Label>
										<Form.Control size="sm" as="select" value={base} onChange={ ev => updateBase(ev.target.value) }>
											{ props.config.assets.map((asset,i) => <option key={i} value={asset}>{asset}</option>) }
										</Form.Control>
									</Form.Group>
									{/* Quote asset */}
									<Form.Group as={Col}>
										<Form.Label className='font-weight-bold'>Quote Asset</Form.Label>
										<Form.Control size="sm" as="select" value={quote} onChange={ ev => updateQuote(ev.target.value) }>
											{ props.config.assets.map((asset,i) => <option key={i} value={asset}>{asset}</option>) }
										</Form.Control>
									</Form.Group>
									{/* Precision asset */}
									{/*
										<Form.Group as={Col}>
											<Form.Label className='font-weight-bold'>Precision</Form.Label>
											<Form.Control size="sm" value={precision} disabled/>
										</Form.Group>
									*/}
									</Form.Row>
								{/* Pair identifier */}
								<Form.Group>
									<Form.Label className='d-block font-weight-bold'>
										Pair identifier
										<WithHelp message='ADO identifier for the selected pair'/>
									</Form.Label>
									<Form.Control size="sm" value={pairID} disabled/>
								</Form.Group>
								{/* Endpoint */}
								<Form.Group>
									<Form.Label className='d-block font-weight-bold'>
										Endpoint
										<WithHelp message='HTTP endpoint for the selected pair'/>
									</Form.Label>
									<Form.Control size="sm" value={endpoint} disabled={mode} onChange={(ev) => setEndpoint(ev.target.value)}/>
								</Form.Group>
								</Form>
							</Card>
							{/* Submit */}
							<Card body className='mt-2'>
								<Button variant='secondary' block onClick={() => setModal2(true)}>
									Request {mode ? 'trusted' : 'untrusted'} update
								</Button>
							</Card>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>

			<Modal show={modal2} onHide={() => setModal2(false)} size='lg' centered className='layer2' backdropClassName='layer2'>
				<Modal.Header closeButton>
					<Modal.Title>
						Request order
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<pre>
					{
						JSON.stringify(order, null, 2)
						.split('\n')
						.map((item, key) => <span key={key}>{item}<br/></span>)
					}
					</pre>
					<Button variant='danger' block onClick={submit}>
						Submit request
					</Button>
				</Modal.Body>
			</Modal>

		</>
	);
}

export default UpdateCard;
