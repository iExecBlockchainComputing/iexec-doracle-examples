import React from 'react';
import Card  from 'react-bootstrap/Card';
import Tab   from 'react-bootstrap/Tab'
import Tabs  from 'react-bootstrap/Tabs'

const SourceTabs = (props) =>
{
	const [ key,  setKey  ] = React.useState(Object.keys(props.tabs).find(Boolean));
	const [ path, setPath ] = React.useState('');
	const [ code, setCode ] = React.useState('');

	React.useEffect(() => {
		setPath(props.tabs[key].source);
	}, [ key, props.tabs ])

	React.useEffect(() => {
		if (path)
		{
			fetch(path)
			.then(response =>
				response
				.text()
				.then(setCode)
				.catch(() => setCode('error loading file'))
			)
			.catch(() => setCode('error loading file'))
		}
		else
		{
			setCode('')
		}
	}, [ path ])

	return (
		<Card bg='light'>
			<Card.Header>
				<Tabs defaultActiveKey='application' onSelect={setKey}>
					{
						Object.entries(props.tabs).map(([key, value], i) => <Tab key={i} eventKey={key} title={value.title}/>)
					}
				</Tabs>
			</Card.Header>
			<Card.Body>
				<div className='overflow-auto' style={{ height: '50vh', fontSize: '.8em' }}>
					<pre>
						{
							code
							.split('\n')
							.map((item, key) => <span key={key}>{ item }<br /></span>)
						}
					</pre>
				</div>
			</Card.Body>
		</Card>
	);
}

export default SourceTabs;
