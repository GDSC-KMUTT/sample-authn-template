import AuthLayout from '../components/AuthLayout'
import Button from '../components/Button'
import Link from '../components/Link/Link'

import StarCatcher from '../assets/img/StarCatcher.jpg'
import { useLocation } from 'react-router-dom'
import { useRef } from 'react'

const LoginConfirmPage = () => {
	const location = useLocation()
	const email = location.state?.email
	const s1 = useRef(null)
	const s2 = useRef(null)
	const s3 = useRef(null)
	const s4 = useRef(null)
	const s5 = useRef(null)
	const slots = [s1, s2, s3, s4, s5]

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

	return (
		<AuthLayout image={StarCatcher} pageTitle="Confirm Login">
			<div class="box-center">
				{email ? (
					<>
						<b>{email}</b>
						<form className="form-container">
							<div class="slots">
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
		</AuthLayout>
	)
}

export default LoginConfirmPage
