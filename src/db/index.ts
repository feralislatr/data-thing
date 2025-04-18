import { DataAPIClient } from '@datastax/astra-db-ts';

const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN ?? '');
const db = client.db(process.env.ASTRA_DB_API_ENDPOINT ?? '');
// const data = db.collection('data_thing');

export default db;
// (async () => {
//   const colls = await db.listCollections();
//   console.log('Connected to AstraDB:', colls);
// })();
