import AuthLayout from '../components/AuthLayout'
import Button from '../components/Button'
import Link from '../components/Link/Link'

import StarCatcher from '../assets/img/StarCatcher.jpg'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
	const navigate = useNavigate()

	function onLoginSubmit(e) {
		e.preventDefault()
		const data = {
			email: e.target.email.value,
			password: e.target.password.value,
		}
		console.log('submit', data)
		navigate('/login/confirm', {
			state: {
				email: data.email,
			},
		})
	}

	return (
		<AuthLayout image={StarCatcher} pageTitle="Sign In">
			<form className="form-container" onSubmit={onLoginSubmit}>
				<input
					className="input"
					name="email"
					placeholder="Email"
					type="email"
					required
				/>
				<input
					className="input"
					name="password"
					placeholder="Password"
					type="password"
					required
				/>

				<div className="action-btn-container">
					<Link to="/register">Register</Link>
					<Button type="submit">Login</Button>
				</div>
			</form>
		</AuthLayout>
	)
}

export default LoginPage
