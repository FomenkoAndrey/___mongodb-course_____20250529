import rootHandler from './root.mjs'
import usersRouter from './users.mjs'
import articlesRouter from './articles.mjs'
import { Router } from 'express'

const router = Router()

router.use('/', rootHandler)
router.use('/users', usersRouter)
router.use('/articles', articlesRouter)

export default router
