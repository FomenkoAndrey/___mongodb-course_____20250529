import { Router } from 'express'
import {
  deleteUserByIdHandler,
  getUserByIdHandler,
  getUsersHandler,
  postUsersHandler,
  putUserByIdHandler
} from '../controllers/users.mjs'
import { validateParamsUserId, validateUserPost, validateUserPut } from '../validators/userValidation.mjs'

const usersRouter = Router()

usersRouter.route('/')
  .get(getUsersHandler)
  .post(validateUserPost, postUsersHandler)  // Додаємо обробник POST запитів, спочатку валідуємо дані, потім обробляємо створення користувача

usersRouter.route('/:userId')
  .get(validateParamsUserId, getUserByIdHandler)
  .delete(validateParamsUserId, deleteUserByIdHandler)
  .put(validateParamsUserId, validateUserPut, putUserByIdHandler)  // Додаємо обробник PUT запитів, спочатку валідуємо дані, потім обробляємо оновлення користувача

export default usersRouter
