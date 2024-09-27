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
        window.addEventListener('message', (event) => {
          if (event.data.success) {
            // Close the popup (just in case)
            if (popup && !popup.closed) {
              popup.close();
            }
            
            navigate('/mentor-dashboard');
          }
        }, { once: true }); // Listen once
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
