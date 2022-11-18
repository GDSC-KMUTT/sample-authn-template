import Button from '../components/Button'

import styles from '../assets/css/ProfilePage.module.css'
import ProfileImage from '../assets/img/profile.png'
import QRCode from '../assets/img/qrcode1.png'

import React from 'react'

const ProfilePage = () => {
	const s1 = React.useRef(null)
	const s2 = React.useRef(null)
	const s3 = React.useRef(null)
	const s4 = React.useRef(null)
	const s5 = React.useRef(null)
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
		<div className={styles.container}>
			<nav className={styles.navbar}>
				<div className={styles.navbarContainer}>
					<img
						className={styles.profileImage}
						src={ProfileImage}
						alt="profile-img"
					/>
					<h2 className={styles.username}>John Appleseed</h2>
					<h3 className={styles.email}>john@example.com</h3>
				</div>
			</nav>
			<main className={styles.content}>
				<img src={QRCode} alt="qrcode" />
				<p>
					tpauth://totp/BSthun%20KB%20BookStack%3Aco%40bsthun.com?
					secret=L6UVQ7F5O4BWDYHV
				</p>
				<Button>Regenerate</Button>

				<form>
					<div className={`${styles.slotsContainer}`}>
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
						</div>
					</div>
					<Button>submit</Button>
				</form>
			</main>
		</div>
	)
}

export default ProfilePage
