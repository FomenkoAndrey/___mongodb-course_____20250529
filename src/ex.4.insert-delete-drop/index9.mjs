import { MongoClient, ObjectId } from 'mongodb'
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

    const usersToInsert = [
      { name: 'John Doe', age: 30 },
      { name: 'Jane Smith', age: 25 },
      { name: 'Alice Johnson', age: 28 },
      { name: 'Bob Williams', age: 35 },
      { name: 'Charlie Brown', age: 22 }
    ]

    const numberNames = ['Перший', 'Другий', 'Третій', 'Четвертий', "П'ятий"]

    // Створюємо ОДИН спільний _id для всіх документів (демонстрація проблеми!)
    const commonId = new ObjectId()
    console.log(chalk.yellowBright('\n⚠️  Увага: Використовується ОДИН _id для всіх документів!\n'))

    for await (const [index, user] of usersToInsert.entries()) {
      const result = await db.collection('users').insertOne({
        _id: commonId,
        ...user
      })
      console.log(chalk.greenBright(`${numberNames[index]} документ вставлено у колекцію "users".`))
      console.log(chalk.black.bgRedBright(`result${index + 1}:`), result)
    }

    const documents = await db.collection('users').find({}).toArray()
    console.log(chalk.magentaBright('\nContents of the "users" collection:'), documents)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()
