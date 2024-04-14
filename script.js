const tokenForm = document.getElementById('token-form');
const statusDisplay = document.getElementById('status-display');

const API_URL = 'https://www.spotify.com/api/email-verify/v1/verify';

tokenForm.addEventListener('submit', verifyToken)

async function verifyToken(event) {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
        let token = formData.get('token');

        if(token.includes('https')) {
            token = token.slice(token.lastIndexOf('=') + 1);
        }

        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        }).then(resp => resp.json())

        if(!response.success) {
            throw new Error("Something went wrong! Couldn't verify token")
        }

        updateStatus('Successfully verified!', true)
    } catch(error) {
        updateStatus(error.message, false)
    }
}

function updateStatus(text = '', success = false) {
    statusDisplay.textContent = text;
    statusDisplay.className = success ? 'text-success' : 'text-danger'
}