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

    const result1 = await db.collection('users').insertOne({ name: 'John Doe', age: 30 })
    console.log(chalk.greenBright('Перший документ вставлено у колекцію "users".'))
    console.log(chalk.bgRedBright('result1:'), result1)

    const result2 = await db.collection('users').insertOne({ name: 'Jane Smith', age: 25 })
    console.log(chalk.greenBright('Другий документ вставлено у колекцію "users".'))
    console.log(chalk.bgRedBright('result2:'), result2)

    const result3 = await db.collection('users').insertOne({ name: 'Alice Johnson', age: 28 })
    console.log(chalk.greenBright('Третій документ вставлено у колекцію "users".'))
    console.log(chalk.bgRedBright('result3:'), result3)

    const documents = await db.collection('users').find({}).toArray()
    console.log(chalk.magentaBright('Contents of the "users" collection:'), documents)

  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()
