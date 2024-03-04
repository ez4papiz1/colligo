const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://rdecrewe:U8cRVjYPUZWrDaoK@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo";
    const client = new MongoClient(uri);
    try {
        await client.connect();

        await listDatabases(client);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}