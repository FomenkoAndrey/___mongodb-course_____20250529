import { MongoClient, ObjectId } from 'mongodb'
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

    const collections = await db.listCollections({ name: 'users' }).toArray()
    if (collections.length > 0) {
      await db.collection('users').drop()
      console.log(chalk.redBright('Collection "users" has been dropped.'))
    } else {
      console.log(chalk.yellowBright('Collection "users" does not exist. Skipping drop.'))
    }

    const commonId = new ObjectId()

    const result1 = await db.collection('users').insertOne({ _id: commonId, name: 'John Doe', age: 30 })
    console.log(chalk.greenBright('Перший документ вставлено у колекцію "users".'))
    console.log(chalk.bgRedBright('result1:'), result1)

    const result2 = await db.collection('users').insertOne({ _id: commonId, name: 'Jane Smith', age: 25 })
    console.log(chalk.greenBright('Другий документ вставлено у колекцію "users".'))
    console.log(chalk.bgRedBright('result2:'), result2)

    const documents = await db.collection('users').find({}).toArray()
    console.log(chalk.magentaBright('Contents of the "users" collection:'), documents)

  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()
