import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
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

    app.delete('/users/:id', async (req, res) => {
      try {
        const userId = req.params.id
        const result = await users.deleteOne({ _id: new ObjectId(userId) })

        if (result.deletedCount === 0) {
          return res.status(404).send('User not found')
        }

        res.status(200).send(`User with id ${userId} deleted`)
      } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).send('Error deleting user')
      }
    })

    app.put('/users/:id', async (req, res) => {
      try {
        const userId = req.params.id
        const updatedData = req.body

        if (!ObjectId.isValid(userId)) {
          return res.status(400).send('invalid user ID format')
        }

        const result = await users.updateOne({ _id: new ObjectId(userId) }, { $set: updatedData })

        console.log(result)
        console.log(result.matchedCount)

        if (result.matchedCount === 0) {
          return res.status(404).send('User not found')
        }

        res.status(200).send(`User with id ${userId} updated`)
      } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).send('Error updating user')
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
