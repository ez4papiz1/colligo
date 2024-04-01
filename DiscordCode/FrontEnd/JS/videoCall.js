const myVideo = document.getElementById('my-video');
const userVideo = document.getElementById('user-video');
const calleeEmailInput = document.getElementById('callee-email'); 
const callBtn = document.getElementById('call-btn');
let myVideoStream;
let peer;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, myVideoStream);

  peer = new Peer(undefined, {
    host: '/',
    path: '/peerjs/myapp',
    port: location.port || (location.protocol === 'https:' ? 443 : 80),
  });

  peer.on('open', id => {
    console.log('My peer ID is: ', id);
  });

  peer.on('call', call => {
    call.answer(stream); // Answer the call with stream.
    call.on('stream', userStream => {
      addVideoStream(userVideo, userStream);
    });
  });

  // Listen for click on the 'Call' button to initiate the call
  callBtn.addEventListener('click', () => {
    const calleeEmail = calleeEmailInput.value; // Get callee's email from the input field
    if(calleeEmail) {
      // Make a POST request to the server to initiate the call
      fetch('/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ calleeEmail }), // Send callee's email in the request body
      })
      .then(response => {
        if(response.ok) {
          console.log('Call initiated successfully');
        } else {
          console.error('Failed to initiate call:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error initiating call:', error);
      });
    } else {
      alert('Please enter callee\'s email.');
    }
  });
});

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
}
