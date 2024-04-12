const socket = io();
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
let localStream;
let peerConnection;
let currentCallRoom;

// Function to create the peer connection
function createPeerConnection() {
    const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };
    peerConnection = new RTCPeerConnection(configuration);

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Add event listeners for peer connection
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            socket.emit('candidate', { candidate: event.candidate, room: currentCallRoom });
        }
    };
    peerConnection.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };
    peerConnection.oniceconnectionstatechange = event => {
        if (peerConnection.iceConnectionState === 'disconnected') {
            console.log('Disconnected');
        }
    };
}

function initiateCall(friendUid) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            localVideo.srcObject = stream;
            localStream = stream;
            currentCallRoom = 'callRoom-' + friendUid + '-' + Date.now();
            socket.emit('create-room', { room: currentCallRoom });
        }).catch(error => {
            console.error('Error accessing media devices:', error);
        });
}

socket.on('room-joined', setupPeerConnection);

socket.on('join-room', (data) => {
    currentCallRoom = data.room;
    createPeerConnection();
});

socket.on('offer', (data) => {
    if (!peerConnection) {
        createPeerConnection();
    }
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))
        .then(() => peerConnection.createAnswer())
        .then(answer => {
            peerConnection.setLocalDescription(answer);
            socket.emit('answer', { answer: answer, room: currentCallRoom });
        });
});

socket.on('answer', (data) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
});

socket.on('candidate', (data) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
});

function setupPeerConnection(data) {
    console.log('Joined room:', data.room);
    if (!peerConnection) {
        createPeerConnection();
    }
}

// Handle button click event to initiate call
document.getElementById('callButton').addEventListener('click', () => {
    const friendUid = req.friend.uid; // Replace with the actual friend UID
    initiateCall(friendUid);
});
