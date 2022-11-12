import { Link as RouterLink } from 'react-router-dom'

const Link = ({ to, children }) => {
	return (
		<RouterLink className="link" to={to}>
			{children}
		</RouterLink>
	)
}

export default Link
