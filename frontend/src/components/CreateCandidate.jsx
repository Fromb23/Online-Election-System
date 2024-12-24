import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCandidateName,
  setPartyId,
  setVoteCategoryId,
  clearMessages,
} from '../redux/slices/createCandidateSlices';
import { createCandidate, fetchPartiesAndCategories } from '../redux/actions/createCandidateActions';

const CreateCandidate = () => {
  const dispatch = useDispatch();
  const {
    candidateName,
    partyId,
    voteCategoryId,
    parties,
    voteCategories,
    error,
    success,
    loading,
  } = useSelector((state) => state.createCandidate);

  useEffect(() => {
    dispatch(fetchPartiesAndCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    const newCandidate = {
      candidateName,
      PartyId: partyId,
      voteCategoryId,
    };
    dispatch(createCandidate(newCandidate));
  };

  return (
    <div className="create-candidate">
      <h1>Create Candidate</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="candidateName">Candidate Name:</label>
          <input
            type="text"
            id="candidateName"
            value={candidateName}
            onChange={(e) => dispatch(setCandidateName(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="partyId">Party:</label>
          <select
            id="partyId"
            value={partyId}
            onChange={(e) => dispatch(setPartyId(e.target.value))}
            required
          >
            <option value="">Select a Party</option>
            {parties.map((party) => (
              <option key={party.partyId} value={party.partyId}>
                {party.partyName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="voteCategoryId">Vote Category:</label>
          <select
            id="voteCategoryId"
            value={voteCategoryId}
            onChange={(e) => dispatch(setVoteCategoryId(e.target.value))}
            required
          >
            <option value="">Select a Vote Category</option>
            {voteCategories.map((category) => (
              <option key={category.voteCategoryId} value={category.voteCategoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Candidate</button>
      </form>
    </div>
  );
};

export default CreateCandidate;