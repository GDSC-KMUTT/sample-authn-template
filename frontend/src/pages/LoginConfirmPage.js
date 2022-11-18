import AuthLayout from '../components/AuthLayout'
import Button from '../components/Button'
import Link from '../components/Link/Link'

import StarCatcher from '../assets/img/StarCatcher.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const LoginConfirmPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const email = location.state?.email
	const id = location.state?.id

	const s1 = useRef(null)
	const s2 = useRef(null)
	const s3 = useRef(null)
	const s4 = useRef(null)
	const s5 = useRef(null)
	const s6 = useRef(null)
	const slots = [s1, s2, s3, s4, s5, s6]

	function checkNumber(str) {
		return /\d/.test(str)
	}

	function onSlotInput(e) {
		let value = e.target.value.slice(0, 1)
		e.target.value = value = checkNumber(value) ? value : ''

		const step = value || checkNumber(value) ? 1 : -1
		const slotIndex = slots.findIndex((slot) => slot?.current === e.target)
		const focusToIndex = slotIndex + step
		if (focusToIndex < 0 || focusToIndex >= slots.length) return

		slots[focusToIndex].current.select()
	}

	function onSlotClicked(e) {
		e.target.select()
	}

	function onSubmitCode(e) {
		e.preventDefault()
		const otp = slots.map((slot) => slot.current.value).join('')
		axios
			.post('http://localhost:8080/confirm-otp', {
				id,
				otp,
			})
			.then((res) => {
				if (res.data?.success) {
					/** Navigate on success. */
					toast('🦄 Signing in has been confirmed!', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					})
					localStorage.setItem('token', res.data?.token)
					navigate('/profile')
				} else {
					toast.error('Invalid OTP!', {
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
				toast.error('Confirmation failed!', {
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
		<AuthLayout image={StarCatcher} pageTitle="Confirm Login">
			<div className="box-center">
				{email ? (
					<>
						<b>{email}</b>
						<form
							className="form-container"
							onSubmit={onSubmitCode}
						>
							<div className="slots">
								<input
									ref={s1}
									className="input"
									onInput={onSlotInput}
									onClick={onSlotClicked}
								/>
								<input
									ref={s2}
									className="input"
									onInput={onSlotInput}
									onClick={onSlotClicked}
								/>
								<input
									ref={s3}
									className="input"
									onInput={onSlotInput}
									onClick={onSlotClicked}
								/>
								<input
									ref={s4}
									className="input"
									onInput={onSlotInput}
									onClick={onSlotClicked}
								/>
								<input
									ref={s5}
									className="input"
									onInput={onSlotInput}
									onClick={onSlotClicked}
								/>
								<input
									ref={s6}
									className="input"
									onInput={onSlotInput}
									onClick={onSlotClicked}
								/>
							</div>
							<div className="action-btn-container">
								<Link to="/login">back</Link>
								<Button type="submit">Confirm</Button>
							</div>
						</form>
					</>
				) : (
					<>
						<b>Invalid email</b>
						<form className="form-container">
							<div className="action-btn-container">
								<Link to="/login">Back</Link>
							</div>
						</form>
					</>
				)}
			</div>
			<ToastContainer />
		</AuthLayout>
	)
}

export default LoginConfirmPage
