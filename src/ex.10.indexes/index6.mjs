import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'
import { users } from '../helpers/fakeUsers.mjs'

dotenv.config()

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

    await usersCollection.insertMany(users)
    console.log(chalk.greenBright('Documents are inserted into the "users" collection.'))

    await usersCollection.createIndex({ 'orders.count': 1 })
    console.log(chalk.greenBright('Index for orders.count has been created.'))

    const indexes = await usersCollection.indexes()
    console.log(chalk.cyanBright('Indexes of the users collection:'), indexes)

    const countQuery = { 'orders.count': { $gt: 5 } }
    const usersWithOrders = await usersCollection.find(countQuery).toArray()
    console.log(
      chalk.blueBright('Users with more than 8 orders:'),
      usersWithOrders.slice(0, 5),
      `\n... and ${usersWithOrders.length - 5} other users`
    )

    const stats = await db.command({ collStats: 'users' })

    const indexSize = stats.indexSizes['orders.count_1']

    console.log(chalk.bgRedBright('Size of the "orders.count" index in bytes:'), indexSize)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
