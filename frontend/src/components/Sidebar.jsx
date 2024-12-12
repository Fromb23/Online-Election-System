import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlices';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="sidebar">
      <nav>
        <div className="section-header">Reports</div>
        <ul>
          <li>
            <Link to="/admin/dashboard">
              <i className="fas fa-chart-pie"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/voters">
              <i className="fas fa-users"></i> Voters
            </Link>
          </li>
        </ul>
        <div className="section-header">Manage</div>
        <ul>
          <li>
            <Link to="/admin/candidates">
              <i className="fas fa-user-tie"></i> Candidates
            </Link>
          </li>
          <li>
            <Link to="/admin/vote-categories">
              <i className="fas fa-list"></i> Vote Categories
            </Link>
          </li>
          <li>
            <Link to="/admin/parties">
              <i className="fas fa-flag"></i> Parties
            </Link>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
    </aside>
  );
};

export default Sidebar;