import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const navigate = useNavigate();

  function openGoogleAuthPopup() {
    // Call your back-end to get the OAuth URL
    fetch('http://localhost:3001/auth')
      .then(response => response.json())
      .then(data => {
        const authUrl = data.url;
  
        // Open the URL in a popup
        const popup = window.open(
          authUrl,
          'googleAuthPopup',
          'width=500,height=600'
        );
  
        // Listen for the message from the popup (authentication success)
        const handleAuthMessage = (event) => {
          if (event.data.success) {
            // Close the popup
            if (popup && !popup.closed) {
              popup.close();
            }
  
            // Navigate to the dashboard after a brief delay
            setTimeout(() => {
              navigate('/mentor-dashboard');
            }, 100); // Adjust the timeout as necessary
          }
        };
  
        window.addEventListener('message', handleAuthMessage, { once: true }); // Listen once
      })
      .catch(error => {
        console.error('Error fetching OAuth URL:', error);
      });
  }
  

  return (
    <div>
      <button onClick={openGoogleAuthPopup}>Authenticate with Google</button>
    </div>
  );
};

export default Authentication;
