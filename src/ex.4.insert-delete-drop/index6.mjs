import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config()

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI)
  const dbName = process.env.DB_NAME

  try {
    await client.connect()
    console.log('Connected to Database')

    const db = client.db(dbName)

    await db.collection('users').drop()
    console.log(chalk.redBright('Collection "users" has been dropped.'))

    const usersToInsert = [
      { name: 'John Doe', age: 30 },
      { name: 'Jane Doe', age: 25 },
      { name: 'Jim Doe', age: 40 }
    ]

    const result = await db.collection('users').insertMany(usersToInsert)

    console.log(chalk.greenBright(usersToInsert.length + ' documents have been inserted into "users" collection.'))

    console.log(chalk.bgRedBright('result:'), result)

    const stats = await db.command({ collStats: 'users' })
    console.log(chalk.blueBright('Number of documents in the "users" collection:'), stats.count)

    const documents = await db.collection('users').find({}).toArray()
    console.log(chalk.magentaBright('Contents of the "users" collection:'), documents)

  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()
