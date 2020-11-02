import React from 'react';
import Card  from 'react-bootstrap/Card';
const SourceView = (props) =>
	<Card bg='light'>
		<Card.Body className='d-flex'>
			<div className='d-flex overflow-auto' style={{ fontSize: '.8em' }}>
				<pre className='m-0'>
					{
						props.code
						.split('\n')
						.map((item, key) => <span key={key}>{ item }<br /></span>)
					}
				</pre>
			</div>
		</Card.Body>
	</Card>

export default SourceView;
