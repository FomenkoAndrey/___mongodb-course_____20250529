import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'
import { logs } from '../helpers/fakeLogs.mjs'

dotenv.config()

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI)
  const dbName = process.env.DB_NAME

  try {
    await client.connect()
    console.log('Connected to Database')

    const db = client.db(dbName)
    const logsCollection = db.collection('logs')

    const collections = await db.listCollections({}, { nameOnly: true }).toArray()
    const logsCollectionExists = collections.some((col) => col.name === 'logs')

    if (logsCollectionExists) {
      await logsCollection.drop()
      console.log(chalk.redBright('Collection "logs" has been dropped.'))
    }

    await logsCollection.insertMany(logs)
    console.log(chalk.greenBright('Documents are inserted into the "logs" collection.'))

    await logsCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 }
    )
    console.log(chalk.greenBright('Expiring index has been created.'))

    const indexes = await logsCollection.indexes()
    console.log(chalk.magenta('Indexes of the logs collection:'), indexes)

    const checkStatsAndClose = async () => {
      const stats = await db.command({ collStats: 'logs' })
      console.log(chalk.redBright(`Size of the collection: ${stats.size} bytes`))
      console.log(chalk.bgRedBright(`Number of documents in the collection: ${stats.count}`))
      console.log('Wait +10 seconds...')

      if (stats.size === 0 && stats.count === 0) {
        console.log(chalk.greenBright('Collection is empty. Closing the connection.'))
        await client.close()
      } else {
        setTimeout(checkStatsAndClose, 10000)
      }
    }

    await checkStatsAndClose()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()
