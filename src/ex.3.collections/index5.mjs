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
    const stats = await db.command({ collStats: 'users' })

    console.log(chalk.redBright('Statistics for the "users" collection:'), stats)
    console.log(chalk.redBright('Storage size for the "users" collection:'), stats.storageSize + ' bytes')
    console.log(chalk.blueBright('Total size for the "users" collection:'), stats.totalSize + ' bytes')
    console.log(chalk.cyanBright('Size for the "users" collection:'), stats.size + ' bytes')

  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}

run()
