import AuthLayout from '../components/AuthLayout'
import Button from '../components/Button'
import Link from '../components/Link/Link'
import Onshore from '../assets/img/Onshore.jpg'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'

const RegisterPage = () => {
	const navigate = useNavigate()
	const [query] = useSearchParams()

	const [url, setUrl] = useState('')

	function onContinue() {
		navigate('/login')
	}

	function onRegisterSubmit(e) {
		e.preventDefault()
		const data = {
			email: e.target.email.value.trim(),
			password: e.target.password.value.trim(),
			confirm: e.target.confirm.value.trim(),
		}

		if (data.password !== '' && data.password !== data.confirm) {
			toast.error('Password not match!', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			})
			return
		}

		/** Register */
		axios
			.post('http://localhost:8080/signup', data)
			.then((res) => {
				/** If register success */
				if (res.data?.success) {
					toast('🦄 Signing up success!', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					})
					console.log(res.data.secret)
					setUrl(res.data?.secret)
					/** Navigate to confirmation page. */
					navigate('/register?verify=true', {
						replace: true,
					})
				} else {
					toast.error('Signing up failed!', {
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
				toast.error('Signing up failed!', {
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
		<AuthLayout
			image={Onshore}
			pageTitle={query.get('verify') ? 'TOTP Scan' : 'Registration'}
		>
			{query.get('verify') ? (
				<div className="qrcode-container">
					<img
						className="qrcode"
						src={`https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${encodeURIComponent(
							url
						)}`}
						alt="profile-img"
					/>
					<p>
						Please scan the QR code with your authenticator. <br />
						Press 'Continue' once you have scanned the QR code.
					</p>
					<Button onClick={onContinue}>Continue</Button>
				</div>
			) : (
				<form className="form-container" onSubmit={onRegisterSubmit}>
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
					<input
						className="input"
						name="confirm"
						placeholder="Confirm password"
						type="password"
						required
					/>

					<div className="action-btn-container">
						<Link to="/login">Login</Link>
						<Button type="submit">Register</Button>
					</div>
				</form>
			)}
			<ToastContainer />
		</AuthLayout>
	)
}

export default RegisterPage
