load('../random.js')

db.customers.drop()

db.createCollection('customers')

const users = []

for (let i = 0; i < 10; i++) {
  users.push({
    firstName: faker.firstName(),
    lastName: faker.lastName(),
    scores: randomArray(randomNumber(1, 5), 1, 10)
  })
}

db.customers.insertMany(users)

cls

db.customers.createIndex({ scores: 1 })

db.customers.find({ scores: { $lt: 3 } })
