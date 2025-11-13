import { createClient } from "redis";

const client = createClient();

await client.connect();

client.on("error",(err) => console.log('Error connecting ot redis client',err));
client.on("connect",() => console.log('Connected to Redis Client'));
client.on("reconnecting",()=> console.log('Reconnecting to Redis Client'));

export default client;