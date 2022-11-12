import { Route, Routes } from 'react-router-dom'
import { LoginPage, LoginConfirmPage, RegisterPage, ProfilePage } from './pages'

import './assets/css/global.css'

const App = () => {
	return (
		<Routes>
			<Route index element={<LoginPage />} />
			<Route path="login">
				<Route index element={<LoginPage />} />
				<Route path="confirm" element={<LoginConfirmPage />} />
			</Route>
			<Route path="register" element={<RegisterPage />} />
			<Route path="profile" element={<ProfilePage />} />
		</Routes>
	)
}

export default App
