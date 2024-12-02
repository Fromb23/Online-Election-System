import React, { useState} from 'react';
import './styles/admin.css';
import Header from './components/Header';
import AdminLogin from './pages/AdminLogin';
import Footer from './components/Footer';
import Grid from './components/Grid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
    const [adminName, setAdminName] = useState('');

    return (
        <Router>
            <Routes>
                {/* Admin Routes */}
                <Route
                    path="/admin/*"
                    element={
                        <AdminDashboard adminName={adminName} />
                    }
                />
                <Route
                    path="/admin/login"
                    element={<AdminLogin setAdminName={setAdminName} />}
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
