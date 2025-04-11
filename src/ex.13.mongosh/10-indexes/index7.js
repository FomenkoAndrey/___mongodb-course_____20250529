load('../random.js')

db.customers.drop()

db.createCollection('customers')

const users = []

for (let i = 0; i < 25; i++) {
  users.push({
    firstName: faker.firstName(),
    lastName: faker.lastName(),
    age: randomNumber(21, 70)
  })
}

db.customers.insertMany(users)

cls

db.customers.createIndex({ age: 1 })

db.customers.find({ age: { $lt: 25 } })
