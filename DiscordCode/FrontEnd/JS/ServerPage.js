document.addEventListener('DOMContentLoaded', function() {
    //fetch channel ata
    function fetchChannels() {
        fetch('temp') //Awaiting Back-End creation for channels Data
            .then(response => response.json())
            .then(data => displayChannels(data)); //Temp data until back-end is created
    }
    //display channel data
    function displayChannels(channels) {
        const channelList = document.getElementById('channelList');
        channels.forEach(channel => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = channel.name;
            channelList.appendChild(li);
        });
    }
    //fetch user data
    function fetchUsers() {
        fetch('temp') //Awaiting Back-End creation for users Data
            .then(response => response.json())
            .then(data => displayUsers(data)); //Temp data until back-end is created
    }
    //display user data
    function displayUsers(users) {
        const userList = document.getElementById('userList');
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = user.name;
            userList.appendChild(li);
        });
    }
    //fetch server datta
    function fetchServers(){
        fetch('temp') //Awaiting Back-End creation for server Data
            .then(response => response.json())
            .then(data => displayServers(data)); //Temp data until back-end is created
    }
    //display channel data
    function displayServers(servers){
        const serverList = document.getElementById('serverList');
        servers.forEach(server => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = server.name;
            serverList.appendChild(li);
        });
    }
});


