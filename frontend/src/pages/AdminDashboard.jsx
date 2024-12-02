import React from 'react';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import AdminHeader from '../components/AdminHeader';
import '../styles/admin.css';

const AdminDashboard = ({ children, adminName }) => {
	return (
		<div className="admin-dashboard">
		{/* Include the Admin Header */}
		<AdminHeader adminName={adminName} />
		<div className="admin-container">
		<Sidebar />
		<div className="admin-content">
		<Breadcrumb />
		<div className="content-area">{children}</div>
		</div>
		</div>
		</div>
	);
};

export default AdminDashboard;
