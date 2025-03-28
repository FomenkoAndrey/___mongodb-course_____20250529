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

    const insertResult = await db.collection('users').insertOne({
      name: 'John Doe',
      age: 30,
      skills: ['HTML', 'CSS', 'JS']
    })
    console.log(chalk.greenBright('Документ вставлено у колекцію "users".'))
    console.log(chalk.bgRedBright('insertResult:'), insertResult)

    const replaceResult = await db
      .collection('users')
      .replaceOne(
        { _id: insertResult.insertedId },
        { name: 'Bob Woo', age: 41 }
      )

    console.log(chalk.blueBright('Документ замінено у колекції "users".'))
    console.log(chalk.bgRedBright('replaceResult:'), replaceResult)

    const documents = await db.collection('users').find({}).toArray()
    console.log(chalk.magentaBright('Contents of the "users" collection:'), documents)

  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()
