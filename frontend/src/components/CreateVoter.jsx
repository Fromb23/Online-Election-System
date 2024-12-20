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
import '../styles/CreateVoter.css';

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
    if (!countyId || !selectedConstituency || !selectedPollingStation) {
      alert('Please select all required fields');
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
  
    dispatch(createVoter(voterData));
    navigate('/admin/voters');
  };
  

  return (
    <div>
      <h2>Create New Voter</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Voter ID</label>
          <input
            type="text"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
  
        {/* Email Input */}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
  
        {/* Date of Birth Input */}
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={dateofbirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
  
        {/* County Select */}
        <div>
          <label>County</label>
          <select
            value={countyId}
            onChange={(e) => {
              setSelectedCounty(e.target.value);
            }}
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
        <div>
          <label>Constituency</label>
          <select
            value={selectedConstituency}
            onChange={(e) => setSelectedConstituency(e.target.value)}
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
        <div>
          <label>Polling Station</label>
          <select
            value={selectedPollingStation}
            onChange={(e) => setSelectedPollingStation(e.target.value)}
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
  
        <button
          type="submit"
          disabled={loading || !voterId || !fullName || !selectedPollingStation}
        >
          {loading ? 'Submitting...' : 'Create Voter'}
        </button>
      </form>
    </div>
  );  
};

export default CreateVoter;