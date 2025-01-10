import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVoters, fetchVoter, deleteVoter } from '../redux/actions/voterActions';

const VoterComponent = () => {
  const { selectedVoter, list: voters, loading, error } = useSelector((state) => state.voters);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(voters);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVoter, setFilteredVoter] = useState(null);
  const [showAllVoters, setShowAllVoters] = useState(true);

  // Fetch voters on initial load
  useEffect(() => {
    dispatch(fetchVoters());
  }, [dispatch]);

  // Check for saved search term and result in localStorage
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    const savedFilteredVoter = localStorage.getItem('filteredVoter');

    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }

    if (savedFilteredVoter) {
      setFilteredVoter(JSON.parse(savedFilteredVoter));
      setShowAllVoters(false); // Show the filtered voter result
    }
  }, []);

  // Handle search by voter ID
  const handleSearch = async () => {
    if (!searchTerm) {
      alert('Please enter a voter ID to search.');
      return;
    }

    try {
      // Fetch voter data
      const response = dispatch(fetchVoter(searchTerm));

      if (response.payload && response.payload.voterId) {
        setFilteredVoter(response.payload);
        setShowAllVoters(false);
        localStorage.setItem('searchTerm', searchTerm);
        localStorage.setItem('filteredVoter', JSON.stringify(response.payload));
      } else {
        alert('Voter not found');
        handleReset();
        dispatch(fetchVoters());
      }
    } catch (error) {
      console.error('Error fetching voter:', error);
      alert('Error fetching voter.');
      handleReset();
      dispatch(fetchVoters());
    }
  };

  // Reset to show all voters
  const handleReset = () => {
    setShowAllVoters(true);
    setFilteredVoter(null);
    setSearchTerm('');
    localStorage.removeItem('searchTerm');
    localStorage.removeItem('filteredVoter');
  };

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    localStorage.setItem('searchTerm', newSearchTerm); // Save search term to localStorage
  };

  const handleCreate = () => {
    navigate('/voters/create');
  };

  const handleDelete = (voterId) => {
    if (window.confirm('Are you sure you want to delete this voter?')) {
      dispatch(deleteVoter(voterId));
    }
  };

  if (loading) return <p>Loading voters...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Voters Management</h2>
      <p>Registered Voters: <strong>{voters.length}</strong></p>

      {/* Search and Reset */}
      <div>
        <input
          type="text"
          placeholder="Search for a voter by ID"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Create Button */}
      <button
        onClick={handleCreate}
        style={{
          padding: '10px 15px',
          backgroundColor: '#008CBA',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          float: 'right',
          marginBottom: '10px',
        }}
      >
        Create New Voter
      </button>

      {/* Display Voters */}
      {showAllVoters ? (
        <div>
          <h3>All Registered Voters</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Voted</th>
                <th>County</th>
                <th>Constituency</th>
                <th>Polling Station</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((voter) => (
                <tr key={voter.voterId}>
                  <td>{voter.voterId}</td>
                  <td>{voter.fullName}</td>
                  <td>{voter.voted ? 'Yes' : 'No'}</td>
                  <td>{voter.county}</td>
                  <td>{voter.constituency}</td>
                  <td>{voter.pollingStation}</td>
                  <td className="action-links">
                    <Link to={`/admin/voters/update/${voter.voterId}`}>Update</Link>
                    <a style={{ marginRight: "10px" }} href="#" onClick={() => handleDelete(voter.voterId)}>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3>Search Result</h3>
          {filteredVoter ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Voted</th>
                  <th>County</th>
                  <th>Constituency</th>
                  <th>Polling Station</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{filteredVoter.voterId}</td>
                  <td>{filteredVoter.fullName}</td>
                  <td>{filteredVoter.voted ? 'Yes' : 'No'}</td>
                  <td>{filteredVoter.county}</td>
                  <td>{filteredVoter.constituency}</td>
                  <td>{filteredVoter.pollingStation}</td>
                  <td className="action-links">
                    <Link to={`/admin/voters/update/${filteredVoter.voterId}`}>Update</Link>
                    <a href="#" onClick={() => handleDelete(filteredVoter.voterId)}>Delete</a>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No voter found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VoterComponent;