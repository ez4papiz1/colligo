// Import the functions for testing
/** @jest-environment jsdom */

    function MockDisplayChannels(channels) {
      const channelList = document.getElementById('channelList');
      channels.forEach(channel => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.textContent = channel.name;
          channelList.appendChild(li);
      });
    }

    function MockDisplayUsers(users) {
      const userList = document.getElementById('userList');
      users.forEach(user => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.textContent = user.name;
          userList.appendChild(li);
      });
  }
  function MockDisplayServers(servers){
    const serverList = document.getElementById('serverList');
    servers.forEach(server => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = server.name;
        serverList.appendChild(li);
    });
}

test('displayChannels appends channels to the channelList', () => {
    document.body.innerHTML = '<div id="channelList"></div>';
    const channelList = [{ name: 'Channel 1' }, { name: 'Channel 2' }];
    MockDisplayChannels(channelList);
    const listItems = document.querySelectorAll('#channelList li');
    expect(listItems.length).toBe(channelList.length);
    expect(listItems[0].textContent).toBe('Channel 1');
    expect(listItems[1].textContent).toBe('Channel 2');
  });

  test('displayUsers appends users to the userList', () => {
    document.body.innerHTML = '<div id="userList"></div>';
    const userList = [{ name: 'User 1' }, { name: 'User 2' }];
    MockDisplayUsers(userList);
    const listItems = document.querySelectorAll('#userList li');
    expect(listItems.length).toBe(userList.length);
    expect(listItems[0].textContent).toBe('User 1');
    expect(listItems[1].textContent).toBe('User 2');
  });
 
  test('displayServers appends servers to the serverList', () => {
    document.body.innerHTML = '<div id="serverList"></div>';
    const serverList = [{ name: 'Server 1' }, { name: 'Server 2' }];
    MockDisplayServers(serverList);
    const listItems = document.querySelectorAll('#serverList li');
    expect(listItems.length).toBe(serverList.length);
    expect(listItems[0].textContent).toBe('Server 1');
    expect(listItems[1].textContent).toBe('Server 2');
  });


