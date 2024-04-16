
document.addEventListener('DOMContentLoaded', function() {
        fetchServersAndGenerateButtons();
        let sid;
        var username = document.getElementById('userProfileButton').textContent;
        var modal = document.getElementById('createServerModal');
        var btn = document.getElementById('createServerButton');
        var spanServer = document.getElementsByClassName("close")[0];
        btn.onclick = function() {
            modal.style.display = "block";
        }
        spanServer.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        var chanmodal = document.getElementById('createChannelModal');
        var chanbtn = document.getElementById('createChannelButton');
        var chanspan = document.getElementsByClassName("close")[1];
        chanbtn.onclick = function() {
            chanmodal.style.display = "block";
        };
        chanspan.onclick = function() {
            chanmodal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target == chanmodal) {
                chanmodal.style.display = "none";
            }
        };
        const userProfileButton = document.getElementById('userProfileButton');
        userProfileButton.addEventListener('click', function() {
            window.location.href = '/AccountSettings';
        });
        const findServerButton = document.getElementById('FindServerButton');
        findServerButton.addEventListener('click', function() {
            window.location.href = '/searchServer';
        });
        const FriendButton = document.getElementById('FriendsButton');
        FriendButton.addEventListener('click', function() {
            window.location.href = '/friendpage';
        });

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
                            selectServer(server.sid); 
                        };
                        const isAdmin = server.admins.includes(username);
                        if (isAdmin) {
                            console.log("admin")
                            const adminSettingsButton = document.createElement('button');
                            adminSettingsButton.className = 'admin btn btn-primary';
                            adminSettingsButton.textContent = 'Admin Settings';
                            adminSettingsButton.onclick = () => {
                            window.location.href = `/adminSettings?serverId=${server.sid}`;
                        };
                        listItem.appendChild(adminSettingsButton);
                    } else {
                        console.log("not an admin")
                    }
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
            sid = serverId;
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
                    }
                })
                .catch(error => console.error('Failed to fetch server data:', error));
        } 
        var socket = io();
        const joinVoiceChannelButton = document.getElementById('joinVoiceChannelButton');
        joinVoiceChannelButton.addEventListener('click', () => {
            socket.emit('join-voice-channel', { serverId: currentServer});
            window.location.href = `/voice-call/${currentServer}`;
        });

        socket.on('connection', function() {
            console.log('Connected to server');
        });
        socket.on('receive-message', (message) => {
            displayMessage(message, 'artem');
        });
        const messageForm = document.getElementById('messageForm');
        const messageInput = document.getElementById('messageInput');
        function displayMessages(messages) {
            const messageList = document.getElementById('messageDisplayArea');
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerText = message;
                messageList.appendChild(messageElement);
            });
        }
        function displayMessage(message, user) {
            const messageList = document.getElementById('messageDisplayArea');
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `<strong>${user}</strong>: ${message}`;
            messageList.appendChild(messageElement);
        }

        function displayChannels(channels) {
            const channelList = document.querySelector('#channelList .list-group');
            channelList.innerHTML = '';
            for (let i = 0; i < channels.length; i++) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = channels[i];
                li.setAttribute('data-channel-name', channels[i]); 
                li.addEventListener('click', function() {
                    currentChannel = this.getAttribute('data-channel-name');
                    clearMessages();
                    console.log('Selected channel:', currentChannel);
                    socket.emit('channelSelected', { serverId: sid, channelName: currentChannel });
                });
                channelList.appendChild(li);
            }
        }
        socket.on('channelMessages', function(messages) {
            console.log('Received messages:', messages);
            displayMessages(messages);
        });
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            socket.emit('send-message', { message: messageInput.value, channelName: currentChannel, serverId: currentServer });
            displayMessage(messageInput.value, username);
            messageInput.value = '';
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
        
    });

