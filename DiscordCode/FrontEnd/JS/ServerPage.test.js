// Import the functions for testing
import { fetchChannels, displayChannels, fetchUsers, displayUsers, fetchServers, displayServers } from './ServerPage';

  test('fetchChannels calls fetch and displayChannels with the correct URL', async () => {
    await fetchChannels();
    expect(fetch).toHaveBeenCalledWith('temp'); //awaiting back-end creation for channels data
  });
  test('displayChannels appends channels to the channelList', () => {
    const channelList = [{ name: 'Channel 1' }, { name: 'Channel 2' }];
    displayChannels(channelList);
    expect(document.getElementById).toHaveBeenCalledWith('channelList');
    expect(document.getElementById().appendChild).toHaveBeenCalledTimes(channelList.length);
  });

  test('fetchUsers calls fetch and displayUsers with the correct URL', async () => {
    await fetchUsers();
    expect(fetch).toHaveBeenCalledWith('temp'); //awaiting back-end creation for users data
  });

  test('displayUsers appends users to the userList', () => {
    const userList = [{ name: 'User 1' }, { name: 'User 2' }];
    displayUsers(userList);
    expect(document.getElementById).toHaveBeenCalledWith('userList');
    expect(document.getElementById().appendChild).toHaveBeenCalledTimes(userList.length);
  });

  test('fetchServers calls fetch and displayServers with the correct URL', async () => {
    await fetchServers();
    expect(fetch).toHaveBeenCalledWith('temp'); //awaiting back-end creation for server data
  });
  test('displayServers appends servers to the serverList', () => {
    const serverList = [{ name: 'Server 1' }, { name: 'Server 2' }];
    displayServers(serverList);
    expect(document.getElementById).toHaveBeenCalledWith('serverList');
    expect(document.getElementById().appendChild).toHaveBeenCalledTimes(serverList.length);
  });

