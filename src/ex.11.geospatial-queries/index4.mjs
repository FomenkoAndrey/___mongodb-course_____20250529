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
    const neighborhoodsCollection = db.collection('neighborhoods')
    const restaurantsCollection = db.collection('restaurants')

    const point = { type: 'Point', coordinates: [-73.93414657, 40.82302903] }
    const neighborhoodQuery = { geometry: { $geoIntersects: { $geometry: point } } }
    const neighborhoodResult = await neighborhoodsCollection.findOne(neighborhoodQuery)
    console.log(chalk.greenBright('Found neighborhood:'), neighborhoodResult)

    const restaurantQuery = { location: { $near: { $geometry: point, $maxDistance: 500 } } }
    const restaurants = await restaurantsCollection.find(restaurantQuery).toArray()
    console.log(chalk.bgRedBright('Nearby restaurants:'), restaurants)
    console.log(chalk.redBright('Number of restaurants found:'), restaurants.length)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()

//  https://www.mongodb.com/docs/manual/tutorial/geospatial-tutorial/
