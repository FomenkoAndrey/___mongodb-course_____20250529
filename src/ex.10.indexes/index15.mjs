import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'

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

    await usersCollection.createIndex({ 'person.first': 1 }, { background: true })
    await usersCollection.createIndex({ 'person.last': 1 }, { background: true })
    await usersCollection.createIndex({ city: 1 }, { background: true })
    // ! unique index on email
    await usersCollection.createIndex({ email: 1 }, { unique: true })
    console.log(chalk.greenBright('Indexes have been created.'))

    const indexes = await usersCollection.indexes()
    console.log(chalk.magenta('Indexes of the users collection:'), indexes)

    const user1 = {
      person: { first: 'John', last: 'Doe' },
      email: 'test@email.com'
    }

    const user2 = {
      person: { first: 'Jane', last: 'Doe' },
      email: 'test@email.com'
    }

    try {
      await usersCollection.insertOne(user1)
      console.log(chalk.greenBright('User 1 inserted'))
    } catch (e) {
      console.log(chalk.black.bgRedBright('Error inserting User 1:'), e.message)
    }

    try {
      await usersCollection.insertOne(user2)
      console.log(chalk.black.bgGreenBright('User 2 inserted'))
    } catch (e) {
      console.log(chalk.black.bgRedBright('Error inserting User 2:'), e.message)
    }

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
