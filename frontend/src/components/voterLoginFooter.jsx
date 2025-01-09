import React from 'react';

const VoterLoginFooter = () => {
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Page Content */}
      </div>
      <footer style={footerStyle}>
        <p>&copy; 2024 Election System</p>
      </footer>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const contentStyle = {
  flex: 1,
};

const footerStyle = {
  textAlign: 'center',
  background: '#f1f1f1', // Optional for better visibility
  padding: '10px',
};

export default VoterLoginFooter;