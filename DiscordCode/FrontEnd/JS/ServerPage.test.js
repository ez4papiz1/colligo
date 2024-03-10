// Import the functions for testing
const {displayChannels,displayUsers,displayServers } = require('./ServerPage');
  test('displayChannels appends channels to the channelList', () => {
    const channelList = [{ name: 'Channel 1' }, { name: 'Channel 2' }];
    displayChannels(channelList);
    expect(document.getElementById).toHaveBeenCalledWith('channelList');
    expect(document.getElementById().appendChild).toHaveBeenCalledTimes(channelList.length);
  });
  test('displayUsers appends users to the userList', () => {
    const userList = [{ name: 'User 1' }, { name: 'User 2' }];
    displayUsers(userList);
    expect(document.getElementById).toHaveBeenCalledWith('userList');
    expect(document.getElementById().appendChild).toHaveBeenCalledTimes(userList.length);
  });
  test('displayServers appends servers to the serverList', () => {
    const serverList = [{ name: 'Server 1' }, { name: 'Server 2' }];
    displayServers(serverList);
    expect(document.getElementById).toHaveBeenCalledWith('serverList');
    expect(document.getElementById().appendChild).toHaveBeenCalledTimes(serverList.length);
  });

