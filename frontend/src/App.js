import React from 'react';
import './styles/admin.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
	  <Router>
	  <Routes>
	  <Route path='/admin' element={<AdminDashboard/>}>
	  </Route>
	  </Routes>
	  </Router>
  );
}

export default App;
