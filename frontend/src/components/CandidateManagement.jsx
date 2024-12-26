import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createCandidate,
  fetchCandidates,
  deleteCandidate,
  updateCandidate,
} from "../redux/actions/createCandidateActions";
import { fetchParties } from "../redux/actions/createPartyActions";
import { fetchVoteCategories } from "../redux/actions/voteCategoryActions";
import { FaEdit, FaTrash } from "react-icons/fa";

const CandidateManagement = () => {
  const dispatch = useDispatch();
  const { candidates, loading, error } = useSelector(
    (state) => state.candidate
  );
  const { categories } = useSelector((state) => state.voteCategory);
  const { parties } = useSelector((state) => state.party);
  const [candidateName, setCandidateName] = useState("");
  const [partyName, setPartyName] = useState(""); // Update to use partyName
  const [voteCategoryId, setCategory] = useState("");
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCandidates());
    dispatch(fetchParties());
    dispatch(fetchVoteCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        resetForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resetForm = () => {
    setCandidateName("");
    setPartyName("");
    setCategory("");
    setEditingCandidate(null);
    setIsDelete(false);
  };

  const handleAddOrUpdateCandidate = (e) => {
    e.preventDefault();

    if (!isDelete && (
      !candidateName?.trim() || 
      !partyName?.trim() || 
      !voteCategoryId?.trim()
    )) {
      alert("All fields are required.");
      return;
    }

    if (isDelete) {
      if (window.confirm(`Are you sure you want to delete ${candidateName}?`)) {
        dispatch(deleteCandidate(editingCandidate.candidateId))
          .then(() => {
            alert("Candidate deleted successfully!");
            resetForm();
            dispatch(fetchCandidates());
          })
          .catch((err) => console.error(err));
      }
    } else if (editingCandidate) {
      const updatedCandidate = { candidateName, partyName, voteCategoryId }; // Use partyName
      dispatch(updateCandidate({ id: editingCandidate.candidateId, candidate: updatedCandidate }))
        .then(() => {
          alert("Candidate updated successfully!");
          resetForm();
          dispatch(fetchCandidates());
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(createCandidate({ candidateName, partyName, voteCategoryId })) // Use partyName
        .then(() => {
          alert("Candidate added successfully!");
          resetForm();
          dispatch(fetchCandidates());
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate);
    setCandidateName(candidate.candidateName);
    setPartyName(candidate.partyName); // Set partyName
    setCategory(candidate.voteCategoryId);
    setIsDelete(false);
  };

  const handleDelete = (candidate) => {
    setEditingCandidate(candidate);
    setCandidateName(candidate.candidateName);
    setPartyName(""); // Reset partyName
    setCategory("");
    setIsDelete(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="manage-candidates">
      <h1>Manage Candidates</h1>
      {error && <p className="error">Error: {error}</p>}

      <form
        onSubmit={handleAddOrUpdateCandidate}
        className="add-candidate-form"
        ref={formRef}
      >
        <input
          style={{ padding: "10px 15px" }}
          type="text"
          placeholder="Enter Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          disabled={isDelete}
        />
        <select
          style={{ padding: "10px 15px" }}
          value={partyName} // Use partyName
          onChange={(e) => setPartyName(e.target.value)} // Set partyName
          disabled={isDelete}
        >
          <option value="">Select Party</option>
          {parties.map((partyItem) => (
            <option key={partyItem.PartyId} value={partyItem.partyName}>
              {partyItem.partyName}
            </option>
          ))}
        </select>
        <select
          style={{ padding: "10px 15px" }}
          value={voteCategoryId}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isDelete}
        >
          <option value="">Select Candidate Category</option>
          {categories.map((categoryItem) => (
            <option key={categoryItem.voteCategoryId} value={categoryItem.voteCategoryId}>
              {categoryItem.name}
            </option>
          ))}
        </select>
        <button
          style={{ marginLeft: "10px", padding: "10px 15px", cursor: "pointer" }}
          type="submit"
        >
          {isDelete
            ? "Delete Candidate"
            : editingCandidate
            ? "Update Candidate"
            : "Add Candidate"}
        </button>
      </form>

      {candidates.length === 0 ? (
        <p>No candidates found, please register one.</p>
      ) : (
        <table
          className="candidate-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Candidate Name
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Party</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Category
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.candidateId}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {candidate.candidateName}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {candidate.partyName}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {candidate.voteCategoryName}
                </td>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleEditCandidate(candidate)}
                    style={{ marginRight: "10px", color: "#4CAF50" }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(candidate)}
                    style={{ color: "#F44336" }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CandidateManagement;