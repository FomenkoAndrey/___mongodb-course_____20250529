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
      { name: 'Bob Doe', age: 30, skills: ['HTML', 'CSS', 'JavaScript', 'Node.js'] },
      { name: 'Mary Doe', age: 30, skills: ['HTML', 'CSS', 'JavaScript', 'Node.js'] },
      { name: 'Jane Doe', age: 25, skills: ['Python', 'Node.js', 'Django'] },
      { name: 'John Doe', age: 35, skills: ['Java', 'Spring'] },
      { name: 'Jack Daniels', age: 40, skills: ['JavaScript', 'HTML'] },
      { name: 'Jonny Walker', age: 21, skills: ['JavaScript', 'React', 'Node.js'] },
      { name: 'Jim Walker', age: 23, skills: ['JavaScript', 'React', 'Node.js'] },
      { name: 'Bob Walker', age: 25, skills: ['JavaScript', 'React', 'Node.js'] },
      { name: 'Di Walker', age: 25, skills: ['JavaScript', 'React', 'Node.js'] },
      { name: 'Ji Walker', age: 25, skills: ['JavaScript', 'React', 'Node.js'] }
    ]

    await db.collection('users').insertMany(users)
    console.log(chalk.greenBright('Документи вставлено у колекцію "users".'))

    const skillFilteredUserAggregation = await db
      .collection('users')
      .aggregate([
        {
          $match: {
            skills: { $in: ['Node.js', 'React'] }
          }
        },
        {
          $group: {
            _id: '$skills',
            total_users: { $sum: 1 }
          }
        }
      ])
      .toArray()

    console.log(chalk.cyanBright('User count by skills:'), skillFilteredUserAggregation)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
