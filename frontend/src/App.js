import React from 'react';
import './styles/admin.css';
import Header from './components/Header';
import VoterComponent from './components/VoterComponent';
import UpdateVoterPage from './components/UpdateVoterPage';
import CreateVoter from './components/CreateVoter';
import CreateCandidate from './components/CandidateManagement';
import PartyManagement from './components/PartyManagement';
import VoteCategory from './components/VoteCategory';
import AdminLogin from './pages/AdminLogin';
import CreateAdmin from './pages/CreateAdmin';
import VoterLogin from './pages/VoterLogin';
import Footer from './components/Footer';
import Grid from './components/Grid';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { useSelector } from 'react-redux';
import './App.css';
import Dashboard from './pages/Dashboard';
import VoterLoginDashboard from './pages/voterLoginDashboard';
import CandidateList from "./pages/CandidateList";
import UpdatePassword from './pages/UpdatePassword';
import VoterTracking from './components/VoterTracking'; // Import VoterTracking
import TimerComponent from './components/TimerComponent';
import ElectionPositionsPage from './pages/ElectionPositionsPage';
import LiveResultsPage from './pages/LiveResultsPage';

const AuthAdminLayout = () => {
    const { userInfo } = useSelector((state) => state.user);
    if (!userInfo) {
        return <Navigate to='/admin/login' />;
    }
    return (
        <AdminDashboardLayout>
            <Outlet />
        </AdminDashboardLayout>
    );
};

const AuthVoterLayout = () => {
    const { voterInfo } = useSelector((state) => state.voter);
    if (!voterInfo) {
        return <Navigate to='/voter-login' />;
    }
    return (
        <div>
            {/* Render VoterTracking if the voter is logged in */}
            <VoterTracking
                voterId={voterInfo.voterId}
                category={null} // You can pass the selected category here
                setVotedCategories={() => {}} // You can pass the necessary setter functions here
                setVotes={() => {}}
            />
            <Outlet />
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Admin Routes */}
                <Route element={<AuthAdminLayout />}>
                    <Route path="/admin/voters" element={<VoterComponent />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/voters/update/:voterId" element={<UpdateVoterPage />} />
                    <Route path="voters/create" element={<CreateVoter />} />
                    <Route path="admin/candidates" element={<CreateCandidate />} />
                    <Route path="admin/parties" element={<PartyManagement />} />
                    <Route path="admin/vote-categories" element={<VoteCategory />} />
                </Route>

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/create" element={<CreateAdmin />} />
                
                {/* Voter Routes */}
                <Route element={<AuthVoterLayout />}>
                    <Route path="/timer-component" element={<TimerComponent />} />
                    <Route path="/voter-dashboard" element={<VoterLoginDashboard />} />
                    <Route path="/categories/:categoryId" element={<CandidateList />} />
                    <Route path="/voters/update-password/:voterId" element={<UpdatePassword />} />
                </Route>
                <Route path="/voter-login" element={<VoterLogin />} />
                <Route path="/apply-voting" element={<ElectionPositionsPage />} />
                <Route path="/live-results" element={<LiveResultsPage />} />

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