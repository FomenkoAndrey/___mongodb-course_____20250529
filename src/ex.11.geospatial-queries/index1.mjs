import { MongoClient, ObjectId } from 'mongodb'
import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config()

async function loadData(collectionName, fileName) {
  const client = new MongoClient(process.env.MONGODB_URI)
  const dbName = process.env.DB_NAME

  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const collections = await db.listCollections({}, { nameOnly: true }).toArray()
    const collectionExists = collections.some((col) => col.name === collectionName)
    if (collectionExists) {
      await db.collection(collectionName).drop()
      console.log(chalk.redBright(`Collection "${collectionName}" has been dropped.`))
    }

    const data = await readFile(fileName, 'utf8')
    const documents = data
      .split('\n')
      .filter((doc) => doc)
      .map(JSON.parse)
      .map((doc) => {
        if (doc._id && doc._id.$oid) {
          doc._id = new ObjectId(doc._id.$oid)
        }
        return doc
      })

    await collection.insertMany(documents)
    console.log(chalk.greenBright(`Data from ${fileName} loaded into collection ${collectionName}`))

    if (collectionName === 'restaurants') {
      await collection.createIndex({ location: '2dsphere' })
      console.log(chalk.magentaBright('2dsphere index created for "location" in "restaurants" collection.'))
    } else if (collectionName === 'neighborhoods') {
      await collection.createIndex({ geometry: '2dsphere' })
      console.log(chalk.magentaBright('2dsphere index created for "geometry" in "neighborhoods" collection.'))
    }
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    await client.close()
  }
}

loadData('restaurants', 'src/json/restaurants__new.json')
loadData('neighborhoods', 'src/json/neighborhoods__new.json')

// Документація: https://www.mongodb.com/docs/manual/tutorial/geospatial-tutorial/
