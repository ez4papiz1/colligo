
document.addEventListener('DOMContentLoaded', function() {
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

        function fetchData() {
            console.log('Fetching data...');
            fetch('http://localhost:3000/fetchServerData') // Use the correct endpoint for server data
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        const serverData = data[0]; // Taking the first server object from the array
                        const channelNames = serverData.channels.map(channel => channel.name);
                        displayChannels(channelNames);
                        displayMembers(serverData.members);
                        displayMessages(serverData.channels[0].messages);
                    }
                });
                
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
        let currentChannel = '';
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
                    socket.emit('channelSelected', currentChannel); 
                    document.getElementById('messageDisplayArea').innerHTML = ''; 
                });
                channelList.appendChild(li);
            }
        }
        socket.on('channelMessages', function(messages) {
            displayMessages(messages);
        });
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            socket.emit('send-message', { message: messageInput.value, channelName: currentChannel, serverId: 1 });
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
        fetchData();
    });

