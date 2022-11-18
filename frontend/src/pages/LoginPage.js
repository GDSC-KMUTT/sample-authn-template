import AuthLayout from '../components/AuthLayout'
import Button from '../components/Button'
import Link from '../components/Link/Link'

import StarCatcher from '../assets/img/StarCatcher.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const LoginPage = () => {
	const navigate = useNavigate()

	function onLoginSubmit(e) {
		e.preventDefault()

		/** Data */
		const data = {
			email: e.target.email.value,
			password: e.target.password.value,
		}

		/** Login */
		axios
			.post('http://localhost:8080/signin', data)
			.then((res) => {
				/** If login success */
				if (res.data?.success) {
					toast('🦄 Signed in success!', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					})

					/** Navigate to confirmation page. */
					navigate('/login/confirm', {
						state: { email: data.email, id: res.data?.id },
					})
				} else {
					toast.error('🦄 Signed in failed!', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					})
				}
			})
			.catch((err) => {
				toast.error('Signed in failed!', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				})
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
			<ToastContainer />
		</AuthLayout>
	)
}

export default LoginPage
