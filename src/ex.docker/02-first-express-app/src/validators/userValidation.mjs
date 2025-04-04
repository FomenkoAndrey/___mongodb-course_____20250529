import { celebrate, Joi, Segments } from 'celebrate'

const userSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(100)
})

const validateUserPost = celebrate({
  [Segments.BODY]: userSchema  // Валідація тіла запиту для POST
})

const validateUserPut = celebrate({
  [Segments.BODY]: userSchema  // Валідація тіла запиту для PUT
})

const validateParamsUserId = celebrate({
  [Segments.PARAMS]: {
    userId: Joi.number().integer().positive().required()
  }
})

export {
  validateUserPost,
  validateUserPut,
  validateParamsUserId
}
