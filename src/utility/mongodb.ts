import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB = process.env.MONGODB_DB!

let cachedDb: Db

const connectToDatabase = async () => {
  if (cachedDb) {
    return { db: cachedDb }
  }

  const opts: MongoClientOptions = {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
    retryWrites: true,
    retryReads: true,
    maxPoolSize: 10,
    minPoolSize: 5,
    maxIdleTimeMS: 60000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  }

  const client = await MongoClient.connect(MONGODB_URI, opts)

  const db = client.db(MONGODB_DB)

  cachedDb = db

  return { db }
}

export async function withMongo<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const conn = await connectToDatabase()
  return await fn(conn.db)
}
