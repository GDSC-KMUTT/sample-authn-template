import AuthLayout from '../components/AuthLayout'
import Button from '../components/Button'
import Link from '../components/Link/Link'

import Onshore from '../assets/img/Onshore.jpg'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
	const navigate = useNavigate()

	function onRegisterSubmit(e) {
		e.preventDefault()
		const data = {
			name: e.target.name.value,
			email: e.target.email.value,
			password: e.target.password.value,
		}
		console.log('submit', data)
		navigate('/profile', {
			state: {
				email: data.email,
			},
		})
	}

	return (
		<AuthLayout image={Onshore} pageTitle="Registration">
			<form className="form-container" onSubmit={onRegisterSubmit}>
				<input
					className="input"
					name="name"
					placeholder="Name"
					required
				/>
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
					<Link to="/login">Login</Link>
					<Button type="submit">Register</Button>
				</div>
			</form>
		</AuthLayout>
	)
}

export default RegisterPage
