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
      { name: 'Jonny Walker', age: 21, skills: ['JavaScript', 'React', 'Node.js'] },
      { name: 'John Doe', age: 55, skills: ['Java', 'Spring', 'Node.js'] },
      { name: 'Bob Daniels', age: 40 },
      { name: 'Jonny Smith', age: 27, skills: ['JavaScript', 'React', 'Node.js'] }
    ]

    await db.collection('users').insertMany(users)
    console.log(chalk.greenBright('П\'ять документів вставлено у колекцію "users".'))

    const ascendingSortedDocuments = await db
      .collection('users')
      .find({})
      .sort({ age: 1 })
      .skip(2)
      .limit(3)
      .toArray()
    console.log(
      chalk.magentaBright('3 documents sorted by age in ascending order after skipping 2:'),
      ascendingSortedDocuments
    )

  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()

/*
 ! Без skip та без limit:
 [
   { name: 'Jonny Walker', age: 21 },
   { name: 'Jane Doe', age: 25 },
   { name: 'Jonny Smith', age: 27 },
   { name: 'Bob Doe', age: 30 },
   { name: 'John Doe', age: 35 },
   { name: 'Jack Daniels', age: 40 },
   { name: 'Bob Daniels', age: 40 },
   { name: 'John Doe', age: 55 }
 ]

 ! skip:
 [
   ~ { name: 'Jonny Walker', age: 21 },
   ~ { name: 'Jane Doe', age: 25 },
   { name: 'Jonny Smith', age: 27 },
   { name: 'Bob Doe', age: 30 },
   { name: 'John Doe', age: 35 },
   { name: 'Jack Daniels', age: 40 },
   { name: 'Bob Daniels', age: 40 },
   { name: 'John Doe', age: 55 }
 ]

 ! skip + limit:
 [
   ~ { name: 'Jonny Walker', age: 21 },
   ~ { name: 'Jane Doe', age: 25 },
   * { name: 'Jonny Smith', age: 27 },
   * { name: 'Bob Doe', age: 30 },
   * { name: 'John Doe', age: 35 },
   ! { name: 'Jack Daniels', age: 40 },
   ! { name: 'Bob Daniels', age: 40 },
   ! { name: 'John Doe', age: 55 }
 ]
 */
