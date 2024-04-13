document.addEventListener('DOMContentLoaded', async function() {
    try {
        const serverName = getServerNameFromQuery();
        const servers = await fetchServers(serverName);
        displayServers(servers);
    } catch (error) {
        console.error(error);
    }
});

function getServerNameFromQuery() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('serverName');
}

async function fetchServers(serverName) {
    try {
        const response = await fetch(`/searchResults?serverName=${serverName}`);
        if (response.ok) {
            const data = await response.json();
            return data.servers;
        } else {
            throw new Error('Error fetching servers');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function displayServers(servers) {
    const container = document.querySelector('#list-group');
    if (!servers || servers.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No servers found.';
        container.appendChild(noResultsMessage);
    } else {
        servers.forEach(server => {
            const serverNameElement = document.createElement('p');
            serverNameElement.textContent = server.name;
            container.appendChild(serverNameElement);
        });
    }
}

async function createServerItem(server) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    
    const serverNameElement = document.createElement('span');
    serverNameElement.textContent = server.name;
    listItem.appendChild(serverNameElement);

    const joinButton = document.createElement('button');
    joinButton.classList.add('btn', 'btn-join');
    joinButton.textContent = 'Join';
    joinButton.addEventListener('click', () => joinServer(server._id));
    listItem.appendChild(joinButton);

    return listItem;
}

async function joinServer(serverId) {
    try {
    } catch (error) {
        console.error(error);
    }
}