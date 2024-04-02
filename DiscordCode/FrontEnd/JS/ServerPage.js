
document.addEventListener('DOMContentLoaded', function() {
        fetchServersAndGenerateButtons();
        var modal = document.getElementById('createServerModal');
        var btn = document.getElementById('createServerButton');
        var span = document.getElementsByClassName("close")[0];
        btn.onclick = function() {
            modal.style.display = "block";
        }
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        var chanmodal = document.getElementById('createChannelModal');
        var chanbtn = document.getElementById('createChannelButton');
        var span = document.getElementsByClassName("close")[0];
        chanbtn.onclick = function() {
            chanmodal.style.display = "block";
        }
        span.onclick = function() {
            chanmodal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == chanmodal) {
                chanmodal.style.display = "none";
            }
        } 
        function fetchServersAndGenerateButtons() {
            console.log('Fetching server data...');
            fetch('http://localhost:3000/fetchUserServers') 
                .then(response => response.json())
                .then(servers => {
                    console.log('Servers:', servers);
                    const serverList = document.querySelector('#serverList ul.list-group');
                    serverList.innerHTML = ''; 
        
                    servers.forEach(server => {
                        const listItem = document.createElement('li');
                        listItem.className = 'list-group-item py-2';
                        listItem.textContent = server.name; 
                        listItem.onclick = () => {
                            selectServer(server._id); 
                        };
                        serverList.appendChild(listItem); 
                    });
                })
                .catch(error => console.error('Failed to load servers:', error));
        }
        function clearMessages() {
            const messageDisplayArea = document.getElementById('messageDisplayArea');
            if (messageDisplayArea) {
                messageDisplayArea.innerHTML = '';
            }
        }
        let currentServer = ''; 
        let currentChannel = '';
        function selectServer(serverId) {
            currentServer = serverId; 
            currentChannel = ''; 
            clearMessages();
            fetchData(serverId);
        }
        function fetchData(serverId) {
            console.log(`Fetching data for server ${serverId}...`);
            const url = `http://localhost:3000/fetchServerData/${serverId}`; 
            
            fetch(url)
                .then(response => response.json())
                .then(serverData => {
                    if (serverData) {
                        const channelNames = serverData.channels.map(channel => channel.name);
                        displayChannels(channelNames);
                        displayMembers(serverData.members);
                        displayMessages(serverData.channels[0].messages); 
                    }
                })
                .catch(error => console.error('Failed to fetch server data:', error));
        } 
        var socket = io();
        socket.on('connection', function() {
            console.log('Connected to server');
        });
        socket.on('receive-message', (message) => {
            displayMessage(message, 'OtherUser');
        });
        const messageForm = document.getElementById('messageForm');
        const messageInput = document.getElementById('messageInput');

        function displayMessage(message, user) {
            const messageList = document.getElementById('messageDisplayArea');
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `<strong>${user}</strong>: ${message}`;
            messageList.appendChild(messageElement);
        }
        function displayChannels(channels) {
            const channelList = document.querySelector('#channelList .list-group');
            const title = document.querySelector('.channel-title');
            channelList.innerHTML = '';
            for (let i = 0; i < channels.length; i++) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = channels[i];
                li.setAttribute('data-channel-name', channels[i]); 
                li.addEventListener('click', function() {
                    currentChannel = this.getAttribute('data-channel-name');
                    title.innerHTML = 'Channel: ' + currentChannel;
                    clearMessages();
                    socket.emit('channelSelected', { serverId: currentServer, channelName: currentChannel }); 
                });
                channelList.appendChild(li);
            }
        }
        socket.on('channelMessages', function(messages) {
            displayMessages(messages);
        });
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            socket.emit('send-message', { message: messageInput.value, channelName: currentChannel, serverId: currentServer });
            displayMessage(messageInput.value, 'You');
        });
        function displayMembers(members) {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            for (let i = 0; i < members.length; i++) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = members[i];
                userList.appendChild(li);
            }
        }
        function displayMessages(messages) {
            for (let i = 0; i < messages.length; i++) {
                const messageList = document.getElementById('messageDisplayArea');
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerText = messages[i];
                messageList.appendChild(messageElement);
            }
        } 
    });

