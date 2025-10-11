import express from 'express'
import { MongoClient } from 'mongodb'
import { CONFIG } from '../config.mjs'

const app = express()
const PORT = 3000
const URI = CONFIG.URI

const client = new MongoClient(URI)

app.use(express.json())

async function run() {
  try {
    await client.connect()
    console.log('Connected to Database')

    const db = client.db('testDB')
    const users = db.collection('users')

    app.post('/users', async (req, res) => {
      try {
        const newUser = req.body
        console.log(newUser)
        const result = await users.insertOne(newUser)
        res.status(201).send(`User created with id ${result.insertedId}`)
      } catch (error) {
        console.error('Error during user creation:', error)
        res.status(500).send('Error creating user')
      }
    })

    app.get('/users', async (req, res) => {
      try {
        const usersList = await users.find({}).toArray()
        res.status(200).json(usersList)
      } catch (error) {
        console.error('Error retrieving users:', error)
        res.status(500).send('Error retrieving users')
      }
    })

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

run().catch(console.dir)
