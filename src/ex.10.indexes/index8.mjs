import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'
import { users } from '../helpers/fakeUsers.mjs'

dotenv.config({ quiet: true })

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI)
  const dbName = process.env.DB_NAME

  try {
    await client.connect()
    console.log('Connected to Database')

    const db = client.db(dbName)
    const usersCollection = db.collection('users')

    const collections = await db.listCollections({}, { nameOnly: true }).toArray()
    const usersCollectionExists = collections.some((col) => col.name === 'users')

    if (usersCollectionExists) {
      await usersCollection.drop()
      console.log(chalk.redBright('Collection "users" has been dropped.'))
    }

    await usersCollection.insertMany(users)
    console.log(chalk.greenBright('Documents are inserted into the "users" collection.'))

    await usersCollection.createIndex({ 'person.first': 'text', 'person.last': 'text' })
    console.log(chalk.greenBright('Text indexes for person.first and person.last have been created.'))

    const indexes = await usersCollection.indexes()
    console.log(chalk.cyanBright('Indexes of the users collection:'), indexes)

    const searchResult = await usersCollection
      .find(
        { $text: { $search: 'John' } },
        { projection: { person: 1, _id: 0 } }
      )
      .toArray()
    console.log(chalk.blueBright('Search results:'), searchResult)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
