import Button from '../components/Button'

import styles from '../assets/css/ProfilePage.module.css'
import ProfileImage from '../assets/img/profile.png'
import QRCode from '../assets/img/qrcode1.png'

const ProfilePage = () => {
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
			</main>
		</div>
	)
}

export default ProfilePage
