load('../random.js')

db.customers.drop()

db.createCollection('customers')

const customers = []

for (let i = 0; i < 10; i++) {
  customers.push({
    firstName: faker.firstName(),
    lastName: faker.lastName(),
    studying: [
      {
        class: randomNumber(1, 11),
        score: randomNumber(1, 100)
      },
      {
        class: randomNumber(1, 11),
        score: randomNumber(1, 100)
      },
      {
        class: randomNumber(1, 11),
        score: randomNumber(1, 100)
      }
    ]
  })
}

db.customers.insertMany(customers)

db.customers.find({}, { studying: true })

db.customers.find(
  { 'studying.score': { $gte: 90 } },
  { 'studying.$': 1 }
)
