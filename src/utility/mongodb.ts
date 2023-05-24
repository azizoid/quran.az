declare global {
  var mongo: any
}

import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB = process.env.MONGODB_DB!

if (!global.mongo) {
  global.mongo = { conn: null, promise: null }
}

const connectToDatabase = async () => {
  if (global.mongo.conn) {
    return global.mongo.conn
  }

  if (!global.mongo.promise) {
    const opts: MongoClientOptions = {}
    global.mongo.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
  }
  global.mongo.conn = await global.mongo.promise
  return global.mongo.conn
}

export async function withMongo<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const conn = await connectToDatabase()
  return await fn(conn.db)
}