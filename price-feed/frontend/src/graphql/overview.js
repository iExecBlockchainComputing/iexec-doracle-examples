import gql from 'graphql-tag';

export default gql`
{
	pairs(first: 1000)
	{
		asset_base  { id }
		asset_quote { id }
		precision
		latest
		{
			value
			timestamp
		}
	}
}
`
