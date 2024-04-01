const { startCall, acceptCall } = require('./FrontEnd/JS/videoCall');

// Mock the navigator.mediaDevices.getUserMedia
global.navigator = {
  mediaDevices: {
    getUserMedia: async () => {
      console.log("getUserMedia called");
      return Promise.resolve("MockMediaStream");
    }
  }
};

// Mock for socket.emit
global.socket = {
  emit: (event, data) => {
    console.log(`Mock socket.emit called with event: ${event}, data: ${data}`);
  }
};

// Mock for document.getElementById
global.document = {
  getElementById: () => ({
    srcObject: null
  })
};

async function testStartCall() {
  try {
    await startCall();
    console.log("startCall executed successfully.");
  } catch (error) {
    console.error("startCall failed:", error);
  }
}

async function testAcceptCall() {
  try {
    await acceptCall();
    console.log("acceptCall executed successfully.");
  } catch (error) {
    console.error("acceptCall failed:", error);
  }
}

async function runTests() {
  await testStartCall();
  await testAcceptCall();
}

runTests();