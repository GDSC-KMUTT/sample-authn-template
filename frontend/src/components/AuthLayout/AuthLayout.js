import styles from '../../assets/css/AuthLayout.module.css'

const AuthLayout = ({ children, image, pageTitle }) => {
	return (
		<div
			className={styles.layout}
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className={styles.authCard}>
				<h1 className={styles.applicationName}>An sample app</h1>
				<hr />
				<h3 className={styles.pageTitle}>{pageTitle}</h3>
				{children}
			</div>
		</div>
	)
}

export default AuthLayout
