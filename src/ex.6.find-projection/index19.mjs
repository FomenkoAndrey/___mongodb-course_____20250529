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

    const collections = await db.listCollections({ name: 'users' }).toArray()
    if (collections.length > 0) {
      await db.collection('users').drop()
      console.log(chalk.redBright('Collection "users" has been dropped.'))
    } else {
      console.log(chalk.yellowBright('Collection "users" does not exist. Skipping drop.'))
    }

    const users = [
      { name: 'John Doe', age: 30, skills: ['HTML', 'React', 'CSS', 'JS', 'Node.js'] },
      { name: 'john doe', age: 25, skills: ['Python', 'Node.js', 'React', 'Django'] },
      { name: 'Jane Doe', age: 35 },
      { name: 'Jack Daniels', age: 42 },
      { name: 'Bob Walker', age: 21, skills: ['JavaScript', 'React', 'Node.js'] }
    ]

    await db.collection('users').insertMany(users)
    console.log(chalk.greenBright('П\'ять документів вставлено у колекцію "users".'))

    const documents = await db
      .collection('users')
      .find({
        skills: { $exists: true }
      })
      .toArray()
    console.log(chalk.magentaBright('skills: { $exists: true }'), documents)

    const documents2 = await db
      .collection('users')
      .find({
        skills: { $exists: false }
      })
      .toArray()
    console.log(chalk.magentaBright('skills: { $exists: false }'), documents2)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
