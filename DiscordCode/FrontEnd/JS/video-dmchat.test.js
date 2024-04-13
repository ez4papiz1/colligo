const { initiateCall, setupPeerConnection } = require('./chat.js');
const io = require('socket.io-client');

// Mock getUserMedia and RTCPeerConnection
jest.mock('./utils', () => ({
    getUserMedia: jest.fn(() => Promise.resolve({})),
}));
jest.mock('socket.io-client');

describe('WebRTC functionality', () => {
    let localVideo, remoteVideo, localStream, peerConnection, currentCallRoom;

    beforeEach(() => {
        // Reset state before each test
        localVideo = document.createElement('video');
        remoteVideo = document.createElement('video');
        localStream = null;
        peerConnection = null;
        currentCallRoom = null;

        // Mock socket.io client
        io.mockReturnValue({
            on: jest.fn(),
            emit: jest.fn(),
        });

        // Mock DOM elements
        global.document.getElementById = jest.fn(id => {
            if (id === 'localVideo') return localVideo;
            if (id === 'remoteVideo') return remoteVideo;
            if (id === 'callButton') {
                return {
                    addEventListener: jest.fn(),
                };
            }
            return null;
        });
    });

    test('Initiate call button click initiates getUserMedia and emits create-room event', async () => {
        const friendUid = 'friendUid';
        await initiateCall(friendUid);

        expect(localVideo.srcObject).toBeDefined();
        expect(io().emit).toHaveBeenCalledWith('create-room', expect.any(Object));
    });

    test('Socket event "room-joined" calls setupPeerConnection', () => {
        const data = { room: 'room-123' };
        setupPeerConnection(data);

        expect(console.log).toHaveBeenCalledWith('Joined room:', data.room);
        expect(peerConnection).toBeDefined();
    });
});