import { ObjectId } from 'mongodb'
import { connectDB } from '../db.mjs'

export const createUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const result = await users.insertOne(req.body)
    res.status(201).send(`User created with id ${result.insertedId}`)
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const usersList = await users.find({}).toArray()
    res.status(200).json(usersList)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const result = await users.deleteOne({ _id: new ObjectId(req.params.id) })

    console.log(result)
    if (result.deletedCount === 0) {
      return res.status(404).send('User not found')
    }
    res.status(200).send(`User with id ${req.params.id} deleted successfully`)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const result = await users.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    if (result.matchedCount === 0) {
      return res.status(404).send('User not found')
    }
    res.status(200).send(`User with id ${req.params.id} updated successfully`)
  } catch (error) {
    next(error)
  }
}
