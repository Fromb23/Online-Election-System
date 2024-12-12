import React from 'react';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';
import AdminHeader from './AdminHeader';
import '../styles/admin.css';

const AdminDashboardLayout = ({ children }) => {
	return (
		<div className="admin-dashboard">
		{/* Include the Admin Header */}
		<AdminHeader />
		<div className="admin-container">
		<Sidebar />
		<div className="admin-content">
		<Breadcrumb />
		<div className="content-area">
		{ children }
		</div>
		</div>
		</div>
		</div>
	);
};

export default AdminDashboardLayout;
