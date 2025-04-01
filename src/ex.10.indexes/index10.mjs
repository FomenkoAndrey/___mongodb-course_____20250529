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

    users[0].person.first = 'John'
    users[0].person.last = 'Smith'
    users[1].person.first = 'Johns'
    users[1].person.last = 'Smith'
    users[2].person.first = 'Johns'
    users[2].person.last = 'Smiths'

    await usersCollection.insertMany(users)
    console.log(chalk.greenBright('Documents are inserted into the "users" collection.'))

    await usersCollection.createIndex({ '$**': 'text' })
    console.log(chalk.greenBright('Text index for all fields in "users" collection has been created.'))

    const indexes = await usersCollection.indexes()
    console.log(chalk.cyanBright('Indexes of the users collection:'), indexes)

    const searchResult = await usersCollection
      .find(
        { $text: { $search: 'John Smith' } },
        { projection: { person: 1, _id: 0, score: { $meta: 'textScore' } } }
      )
      .sort({ score: { $meta: 'textScore' } })
      .toArray()
    console.log(chalk.blueBright('Search results:'), searchResult)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
