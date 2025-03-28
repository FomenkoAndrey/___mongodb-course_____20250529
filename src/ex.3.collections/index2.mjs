import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI)
  const dbName = process.env.DB_NAME

  try {
    await client.connect()
    console.log('Connected to Database')

    const db = client.db(dbName)

    let existingCollections = (await db.listCollections().toArray()).map((c) => c.name)
    console.log('Existing collections:', existingCollections)

    if (!existingCollections.includes('customers')) {
      await db.createCollection('customers')
      console.log('Collection "customers" created')
    }

    if (!existingCollections.includes('scores')) {
      await db.createCollection('scores')
      console.log('Collection "scores" created')
    }

    existingCollections = (await db.listCollections().toArray()).map((c) => c.name)
    console.log('Collections after actions:', existingCollections)
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()
