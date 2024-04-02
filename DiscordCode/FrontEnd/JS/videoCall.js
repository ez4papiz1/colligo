const socket = io();
let localStream;
let remoteStream;
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

document.getElementById('startCallButton').addEventListener('click', startCall);
document.getElementById('acceptCallButton').addEventListener('click', acceptCall);

socket.on('incoming-call', ({ from }) => {
    
    // show notification to inform the user
    if (confirm(`Incoming call from ${from}. Do you want to accept?`)) {
        acceptCall();
    }
});

socket.on('call-accepted', () => {
    startMedia();
});

async function startCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
        socket.emit('start-call');
    } catch (err) {
        console.error('Error accessing media devices:', err);
    }
}

async function acceptCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
        socket.emit('accept-call');
    } catch (err) {
        console.error('Error accessing media devices:', err);
    }
}