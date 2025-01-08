import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestMailBallot } from '../redux/actions/voterActions';
import { fetchCounties, fetchConstituencies } from '../redux/actions/locationActions';
import { clearConstituencies } from '../redux/slices/locationSlices';
import { useNavigate } from 'react-router-dom';
import '../styles/VotebyMail.css';

const VotebyMail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, success, error } = useSelector((state) => state.mailBallot);
  const { counties, constituencies } = useSelector((state) => state.location);

  const [countyId, setCountyId] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [voterId, setVoterId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Fetch counties on component mount
  useEffect(() => {
    dispatch(fetchCounties());
  }, [dispatch]);

  // Fetch constituencies based on selected county
  useEffect(() => {
    if (countyId) {
      dispatch(fetchConstituencies(countyId));
      setSelectedConstituency('');
    } else {
      dispatch(clearConstituencies());
      setSelectedConstituency('');
    }
  }, [countyId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!countyId || !selectedConstituency) {
      alert('Please fill all required fields');
      return;
    }

    const mailBallotRequest = {
      voterId,
      fullName,
      email,
      address,
      county: countyId,
      constituency: selectedConstituency,
    };

    dispatch(requestMailBallot(mailBallotRequest));
    setSubmitted(true);
    navigate('/confirm');
  };

  return (
    <div className="votebymail-container">
      <h2>Request Mail-in Ballot</h2>

      {error && <p className="error-message">{error}</p>}
      {success && submitted ? (
        <p>Your mail-in ballot request has been submitted!</p>
      ) : (
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

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* County Select */}
          <div>
            <label>County</label>
            <select
              value={countyId}
              onChange={(e) => setCountyId(e.target.value)}
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

          <button
            type="submit"
            disabled={loading || !voterId || !fullName || !countyId || !selectedConstituency}
          >
            {loading ? 'Submitting...' : 'Request Ballot'}
          </button>
        </form>
      )}
    </div>
  );
};

export default VotebyMail;