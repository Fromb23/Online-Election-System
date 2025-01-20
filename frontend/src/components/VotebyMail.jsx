import React, { useState } from 'react';

const VotebyMail = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    voterId: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    return (
      formData.fullName &&
      formData.address &&
      formData.email &&
      formData.voterId
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', formData);
      setSubmitted(true);
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="vote-by-mail-container">
      <h2>Request Mail-in Ballot</h2>
      
      {submitted ? (
        <p>Your request has been submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Voter ID:</label>
            <input
              type="text"
              name="voterId"
              value={formData.voterId}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit Request</button>
        </form>
      )}
    </div>
  );
};

export default VotebyMail;
