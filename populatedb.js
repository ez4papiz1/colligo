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

async function createServerData(sid, name,channels, members) {
    const serverdata = { sid, name, channels, members};
    const newServerData = new ServerData(serverdata);
    await newServerData.save();
    console.log('ServerData created');
}
async function populateServerData() {
    console.log('populating server data');
    await Promise.all([
        createServerData(1, 'TestServerJordan', [{name: 'General', messages: ['Hello']}], ['Jordan'], ['Hello']),
    ]);
}