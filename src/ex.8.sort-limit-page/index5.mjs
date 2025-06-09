import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'
import { users } from '../helpers/fakeUsers.mjs'

dotenv.config()

async function runPaginationExample() {
  const client = new MongoClient(process.env.MONGODB_URI)
  const dbName = process.env.DB_NAME

  try {
    await client.connect()
    console.log(chalk.greenBright('Connected to Database'))

    const db = client.db(dbName)

    const collections = await db.listCollections({}, { nameOnly: true }).toArray()
    const usersCollectionExists = collections.some((col) => col.name === 'users')

    if (usersCollectionExists) {
      await db.collection('users').drop()
      console.log(chalk.redBright('Collection "users" has been dropped.'))
    }

    await db.collection('users').insertMany(users)

    const totalDocuments = await db.collection('users').countDocuments({})
    const itemsPerPage = 10
    const pages = Math.ceil(totalDocuments / itemsPerPage)

    for (let page = 0; page < pages; page++) {
      console.log(chalk.yellow(`============================= Page: ${page + 1} =============================`))

      const documents = await db
        .collection('users')
        .find({}, { projection: { _id: 0, person: 1, age: 1 } })
        .sort({ age: 1 })
        .limit(itemsPerPage)
        .skip(page * itemsPerPage)
        .toArray()

      console.log(chalk.cyanBright('Documents:'), documents)
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

runPaginationExample()
