// Get query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
// const client_id = urlParams.get('client_id');
// const redirect_uri = urlParams.get('redirect_uri');

// Validate required parameters
if (
  !code) {
  document.getElementById('status').textContent = 
    'Error: Missing required parameter (code).';
  throw new Error('Missing OAuth parameters');
}

// Prepare request body
const formData = new URLSearchParams();
formData.append('grant_type', 'authorization_code');
formData.append('code', code);
formData.append('client_secret', 'secret'); // Add your client secret here
formData.append('client_id', 'solutionlab');
formData.append('redirect_uri', 'http://127.0.0.1:5500/index.html');
console.log("formData: ", Object.fromEntries(formData));


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