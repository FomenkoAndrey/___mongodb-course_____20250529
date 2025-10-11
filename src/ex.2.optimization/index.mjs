import express from 'express'
import userRoutes from './routes/userRoutes.mjs'
import { errorHandler } from './middlewares/errorMiddleware.mjs'
import dotenv from 'dotenv'

// Треба або відкрити терміна в поточній директорії та запустити node index.mjs
// або створити файл встановити шлях до .env.local файлу відносно рута (app.mjs)
dotenv.config({ path: './.env.local' })

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/', userRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
