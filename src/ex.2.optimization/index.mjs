import express from 'express'
import userRoutes from './routes/userRoutes.mjs'
import { errorHandler } from './middlewares/errorMiddleware.mjs'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/', userRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
