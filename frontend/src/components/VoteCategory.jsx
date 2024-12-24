import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVoteCategory,
  fetchVoteCategories,
  addVoteCategory,
  deleteVoteCategory,
  updateVoteCategory,
} from "../redux/actions/voteCategoryActions";
import { FaEdit, FaTrash } from "react-icons/fa";

const VoteCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.voteCategory);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDelete, setIsDelete] = useState(false); // New state to track delete action
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        // Reset form when clicked outside of it
        setEditingCategory(null);
        setCategoryName('');
        setIsDelete(false); // Reset delete state
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchVoteCategories());
  }, [dispatch]);

  const handleAddOrUpdateCategory = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    if (isDelete) {
      // If in delete state, handle deletion
      if (window.confirm(`Are you sure you want to remove the category: ${categoryName}?`)) {
        dispatch(deleteVoteCategory(editingCategory.voteCategoryId))
        .then(() => {
          alert("Vote category deleted successfully!");
          setEditingCategory(null);
          setCategoryName('');
          setIsDelete(false);
          dispatch(fetchVoteCategories());
        })
        .catch((err) => console.error(err));
      }
    } else if (editingCategory) {
      const updatedCategoryData = { name: categoryName };

      dispatch(updateVoteCategory({ id: editingCategory.voteCategoryId, category: updatedCategoryData }))
        .then(() => {
          alert("Vote category updated successfully!");
          setEditingCategory(null);
          setCategoryName('');
          dispatch(fetchVoteCategories());
        })
        .catch((err) => console.error(err));
    } else {
      // If no category selected, create a new one
      dispatch(addVoteCategory({ name: categoryName }))
        .then(() => {
          alert("Vote category added successfully!");
          setEditingCategory(null);
          setCategoryName('');
          setIsDelete(false); // Reset delete state
          dispatch(fetchVoteCategories()); // Re-fetch categories after adding
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name); // Set input to the selected category name for editing
    setIsDelete(false); // Reset delete state if editing
  };

  const handleDelete = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name); // Populate the input with category name for deletion
    setIsDelete(true); // Set delete state
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="vote-categories">
      <h1>Vote Categories</h1>
      {error && <p className="error">Error: {error}</p>}

      <form onSubmit={handleAddOrUpdateCategory} className="add-category-form" ref={formRef}>
        <input
          style={{ padding: "10px 15px" }}
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          disabled={isDelete} 
        />
        <button style={{ marginLeft: "10px", padding: "10px 15px", cursor: "pointer" }} type="submit">
          {isDelete ? "Delete Category" : (editingCategory ? "Update Category" : "Add Category")}
        </button>
      </form>

      {categories.length === 0 ? (
        <p>No vote categories, please register one.</p>
      ) : (
        <table className="category-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Category</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.voteCategoryId}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {category.voteCategoryId} {category.name}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEditCategory(category)}
                    style={{ marginRight: '10px', color: '#4CAF50' }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    style={{ color: '#F44336' }}
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

export default VoteCategories;