import React from 'react';
import { useQuery } from '@apollo/react-hooks';

const Query = (props) => {
	const { data, loading, error } = useQuery(
		props.query,
		{
			variables:    props.variables || {},
			pollInterval: props.interval  || 10000,
		}
	)

	if (loading) { return null; }
	if (error  ) { return null; }

	return React.Children.map(props.children, child => React.cloneElement(child, { data }))
}

export default Query;
