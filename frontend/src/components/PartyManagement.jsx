import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParties, deleteParty, addParty, updateParty } from '../redux/actions/createPartyActions';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons

const PartyManagement = () => {
  const { selectedParty, parties, loading, error } = useSelector((state) => state.party);
  const dispatch = useDispatch();
  const [partyName, setPartyName] = useState('');
  const [editingParty, setEditingParty] = useState(null);
  const [isDelete, setIsDelete] = useState(false); // New state to track delete action
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        // Reset form when clicked outside of it
        setEditingParty(null);
        setPartyName('');
        setIsDelete(false); // Reset delete state
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchParties());
  }, [dispatch]);

  const handleAddOrUpdateParty = (e) => {
    e.preventDefault();

    if (!partyName.trim()) {
      alert("Party name cannot be empty.");
      return;
    }

    if (isDelete) {
      // If in delete state, handle deletion
      if (window.confirm(`Are you sure you want to remove ${partyName}?`)) {
        dispatch(deleteParty(editingParty.partyId))
          .then(() => {
            alert("Party deleted successfully!");
            setEditingParty(null);
            setPartyName('');
            setIsDelete(false); // Reset delete state
            dispatch(fetchParties()); // Re-fetch parties after delete
          })
          .catch((err) => console.error(err));
      }
    } else if (editingParty) {
      const updatedPartyData = { partyName: partyName };

      dispatch(updateParty({ partyId: editingParty.partyId, partyData: updatedPartyData }))
        .then(() => {
          alert("Party updated successfully!");
          setEditingParty(null);
          setPartyName("");
          dispatch(fetchParties()); // Re-fetch parties after update
        })
        .catch((err) => console.error(err));
    } else {
      // If no party selected, create a new one
      dispatch(addParty({ partyName: partyName }))
        .then(() => {
          alert("A new Party added successfully!");
          setEditingParty(null);
          setPartyName('');
          setIsDelete(false); // Reset delete state
          dispatch(fetchParties()); // Re-fetch parties after adding
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEditParty = (party) => {
    setEditingParty(party);
    setPartyName(party.partyName); // Set input to the selected party name for editing
    setIsDelete(false); // Reset delete state if editing
  };

  const handleDelete = (party) => {
    setEditingParty(party);
    setPartyName(party.partyName); // Populate the input with party name for deletion
    setIsDelete(true); // Set delete state
  };

  if (loading) return <p>Loading parties...</p>;

  return (
    <div>
      <h2>Party Management</h2>
      <p>Registered Parties: <strong>{parties.length}</strong></p>

      <form onSubmit={handleAddOrUpdateParty} className="add-party-form" ref={formRef}>
        <input
          style={{ padding: "10px 15px" }}
          type="text"
          placeholder="Enter party name"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          disabled={isDelete} 
        />
        <button
          style={{ marginLeft: "10px", padding: "10px 15px", cursor: "pointer" }}
          type="submit"
        >
          {isDelete ? "Delete Party" : (editingParty ? "Update Party" : "Create new party")}
        </button>
      </form>

      {parties.length === 0 ? (
        <p>No parties found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Party</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parties.map((party) => (
              <tr key={party.partyId}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {party.partyName} ({party.partyId})
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEditParty(party)}
                    style={{ marginRight: '10px', color: '#4CAF50' }}
                  >
                    <FaEdit />
                  </button>
                  <a
                    href="#"
                    onClick={() => handleDelete(party)}
                    style={{ color: '#F44336' }}
                  >
                    <FaTrash />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedParty && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Party Details</h3>
          <p><strong>Name:</strong> {selectedParty.partyName}</p>
          <p><strong>ID:</strong> {selectedParty.partyId}</p>
        </div>
      )}
    </div>
  );
};

export default PartyManagement;