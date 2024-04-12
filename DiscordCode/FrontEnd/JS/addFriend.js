document.addEventListener('DOMContentLoaded', async function() {
    const user = await getUser();
    await displayIncomingRequests('/fetchIncomingRequests', '#incomingRequests', user.uid);
    await displayOutgoingRequests('/fetchOutgoingRequests', '#outgoingRequests', user.uid);
});

async function getUser() {
    try {
        const response = await fetch('/getUser');
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error fetching current user');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function displayIncomingRequests(endpoint, containerId, uid) {
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const data = await response.json();
            const container = document.querySelector(containerId);
            if (Array.isArray(data.incomingRequests)) {
                data.incomingRequests.forEach(request => {
                    const requestElement = createRequestElement(request, uid);
                    container.appendChild(requestElement);
                });
            }
        } else {
            console.error(`Error fetching ${endpoint}`);
        }
    } catch (error) {
        console.error(error);
    }
}
async function displayOutgoingRequests(endpoint, containerId, uid) {
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const data = await response.json();
            const container = document.querySelector(containerId);
            if (Array.isArray(data.outgoingRequests)) {
                data.outgoingRequests.forEach(request => {
                    const requestElement = createRequestElement(request, uid);
                    container.appendChild(requestElement);
                });
            }
        } else {
            console.error(`Error fetching ${endpoint}`);
        }
    } catch (error) {
        console.error(error);
    }
}


function createRequestElement(request, uid) {
    const requestModule = document.createElement('div');
    requestModule.classList.add('friend_request_module');
    const usernameHeader = document.createElement('h4');
    usernameHeader.textContent = `${request.sendname}`;
    requestModule.appendChild(usernameHeader);
    if (request.recid == uid) {
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
    console.log(`Accepting request: recid=${recid}, sendid=${sendid}`);
    try {
        const response = await fetch('/acceptRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recid, sendid })
        });
        if (response.ok) {
            console.log(response);
        } else {
            console.error('Error accepting request');
        }
    } catch (error) {
        console.error(error);
    }
}

async function handleDeclineRequest(recid, sendid) {
    console.log(`Declining request: recid=${recid}, sendid=${sendid}`);
    try {
        const response = await fetch('/cancelRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recid, sendid })
        });
        if (response.ok) {
            console.log(response);
        } else {
            console.error('Error declining request');
        }
    } catch (error) {
        console.error(error);
    }
}

async function handleRemoveRequest(recid, sendid) {
    console.log(`Removing request: recid=${recid}, sendid=${sendid}`);
    try {
        const response = await fetch('/cancelRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recid, sendid })
        }).then(() => {
            window.location.reload();
        })
        if (response.ok) {
            console.log(response);
        } else {
            console.error('Error removing request');
        }
    } catch (error) {
        console.error(error);
    }
}

