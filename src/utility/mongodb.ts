import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB = process.env.MONGODB_DB!

let cachedDb: Db

const connectToDatabase = async () => {
  if (cachedDb) {
    return { db: cachedDb }
  }

  const opts: MongoClientOptions = {}
  const client = await MongoClient.connect(MONGODB_URI, opts)

  const db = client.db(MONGODB_DB)

  cachedDb = db

  return { db }
}

export async function withMongo<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const conn = await connectToDatabase()
  return await fn(conn.db)
}
