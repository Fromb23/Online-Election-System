import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVoter } from '../redux/actions/voterActions';
import {
  fetchCounties,
  fetchConstituencies,
  fetchPollingStations,
} from '../redux/actions/voterActions';
import { clearConstituencies, clearPollingStations } from '../redux/slices/locationSlices';
import { useNavigate } from 'react-router-dom';

const CreateVoter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.voters);
  const { counties, constituencies, pollingStations } = useSelector(
    (state) => state.location
  );

  const [countyId, setSelectedCounty] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [selectedPollingStation, setSelectedPollingStation] = useState('');
  const [email, setEmail] = useState('');
  const [dateofbirth, setDateOfBirth] = useState('');
  const [voterId, setVoterId] = useState('');
  const [fullName, setFullName] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Fetch counties on component mount
  useEffect(() => {
    dispatch(fetchCounties());
  }, [dispatch]);

  // Fetch constituencies when county is selected
  useEffect(() => {
    if (countyId) {
      dispatch(fetchConstituencies(countyId));
      setSelectedConstituency(''); // Reset constituency and polling station when county changes
      setSelectedPollingStation('');
    } else {
      dispatch(clearConstituencies());
      setSelectedConstituency('');
      setSelectedPollingStation('');
    }
  }, [countyId, dispatch]);

  // Fetch polling stations when constituency is selected
  useEffect(() => {
    if (selectedConstituency) {
      dispatch(fetchPollingStations(selectedConstituency));
      setSelectedPollingStation(''); // Reset polling station when constituency changes
    } else {
      dispatch(clearPollingStations());
      setSelectedPollingStation('');
    }
  }, [selectedConstituency, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!countyId || !selectedConstituency || !selectedPollingStation) {
      setFormError('Please select all required fields');
      return;
    }

    const voterData = {
      voterId,
      fullName,
      county: countyId,
      constituency: selectedConstituency,
      pollingStation: selectedPollingStation,
      email,
      dateofbirth,
    };

    dispatch(createVoter(voterData))
      .unwrap()
      .then(() => {
        setFormSuccess('Voter created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/admin/voters');
        }, 2000); // Redirect after 2 seconds
      })
      .catch((err) => {
        setFormError(err.message || 'Failed to create voter');
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Voter</h2>
      {formError && <div style={styles.errorMessage}>{formError}</div>}
      {formSuccess && <div style={styles.successMessage}>{formSuccess}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Voter ID */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Voter ID</label>
          <input
            type="text"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* Full Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* Email */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* Date of Birth */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth</label>
          <input
            type="date"
            value={dateofbirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* County Select */}
        <div style={styles.formGroup}>
          <label style={styles.label}>County</label>
          <select
            value={countyId}
            onChange={(e) => setSelectedCounty(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select County</option>
            {counties.map((county) => (
              <option key={county.id} value={county.id}>
                {county.name}
              </option>
            ))}
          </select>
        </div>

        {/* Constituency Select */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Constituency</label>
          <select
            value={selectedConstituency}
            onChange={(e) => setSelectedConstituency(e.target.value)}
            style={styles.input}
            required
            disabled={!constituencies.length}
          >
            <option value="">Select Constituency</option>
            {constituencies.map((constituency) => (
              <option key={constituency.id} value={constituency.id}>
                {constituency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Polling Station Select */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Polling Station</label>
          <select
            value={selectedPollingStation}
            onChange={(e) => setSelectedPollingStation(e.target.value)}
            style={styles.input}
            required
            disabled={!pollingStations.length}
          >
            <option value="">Select Polling Station</option>
            {pollingStations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={styles.button}
          disabled={loading || !voterId || !fullName || !selectedPollingStation}
        >
          {loading ? 'Submitting...' : 'Create Voter'}
        </button>
      </form>
    </div>
  );
};

export default CreateVoter;

// Inline styles for this component only
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  errorMessage: {
    color: '#dc3545',
    marginBottom: '15px',
    textAlign: 'center',
  },
  successMessage: {
    color: '#28a745',
    marginBottom: '15px',
    textAlign: 'center',
  },
};