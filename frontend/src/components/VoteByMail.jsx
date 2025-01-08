import React from 'react';
import '../styles/VotebyMail.css';

const VotebyMail = () => {
  return (
    <div className="votebymail-info-container">
      <h1>Vote by Mail - How It Works</h1>

      <section className="intro">
        <p>
          Voting by mail allows you to securely cast your vote from the comfort of your home. This method is especially useful for voters who may be traveling, have health concerns, or prefer not to vote in person.
        </p>
      </section>

      <section className="steps">
        <h2>Steps to Vote by Mail</h2>
        <ol>
          <li><strong>Check Eligibility:</strong> Ensure you're registered to vote and eligible for mail-in voting.</li>
          <li><strong>Request a Ballot:</strong> Submit a mail-in ballot request through your local election office website or by phone.</li>
          <li><strong>Fill Out Your Ballot:</strong> Carefully follow the instructions included with the ballot. Avoid mistakes and ensure your signature matches the one on file.</li>
          <li><strong>Return Your Ballot:</strong> Return your ballot by mail or at designated drop-off locations before the deadline.</li>
        </ol>
      </section>

      <section className="deadlines">
        <h2>Key Deadlines</h2>
        <ul>
          <li><strong>Ballot Request Deadline:</strong> [Insert date based on region]</li>
          <li><strong>Ballot Return Deadline:</strong> [Insert date based on region]</li>
        </ul>
        <p>
          <em>Note:</em> It's recommended to submit your ballot as early as possible to ensure timely delivery.
        </p>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Who is eligible to vote by mail?</h3>
          <p>
            Most registered voters can vote by mail. Some states require an excuse, while others offer mail-in ballots to all voters.
          </p>
        </div>

        <div className="faq-item">
          <h3>What if I make a mistake on my ballot?</h3>
          <p>
            Contact your local election office immediately to request a new ballot or instructions for corrections.
          </p>
        </div>

        <div className="faq-item">
          <h3>How do I track my mail-in ballot?</h3>
          <p>
            Many states provide online tracking systems to follow the status of your mail-in ballot. Check your local election website for details.
          </p>
        </div>
      </section>

      <footer>
        <p>For more information, visit your <a href="https://www.nass.org/can-I-vote" target="_blank" rel="noopener noreferrer">local election office</a>.</p>
      </footer>
    </div>
  );
};

export default VotebyMail;
