import React from 'react';
import AdminHeader from '../components/AdminHeader';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

const AdminDashboard = ({ children }) => {
	return (
		<div className="admin-dashboard">
		<AdminHeader />
		<div className="admin-container">
		<Sidebar />
		<div className="admin-content">
		<Breadcrumb />
		<div className="content-area">{children}</div>
		</div>
		</div>
		<Footer />
		</div>
	);
};

export default AdminDashboard;
