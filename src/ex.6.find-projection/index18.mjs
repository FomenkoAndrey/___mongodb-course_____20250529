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

    const db = client.db('testDB')

    const collections = await db.listCollections({ name: 'users' }).toArray()
    if (collections.length > 0) {
      await db.collection('users').drop()
      console.log(chalk.redBright('Collection "users" has been dropped.'))
    } else {
      console.log(chalk.yellowBright('Collection "users" does not exist. Skipping drop.'))
    }

    await db.collection('users').insertMany(users)
    console.log(chalk.greenBright(`${users.length} documents inserted into collection "users".`))

    const documents = await db
      .collection('users')
      .find({
        'person.first': /jo/i,
        'person.last': /do/i
      })
      .toArray()
    console.log(chalk.magentaBright('Contents of the "users" collection:'), documents)
    console.log(chalk.red(`Found documents: ${documents.length}`))

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
