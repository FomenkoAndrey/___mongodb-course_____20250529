import express from 'express'
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userControllers.mjs'

const router = express.Router()

router.post('/users', createUser)
router.get('/users', getUsers)
router.delete('/users/:id', deleteUser)
router.put('/users/:id', updateUser)

export default router
