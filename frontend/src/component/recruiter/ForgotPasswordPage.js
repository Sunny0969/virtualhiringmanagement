import React, { useState } from 'react';
import axios from 'axios';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Generate a 6-digit random code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(code);

      // Simulate sending the code to the user's email (replace with actual implementation)
      const endpointURL = 'http://localhost:3000/VerificationCodeApi'; // Replace with your actual endpoint URL
      const response = await axios.post(endpointURL, { email, code });

      if (response.data.success) {
        setVerificationCodeSent(true);
        alert('Verification code sent to: ' + email);
      } else {
        alert('Failed to send the verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      style={{
         backgroundColor: 'royalblue',
         padding: '20px',
         borderRadius: '5px',
         maxWidth: '400px',
         margin: '0 auto',
         textAlign: 'center',
         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>Forgot Password</h1>
      {verificationCodeSent ? (
        <div>
          <p>A verification code has been sent to your email. Please check your inbox.</p>
          <p>Enter the verification code:</p>
          <input type="text" value={verificationCode} readOnly />
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
<label
  htmlFor="email"
  style={{
    display: 'block',
    marginBottom: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  }}
>
  Email:
</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '3px',
            }}
          />
          <button
            type="submit"
            class="signupbutton"
            style={{
              backgroundColor: '#fff',
              color: '#764ba2',
              border: 'none',
              cursor: 'pointer',
            }}
         >
            Send Verification Code
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
