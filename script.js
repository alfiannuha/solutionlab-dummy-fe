// DOM elements
const loginSection = document.getElementById('login-section');
const statusSection = document.getElementById('status-section');
const statusDiv = document.getElementById('status');
const loginBtn = document.getElementById('login-btn');

// OAuth Configuration (replace with your actual values)
const CLIENT_ID = 'solutionlab'; // Replace with your real client_id
const REDIRECT_URI = encodeURIComponent(window.location.origin + window.location.pathname);
const AUTH_URL = `https://account.xignature.dev/api/oauth/authorize?client_id=solutionlab&redirect_uri=https://solutionlab-dummy-fe.vercel.app&response_type=code&scope=openid&state=test123`;


// Get query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
// const client_id = urlParams.get('client_id');
// const redirect_uri = urlParams.get('redirect_uri');

// Validate required parameters
if (code) {
  // Code exists: Exchange it for a token
  loginSection.style.display = 'none';
  statusSection.style.display = 'block';
  exchangeCodeForToken(code, CLIENT_ID, REDIRECT_URI);
} else {
  // No code: Show login button
  loginBtn.addEventListener('click', () => {
    window.location.href = AUTH_URL;
  });
}

async function exchangeCodeForToken(code, client_id, redirect_uri) {
  // Prepare request body
  const formData = new URLSearchParams();
  formData.append('grant_type', 'authorization_code');
  formData.append('code', code);
  formData.append('client_secret', 'secret'); // Add your client secret here
  formData.append('client_id', client_id);
  formData.append('redirect_uri', 'https://solutionlab-dummy-fe.vercel.app');
  // console.log("formData: ", Object.fromEntries(formData));
  
  
  // Make POST request to token endpoint
  fetch('https://account.xignature.dev/api/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Success: Display token response
      document.getElementById('status').innerHTML = 
        `<h2>Success!</h2>
          <div>You have successfully exchanged the code for a token.</div>
        `;
    })
    .catch(error => {
      // Handle errors
      document.getElementById('status').textContent = 
        `Error: ${error.message}`;
      console.error('Token exchange failed:', error);
    });
}