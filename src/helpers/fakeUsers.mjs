import { faker } from '@faker-js/faker'
import { getRandomSkills } from './skillsData.mjs'

export const users = Array.from({ length: 100 }, () => {
  const shouldHaveOrders = Math.random() < 0.33

  const user = {
    person: {
      first: faker.person.firstName(),
      last: faker.person.lastName()
    },
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 60 }),
    skills: getRandomSkills(),
    city: faker.location.city(),
    orders: {}
  }

  if (shouldHaveOrders) {
    user.orders = {
      product: faker.commerce.product(),
      count: faker.number.int({ min: 1, max: 10 })
    }
  }

  return user
})
