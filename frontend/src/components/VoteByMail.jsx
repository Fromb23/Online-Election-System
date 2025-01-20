import React, { useState } from 'react';
import '../styles/VotebyMail.css';

const VotebyMail = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="votebymail-info-container">
      <h1>Vote by Mail - How It Works</h1>

      {/* Introduction Section */}
      <section className="intro">
        <p>
          Voting by mail allows you to securely cast your vote from the comfort of your home. This method is especially useful for voters who may be traveling, have health concerns, or prefer not to vote in person.
        </p>
      </section>

      {/* Voting Instructions Section */}
      <section className="instructions">
        <h2>How to Vote Online</h2>
        <ol>
          <li>
            <strong>Receive Your Voting Credentials:</strong> You will receive an email with your Voter ID and a default password.
          </li>
          <li>
            <strong>First-Time Login:</strong> Click the login link in the email. Upon first login, you will be redirected to update your password.
          </li>
          <li>
            <strong>Login and Vote:</strong> After updating your password, log in using your Voter ID and new password. The voting page will only be available during the polling period.
          </li>
          <li>
            <strong>Voting Process:</strong>
            <ul>
              <li>On the voter dashboard, click the profile icon (top right) to view your details or logout.</li>
              <li>Once the voting page is ready, you will see voting categories (e.g., President, Member of Parliament, MCA, Governor).</li>
              <li>Click a category (e.g., President) to view the list of contestants. Each contestant will have a <span className="green-button">Vote</span> button on the right.</li>
              <li>Click the <span className="green-button">Vote</span> button to select a contestant. The button will turn to <span className="red-button">Voted</span>.</li>
              <li>A <span className="confirm-button">Confirm Vote</span> button will appear. Click it to finalize your vote. This action cannot be undone.</li>
              <li>You can vote in one or more categories, but voting is optional in each category.</li>
            </ul>
          </li>
          <li>
            <strong>Important Notes:</strong>
            <ul>
              <li>Do not share your voting credentials with anyone.</li>
              <li>Ensure you are using a secure internet connection.</li>
              <li>Once you vote online, you cannot vote at a polling station.</li>
            </ul>
          </li>
        </ol>
      </section>

      {/* Key Deadlines Section */}
      <section className="deadlines">
        <h2>Key Deadlines</h2>
        <ul>
          <li><strong>Ballot Request Deadline:</strong> [08/09/2027 at 5 pm EAT]</li>
          <li><strong>Ballot Return Deadline:</strong> [10/09/2027 at 5 pm EAT]</li>
        </ul>
        <p>
          <em>Note:</em> Submit your ballot as early as possible to ensure timely delivery.
        </p>
      </section>

      {/* FAQ Section with Dropdowns */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        {[
          {
            question: "Who is eligible to vote by mail?",
            answer: "Most registered voters can vote by mail. Some states require an excuse, while others offer mail-in ballots to all voters.",
          },
          {
            question: "What if I make a mistake on my ballot?",
            answer: "Contact your local election office immediately to request a new ballot or instructions for corrections.",
          },
          {
            question: "How do I track my mail-in ballot?",
            answer: "Many states provide online tracking systems to follow the status of your mail-in ballot. Check your local election website for details.",
          },
          {
            question: "When is the deadline to request a mail-in ballot?",
            answer: "Deadlines vary by state. Check your local election office's website for specific dates and ensure you submit your request well in advance.",
          },
          {
            question: "Can I drop off my mail-in ballot in person?",
            answer: "Yes, many states allow you to drop off your completed mail-in ballot at designated drop boxes or election offices. Verify the locations and deadlines in your area.",
          },
          {
            question: "What if I don’t receive my mail-in ballot?",
            answer: "If you don’t receive your ballot within the expected timeframe, contact your local election office to request a replacement or explore alternative voting options.",
          },
        ].map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 onClick={() => toggleFaq(index)}>
              {faq.question} {faqOpen === index ? '▲' : '▼'}
            </h3>
            {faqOpen === index && <p>{faq.answer}</p>}
          </div>
        ))}
      </section>

      {/* Footer Section */}
      <footer>
        <p>For more information, visit your <a href="https://www.nass.org/can-I-vote" target="_blank" rel="noopener noreferrer">local election office</a>.</p>
      </footer>
    </div>
  );
};

export default VotebyMail;