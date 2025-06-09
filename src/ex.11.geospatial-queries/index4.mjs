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
    const restaurantsCollection = db.collection('restaurants')

    const point = { type: 'Point', coordinates: [-73.93414657, 40.82302903] }
    const restaurantQuery = { location: { $near: { $geometry: point, $maxDistance: 350 } } }
    const restaurants = await restaurantsCollection.find(restaurantQuery).toArray()
    console.log(chalk.black.bgRedBright('Nearby restaurants:'), restaurants)
    console.log(chalk.redBright('Number of restaurants found:'), restaurants.length)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()

//  https://www.mongodb.com/docs/manual/tutorial/geospatial-tutorial/
