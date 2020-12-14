import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlsParser: true,
    useUnifiedTopology: true, 
});

export default async function connect() {
    // Caso não haja uma conexão com o banco de dados já existente, então, croia uma nova conexão
    if(!client.isConnected()) await client.connect();

    const db = client.db("projeto-jera");
    return { db, client };
}