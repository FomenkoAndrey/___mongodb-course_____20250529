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

    const collections = await db.listCollections({ name: 'users' }).toArray()
    if (collections.length > 0) {
      await db.collection('users').drop()
      console.log(chalk.redBright('Collection "users" has been dropped.'))
    } else {
      console.log(chalk.yellowBright('Collection "users" does not exist. Skipping drop.'))
    }

    const users = [
      { name: 'John Doe', age: 30, skills: ['HTML', 'CSS', 'JS'] },
      { name: 'John Doe', age: 25, skills: ['Python', 'Django'] },
      { name: 'John Doe', age: 35, skills: ['Java', 'Spring'] },
      { name: 'Jack Daniels', age: 40, skills: ['C#', '.NET'] },
      { name: 'Johnny Walker', age: 45, skills: ['JavaScript', 'React'] }
    ]
    const insertManyResult = await db.collection('users').insertMany(users)
    console.log(chalk.greenBright('П\'ять документів вставлено у колекцію "users".'))
    console.log(chalk.black.bgRedBright('insertManyResult:'), insertManyResult)

    const updateManyResult = await db
      .collection('users')
      .updateMany({ name: 'John Doe' }, { $set: { name: 'Jonathan Woo', age: 41 } })
    console.log(chalk.blueBright('Документи оновлено у колекції "users".'))
    console.log(chalk.black.bgRedBright('updateManyResult:'), updateManyResult)

    const documents = await db.collection('users').find({}).toArray()
    console.log(chalk.magentaBright('Contents of the "users" collection:'), documents)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()
