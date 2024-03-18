
document.addEventListener('DOMContentLoaded', function() {
        function fetchData() {
            console.log('Fetching data...');
            fetch('http://localhost:3000/fetchServerData') // Use the correct endpoint for server data
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        const serverData = data[0]; // Taking the first server object from the array
                        displayChannels(serverData.channels);
                        displayMembers(serverData.members);
                        displayMessages(serverData.messages);
                    }
                });
                
        }
        function displayChannels(channels) {
            const channelList = document.getElementById('channelList');
            channelList.innerHTML = '';
            for (let i = 0; i < channels.length; i++) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = channels[i];
                channelList.appendChild(li);
            }
        }
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
                const messageList = document.getElementById('messageList');
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerText = messages[i];
                messageList.appendChild(messageElement);
            }
        }
        fetchData();
    });

