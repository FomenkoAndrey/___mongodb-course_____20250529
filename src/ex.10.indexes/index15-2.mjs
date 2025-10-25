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
    const usersCollection = db.collection('users')

    const collections = await db.listCollections({}, { nameOnly: true }).toArray()
    const usersCollectionExists = collections.some((col) => col.name === 'users')

    if (usersCollectionExists) {
      await usersCollection.drop()
      console.log(chalk.redBright('Collection "users" has been dropped.'))
    }

    // ! Створюємо користувачів з однаковими email, робимо це до створення унікального індексу
    const user1 = {
      person: { first: 'John', last: 'Doe' },
      email: 'test@email.com'
    }

    const user2 = {
      person: { first: 'Jane', last: 'Doe' },
      email: 'test@email.com'
    }

    await usersCollection.insertOne(user1)
    console.log(chalk.greenBright('User 1 inserted'))

    await usersCollection.insertOne(user2)
    console.log(chalk.black.bgGreenBright('User 2 inserted'))

    await usersCollection.createIndex({ 'person.first': 1 }, { background: true })
    await usersCollection.createIndex({ 'person.last': 1 }, { background: true })
    await usersCollection.createIndex({ city: 1 }, { background: true })

    // ! Тепер створюємо унікальний індекс на email, але документи вже вставлені, тому буде помилка
    try {
      await usersCollection.createIndex({ email: 1 }, { unique: true })
      console.log(chalk.greenBright('Indexes have been created.'))
    } catch (e) {
      console.log(chalk.black.bgRedBright('Error creating unique index on email:'), e.message)
    }

    const indexes = await usersCollection.indexes()
    console.log(chalk.magenta('Indexes of the users collection:'), indexes)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
