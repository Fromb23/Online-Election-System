import React from "react";
import '../styles/ElectionPositionsPage.css';

const ElectionPositionsPage = () => {
  const positions = [
    {
      title: "Returning Officer",
      requirements: [
        "Bachelor's degree in Public Administration or related field.",
        "Minimum of 5 years of experience in election management.",
        "Strong leadership and organizational skills.",
        "Excellent communication and interpersonal skills.",
        "Ability to work under pressure and meet deadlines.",
        "Knowledge of election laws and regulations.",
        "Proficiency in using election management software.",
      ],
      applyLink: "#",
    },
    {
      title: "Clerk",
      requirements: [
        "High school diploma or equivalent.",
        "Basic computer skills.",
        "Attention to detail and accuracy.",
        "Ability to work in a team environment.",
        "Good communication skills.",
        "Willingness to work long hours during election periods.",
        "Previous experience in administrative roles is a plus.",
      ],
      applyLink: "#",
    },
    {
      title: "Supervisor",
      requirements: [
        "Bachelor's degree in any field.",
        "Minimum of 3 years of supervisory experience.",
        "Strong problem-solving skills.",
        "Ability to manage multiple tasks simultaneously.",
        "Excellent time management skills.",
        "Knowledge of election processes and procedures.",
        "Proficiency in Microsoft Office Suite.",
      ],
      applyLink: "#",
    },
    // Add more positions here...
  ];

  return (
    <div className="positions-page">
      <h1>Election Positions</h1>
      <p>Explore the available positions and their requirements below.</p>
      <div className="positions-container">
        {positions.map((position, index) => (
          <div key={index} className="position-card">
            <h2>{position.title}</h2>
            <h3>Requirements:</h3>
            <ul>
              {position.requirements.map((requirement, i) => (
                <li key={i}>{requirement}</li>
              ))}
            </ul>
            <a href={position.applyLink} className="apply-link">
              Apply for {position.title}
            </a>
          </div>
        ))}
      </div>
      <a href="/" className="back-link">
        Back to Dashboard
      </a>
    </div>
  );
};

export default ElectionPositionsPage;