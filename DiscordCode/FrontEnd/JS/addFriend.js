document.addEventListener('DOMContentLoaded', async function() {
    await displayFriendRequests('/incomingRequests', '#incomingRequests');
    await displayFriendRequests('/outgoingRequests', '#outgoingRequests');
});

async function displayFriendRequests(endpoint, containerId) {
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const data = await response.json();
            const container = document.querySelector(containerId);
            container.innerHTML = ''; // Clear the container before appending new requests
            data.forEach(request => {
                const requestElement = createRequestElement(request);
                container.appendChild(requestElement);
            });
        } else {
            console.error(`Error fetching ${endpoint}`);
        }
    } catch (error) {
        console.error(error);
    }
}

function createRequestElement(request) {
    const requestModule = document.createElement('div');
    requestModule.classList.add('friend_request_module');

    const usernameHeader = document.createElement('h4');
    usernameHeader.textContent = `User ${request.recid}`;
    requestModule.appendChild(usernameHeader);

    if (request.accepted === false) {
        const acceptButton = document.createElement('button');
        acceptButton.classList.add('btn', 'btn-primary');
        acceptButton.textContent = 'Accept';
        acceptButton.addEventListener('click', async () => await handleAcceptRequest(request.recid, request.sendid));
        requestModule.appendChild(acceptButton);

        const declineButton = document.createElement('button');
        declineButton.classList.add('btn', 'btn-danger');
        declineButton.textContent = 'Decline';
        declineButton.addEventListener('click', async () => await handleDeclineRequest(request.recid, request.sendid));
        requestModule.appendChild(declineButton);
    } else {
        const removeButton = document.createElement('button');
        removeButton.classList.add('btn', 'btn-remove');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', async () => await handleRemoveRequest(request.recid, request.sendid));
        requestModule.appendChild(removeButton);
    }

    return requestModule;
}

async function handleAcceptRequest(recid, sendid) {
    try {
        const response = await fetch('/acceptRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recid, sendid })
        });
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Error accepting request');
        }
    } catch (error) {
        console.error(error);
    }
}

async function handleDeclineRequest(recid, sendid) {
    try {
        const response = await fetch('/declineRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recid, sendid })
        });
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Error declining request');
        }
    } catch (error) {
        console.error(error);
    }
}

async function handleRemoveRequest(recid, sendid) {
    try {
        const response = await fetch('/cancelRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recid, sendid })
        });
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Error removing request');
        }
    } catch (error) {
        console.error(error);
    }
}
