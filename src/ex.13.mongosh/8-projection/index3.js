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

db.customers.find({})

db.customers.find(
  { 'studying.class': 10 },
  {
    firstName: 1,
    studying: { $elemMatch: { class: 10 } }
  }
)
