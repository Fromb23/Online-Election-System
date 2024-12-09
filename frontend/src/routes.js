//src/App.js or whenever your routes are defined
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAdmin from './pages/CreateAdmin';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/create/admin" element={<CreateAdmin />} />
				{/* other routes */}
			</Routes>
		</Router>
	);
}

export default App;