import React from "react";
import { useNavigate } from "react-router-dom";

const CandidateCard = ({ category }) => {
  console.log("Category data in candidate card", category);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Clicked on category", category);
    navigate(`/categories/${category.id}`, { state: { category } });
  };

  return (
    <div className="candidate-card" onClick={handleClick} style={styles.card}>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
};

export default CandidateCard;