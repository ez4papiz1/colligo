const ServerData = require('./DiscordCode/BackEnd/routes/Models/ServerData');
const User = require('./DiscordCode/BackEnd/routes/Models/Usermodel');
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);



async function main() {
    console.log("Debug: Populating database");
    await mongoose.connect('mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo');
    await populateServerData();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}
async function createUser(uid, name, email, password) {
    const user = new User({ uid, name, email, password });
    await user.save();
    return user; 

}
async function createServerData(sid, name, channels, memberIds) {
    const serverdata = { sid, name, channels, members: memberIds };
    const newServerData = new ServerData(serverdata);
    await newServerData.save();
    console.log('ServerData created');
    return newServerData; 
}

async function populateServerData() {
    console.log('populating server data');
    const userJordan = await createUser(1, 'Jordan', 'jordan@example.com', 'password123');
    const newServerData = await createServerData(1, 'TestServerJordan', [{name: 'General', messages: ['Hello']}], [userJordan._id]);
    const newServerData2 = await createServerData(2, 'TestServerJordan2', [{name: 'General', messages: ['Hello']}], [userJordan._id]);
    userJordan.servers.push(newServerData._id);
    userJordan.servers.push(newServerData2._id);
    await userJordan.save();
}
main().catch(console.error);