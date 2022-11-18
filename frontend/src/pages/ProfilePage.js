import styles from '../assets/css/ProfilePage.module.css'
import ProfileImage from '../assets/img/profile.png'

import React, { useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const ProfilePage = () => {
	const [email, setEmail] = React.useState('Loading...')

	function getUser() {
		axios
			.get('http://localhost:8080/get-user', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then((res) => {
				if (res.data?.success) {
					setEmail(res.data?.email)
				} else {
					toast.error('🦄 Error!', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
				}
			})
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<div className={styles.container}>
			<nav className={styles.navbar}>
				<div className={styles.navbarContainer}>
					<img
						className={styles.profileImage}
						src={ProfileImage}
						alt="profile-img"
					/>
					<h2 className={styles.username}>{email}</h2>
				</div>
			</nav>
			<main className={styles.content}>
				<p>Welcome, แฮร่!</p>
			</main>
			<ToastContainer />
		</div>
	)
}

export default ProfilePage
