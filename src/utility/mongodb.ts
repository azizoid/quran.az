import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB = process.env.MONGODB_DB!

let cachedDb: Db

const connectToDatabase = async () => {
  try {
    if (cachedDb) {
      return { db: cachedDb }
    }

    const opts: MongoClientOptions = {}
    const client = await MongoClient.connect(MONGODB_URI, opts)

    const db = client.db(MONGODB_DB)

    cachedDb = db

    return { db }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to database:', error)
    throw error // Re-throw the error if you want it to propagate
  }
}

export async function withMongo<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  try {
    const conn = await connectToDatabase()
    return await fn(conn.db)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in withMongo function:', error)
    throw error // Re-throw the error if you want it to propagate
  }
}
