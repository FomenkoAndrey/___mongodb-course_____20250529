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

    console.log(chalk.greenBright('Creating index on "age"...'))
    await usersCollection.createIndex({ age: 1 })

    const indexes = await usersCollection.indexes()
    console.log(chalk.magenta('Indexes of the users collection:'), indexes)

    console.log(chalk.greenBright('Running a query with explain...'))

    const explainResult = await usersCollection
      .find({ age: { $lt: 25 } })
      .sort({ age: -1 })
      .explain('executionStats')

    // console.log(chalk.magenta('Explain results:'), explainResult)
    console.log(chalk.magenta('Explain results -> executionStats:'), explainResult.executionStats)
    console.log(
      chalk.magenta('Explain results -> totalKeysExamined:'),
      explainResult.executionStats['totalKeysExamined']
    )
    console.log(
      chalk.magenta('Explain results -> totalDocsExamined:'),
      explainResult.executionStats['totalDocsExamined']
    )

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
