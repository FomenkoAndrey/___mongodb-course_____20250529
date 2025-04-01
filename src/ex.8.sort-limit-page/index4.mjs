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

    const collections = await db.listCollections({}, { nameOnly: true }).toArray()
    const usersCollectionExists = collections.some((col) => col.name === 'users')

    if (usersCollectionExists) {
      await db.collection('users').drop()
      console.log(chalk.redBright('Collection "users" has been dropped.'))
    }

    const users = [
      { name: 'Bob Doe', age: 30, skills: ['HTML', 'CSS', 'JS', 'Node.js'] },
      { name: 'Jane Doe', age: 25, skills: ['Python', 'Node.js', 'Django'] },
      { name: 'John Doe', age: 35, skills: ['Java', 'Spring', 'Node.js'] },
      { name: 'Jack Daniels', age: 40 },
      { name: 'Jonny Walker', age: 21, skills: ['JavaScript', 'React', 'Node.js'] }
    ]

    await db.collection('users').insertMany(users)
    console.log(chalk.greenBright('П\'ять документів вставлено у колекцію "users".'))

    const descendingSortedDocuments = await db.collection('users')
      .find({})
      .sort({ age: -1 })
      .limit(3)
      .skip(2)
      .toArray()
    console.log(chalk.magentaBright('...limit(3).skip(2)'), descendingSortedDocuments)

    const descendingSortedDocuments2 = await db
      .collection('users')
      .find({})
      .sort({ age: -1 })
      .skip(2)
      .limit(3)
      .toArray()
    console.log(chalk.magentaBright('...skip(2).limit(3)'), descendingSortedDocuments2)

  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()
