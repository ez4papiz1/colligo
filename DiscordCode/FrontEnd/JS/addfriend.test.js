const {
    getUser,
    displayIncomingRequests,
    displayOutgoingRequests,
    handleAcceptRequest,
    handleDeclineRequest,
    handleRemoveRequest,
  } = require('./addFriend.js');
  
  describe('getUser function', () => {
    it('should return user data', async () => {
      const user = await getUser();
      expect(user).toBeDefined();
    });
  });
  
  describe('displayIncomingRequests function', () => {
    it('should display incoming requests', async () => {
      await displayIncomingRequests('/fetchIncomingRequests', '#incomingRequests', '123');
      expect(document.querySelector('.friend_request_module')).toBeDefined();
    });
  });
  
  describe('displayOutgoingRequests function', () => {
    it('should display outgoing requests', async () => {
      await displayOutgoingRequests('/fetchOutgoingRequests', '#outgoingRequests', '123');
      expect(document.querySelector('.friend_request_module')).toBeDefined();
    });
  });
  
  describe('handleAcceptRequest function', () => {
    it('should handle accepting request', async () => {
      const response = await handleAcceptRequest('123', '456');
      expect(response).toBeDefined();
    });
  });
  
  describe('handleDeclineRequest function', () => {
    it('should handle declining request', async () => {
      const response = await handleDeclineRequest('123', '456');
      expect(response).toBeDefined();
    });
  });
  describe('handleRemoveRequest function', () => {
    it('should handle removing request', async () => {
      const response = await handleRemoveRequest('123', '456');
      expect(response).toBeDefined();
    });
  });
  
  
