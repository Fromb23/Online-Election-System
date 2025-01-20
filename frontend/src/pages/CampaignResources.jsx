import React from 'react';
import '../styles/CampaignResources.css';
import campaignIcon from '../assets/campaign-icon.png';  // Example icon

const CampaignResources = () => {
  return (
    <div className="campaign-container">
      <h1>Campaign Resources</h1>
      <p>Access materials and guidelines to help you run your campaign effectively.</p>

      <div className="resources-list">
        <div className="resource-item">
          <img src={campaignIcon} alt="Campaign Material" />
          <h2>Election Guidelines</h2>
          <p>Download the official election guidelines and stay compliant with regulations.</p>
          <button onClick={() => alert('Downloading Guidelines...')}>
            Download PDF
          </button>
        </div>

        <div className="resource-item">
          <img src={campaignIcon} alt="Training" />
          <h2>Campaign Training</h2>
          <p>Sign up for campaign workshops to learn strategies for engaging voters.</p>
          <button onClick={() => alert('Redirecting to Training Portal')}>
            Join Workshop
          </button>
        </div>

        <div className="resource-item">
          <img src={campaignIcon} alt="Marketing Tools" />
          <h2>Marketing Tools</h2>
          <p>Get access to flyers, banners, and templates for your campaign.</p>
          <button onClick={() => alert('Accessing Resources...')}>
            View Tools
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignResources;
