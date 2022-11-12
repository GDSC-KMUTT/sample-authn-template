import styles from '../../assets/css/AuthLayout.module.css'

const AuthLayout = ({ children, image, pageTitle }) => {
	return (
		<div className={styles.layout}>
			<div
				className={styles.banner}
				style={{ backgroundImage: `url(${image})` }}
			></div>
			<div className={styles.authCard}>
				<div className={styles.cardContent}>
					<h1 className={styles.applicationName}>An sample app</h1>
					<hr />
					<h3 className={styles.pageTitle}>{pageTitle}</h3>
					{children}
				</div>
			</div>
		</div>
	)
}

export default AuthLayout
