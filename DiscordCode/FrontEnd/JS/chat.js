const socket = io();
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
let localStream;
let peerConnection;
let currentCallRoom;

// Function to create the peer connection
function createPeerConnection() {
    console.log('Creating peer connection...');
    const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };
    peerConnection = new RTCPeerConnection(configuration);

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Add event listener for ICE candidates
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            console.log('Sending ICE candidate...');
            socket.emit('candidate', { candidate: event.candidate, room: currentCallRoom });
        }
    };

    // Add event listener for incoming streams
    peerConnection.ontrack = event => {
        console.log('Received remote stream.');
        remoteVideo.srcObject = event.streams[0];
    };

    // Add event listener for ICE connection state change
    peerConnection.oniceconnectionstatechange = event => {
        console.log('ICE connection state change:', peerConnection.iceConnectionState);
        if (peerConnection.iceConnectionState === 'disconnected') {
            console.log('Disconnected');
        }
    };
}

// Function to handle received ICE candidates
function handleIceCandidate(candidate) {
    console.log('Received ICE candidate:', candidate);
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        .then(() => {
            console.log('ICE candidate added successfully.');
        })
        .catch(error => {
            console.error('Error adding ICE candidate:', error);
        });
}


function initiateCall(friendName) {
    console.log('Initiating call...');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            console.log('Local stream obtained.');
            localVideo.srcObject = stream;
            localStream = stream;
        }).catch(error => {
            console.error('Error accessing media devices:', error);
        });

    currentCallRoom = 'callRoom-' + friendName + '-' + Date.now();
    console.log('Creating room:', currentCallRoom);
    socket.emit('create-room', { room: currentCallRoom });
    createPeerConnection();
}

socket.on('connect', () => {
    console.log('Socket connected.');
});

socket.on('room-joined', setupPeerConnection);
socket.on('join-room', (data) => {
    console.log('Joined room:', data.room);
    currentCallRoom = data.room;
    createPeerConnection();
});
socket.on('room-joined', () => {
    console.log('Room joined:', currentCallRoom);
    peerConnection.createOffer()
        .then(offer => {
            console.log('Creating offer...');
            return peerConnection.setLocalDescription(offer);
        })
        .then(() => {
            console.log('Sending offer...');
            socket.emit('offer', { offer: peerConnection.localDescription, room: currentCallRoom });
        })
        .catch(error => {
            console.error('Error creating offer:', error);
        });
});

function setupPeerConnection(data) {
    console.log('Peer connection setup for room:', data.room);
}

socket.on('offer', (data) => {
    console.log('Received offer:', data.offer);
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))
        .then(() => peerConnection.createAnswer())
        .then(answer => {
            console.log('Creating answer...');
            peerConnection.setLocalDescription(answer);
            socket.emit('answer', { answer: answer, room: currentCallRoom });
        });
});

socket.on('answer', (data) => {
    console.log('Received answer:', data.answer);
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
});

socket.on('candidate', (data) => {
    console.log('Received ICE candidate:', data.candidate);
    peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
});
