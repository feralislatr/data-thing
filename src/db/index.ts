import { DataAPIClient } from '@datastax/astra-db-ts';

const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN ?? '');
const db = client.db(process.env.ASTRA_DB_API_ENDPOINT ?? '');

// let client: DataAPIClient | null = null;

// export default async function db() {
//   if (!client) {
//     client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN ?? '');
//     return client.db(process.env.ASTRA_DB_API_ENDPOINT ?? '');
//   }
// }

export default db;

// export default async function handler(req, res) {
//   if (!astraClient) {
//     astraClient = await createAstraClient({
//       astraDatabaseId: process.env.ASTRA_DB_ID,
//       astraDatabaseRegion: process.env.ASTRA_DB_REGION,
//       applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
//     });
//   }
//   // const keyspaces = await astraClient.schemas.getKeyspaces();
//   // res.status(200).json(keyspaces);
// }

// 'use server';

// import { DataAPIClient } from '@datastax/astra-db-ts';

// let client: DataAPIClient | null = null;
// let dbInstance: any = null;

// export default async function getDbConnection() {
//   if (!client || !dbInstance) {
//     if (!process.env.ASTRA_DB_APPLICATION_TOKEN || !process.env.ASTRA_DB_API_ENDPOINT) {
//       throw new Error('Missing required Astra DB environment variables');
//     }

//     client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
//     dbInstance = client.db(process.env.ASTRA_DB_API_ENDPOINT);
//   }

//   return dbInstance;
// }
