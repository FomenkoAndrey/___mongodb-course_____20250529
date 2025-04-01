import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'
import { users } from '../helpers/fakeUsers.mjs'

dotenv.config()

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

    await usersCollection.createIndex({ 'person.first': 1 })
    await usersCollection.createIndex({ 'person.last': 1 })
    await usersCollection.createIndex({ city: 1 })
    console.log(chalk.greenBright('Indexes have been created.'))

    const indexes = await usersCollection.indexes()
    console.log(chalk.magenta('Indexes of the users collection:'), indexes)

    await usersCollection.dropIndex('person.first_1')
    await usersCollection.dropIndex('person.last_1')
    await usersCollection.dropIndex('city_1')
    console.log(chalk.bgRedBright('Indexes have been dropped.'))

    const updatedIndexes = await usersCollection.indexes()
    console.log(chalk.magentaBright('Indexes of the users collection after dropping:'), updatedIndexes)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
