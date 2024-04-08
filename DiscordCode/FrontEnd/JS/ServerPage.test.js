// Import the functions for testing
/** @jest-environment jsdom */

    function MockSisplayMessage2(message, user) {
      const messageList = document.getElementById('messageDisplayArea');
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.innerHTML = `<strong>${user}</strong>: ${message}`;
      messageList.appendChild(messageElement);
    }
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
  function MockfetchServersAndGenerateButtons() {
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
  function MockDisplayServers(servers){
    const serverList = document.getElementById('serverList');
    servers.forEach(server => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = server.name;
        serverList.appendChild(li);
    });
  }
  function mockClearMessages() {
    const messageDisplayArea = document.getElementById('messageDisplayArea');
    if (messageDisplayArea) {
        messageDisplayArea.innerHTML = '';
    }
  }
  let currentServer = ''; 
  let currentChannel = '';
  function MockselectServer(serverId) {
      currentServer = serverId; 
      currentChannel = ''; 
      mockClearMessages();
      //MockFetch(serverId);
  }
  test('MockSelectServer sets currentServer and currentChannel', () => {
    MockselectServer('660b196ff1e5954cd22ea264');
    expect(currentServer).toBe('660b196ff1e5954cd22ea264');
    expect(currentChannel).toBe('');
  });
  test('clearMessages clears the messageDisplayArea', () => {
    document.body.innerHTML = '<div id="messageDisplayArea">Hello</div>';
    mockClearMessages();
    const messageDisplayArea = document.getElementById('messageDisplayArea');
    expect(messageDisplayArea.innerHTML).toBe('');
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

  test('displayMessage appends a message to the messageDisplayArea', () => {
    document.body.innerHTML = '<div id="messageDisplayArea"></div>';
    MockSisplayMessage2('Hello', 'User');
    const messageElement = document.querySelector('#messageDisplayArea div');
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toBe('User: Hello');
  });
  const socket = { emit: jest.fn() };

  describe('messageForm submit event with displayMessage', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <form id="messageForm">
          <input id="messageInput" />
        </form>
        <div id="messageDisplayArea"></div>
      `;
      socket.emit.mockClear();
      currentChannel = 'General'; 
  
      const messageForm = document.getElementById('messageForm');
      const messageInput = document.getElementById('messageInput');
      messageInput.value = 'Hello World';
  
      messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        socket.emit('send-message', { message: messageInput.value, channelName: currentChannel, serverId: 1 });
        const messageList = document.getElementById('messageDisplayArea');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>You</strong>: ${messageInput.value}`;
        messageList.appendChild(messageElement);
      });
    });
  
    test('message is added to the DOM on form submit, and socket.emit is called with correct parameters', () => {
      const form = document.getElementById('messageForm');
      const submitEvent = new Event('submit');
      form.dispatchEvent(submitEvent);
      const messageList = document.getElementById('messageDisplayArea');
      expect(messageList.children.length).toBe(1); 
      expect(messageList.innerHTML).toContain('<strong>You</strong>: Hello World'); 
      expect(socket.emit).toHaveBeenCalledWith('send-message', {
        message: 'Hello World',
        channelName: currentChannel,
        serverId: 1,
      });
    });
  });
  
  




