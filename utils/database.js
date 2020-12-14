import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlsParser: true,
    useUnifiedTopology: true, 
});

async function connect() {
    await client.connect();
}