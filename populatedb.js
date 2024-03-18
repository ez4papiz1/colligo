const ServerData = require('./DiscordCode/BackEnd/routes/Models/ServerData');
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));


const serverdata = []

async function main(){
    console.log("Debug: Populating database");
    await mongoose.connect('mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo');
    await populateServerData();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function createServerData(sid, name,channels, members,messages) {
    const serverdata ={sid: sid, name: name, channels: channels, members: members, messages: messages};
    const newServerData = new ServerData(serverdata);
    await newServerData.save();
    console.log('ServerData created');
}
async function populateServerData() {
    console.log('populating server data');
    await Promise.all([
        createServerData(99, 'TestServerJordan', ['TestChannel1', 'TestChannel2','TestChannel3', 'TestChannel4'], ['member1', 'member2', 'member3','member4'], ['This is a test Message', 'This message is meant for testing'])
    ]);
}