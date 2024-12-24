import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidateById, updateCandidate } from "../redux/actions/candidateActions";
import { useParams, useHistory } from "react-router-dom";

const UpdateCandidate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { candidateId } = useParams();
  const { candidate, loading, error } = useSelector((state) => state.candidate);
  const [candidateName, setCandidateName] = useState("");
  const [party, setParty] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCandidateById(candidateId));
  }, [dispatch, candidateId]);

  useEffect(() => {
    if (candidate) {
      setCandidateName(candidate.name);
      setParty(candidate.party);
      setCategory(candidate.category);
    }
  }, [candidate]);

  const handleUpdateCandidate = (e) => {
    e.preventDefault();

    if (!candidateName.trim() || !party.trim() || !category.trim()) {
      alert("All fields are required.");
      return;
    }

    const updatedCandidateData = { name: candidateName, party, category };
    dispatch(updateCandidate({ id: candidateId, candidate: updatedCandidateData }))
      .then(() => {
        alert("Candidate updated successfully!");
        history.push("/manage-candidates"); // Navigate back to the list page
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Update Candidate</h1>
      {error && <p className="error">Error: {error}</p>}

      <form onSubmit={handleUpdateCandidate}>
        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Update Candidate</button>
      </form>
    </div>
  );
};

export default UpdateCandidate;