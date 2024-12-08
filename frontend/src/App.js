import React from 'react';
import './styles/admin.css';
import Header from './components/Header';
import VoterComponent from './components/VoterComponent';
import UpdateVoterPage from './components/UpdateVoterPage';
import AdminLogin from './pages/AdminLogin';
import Footer from './components/Footer';
import Grid from './components/Grid';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import AdminDashboardLayout from './pages/AdminDashboard';
import { useSelector } from 'react-redux';
import './App.css';

const AuthLayout = () => {
	const { userInfo } = useSelector((state) => state.user);
	if (!userInfo) {
		return <Navigate to='/admin/login' />;
	}
	return (
		<AdminDashboardLayout>
			<Outlet />
		</AdminDashboardLayout>
	)
};
function App() {
    return (
        <Router>
            <Routes>
                {/* Admin Routes */}
	    <Route element={<AuthLayout />}
	    >
	    <Route path="/admin/voters" element ={<VoterComponent />} />
	    <Route path="/admin/voters/update/:voterId" element={<UpdateVoterPage />} />
	    </Route>
                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                {/* Main Site Routes */}
                <Route
                    path="/"
                    element={
                        <div style={containerStyles}>
                            <Header />
                            <main style={mainStyles}>
                                <h2>Welcome to Election System</h2>
                                <p>The website provides voters with an easier way to find election information.</p>
                                <Grid />
                            </main>
                            <Footer />
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

const containerStyles = {
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
};

const mainStyles = {
	padding: '20px',
	textAlign: 'center',
	flex: '1',
};

export default App;
