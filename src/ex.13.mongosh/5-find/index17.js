load('../random.js')

db.customers.drop()

db.createCollection('customers')

const users = []

for (let i = 0; i < 100; i++) {
  users.push({
    person: {
      firstName: {
        en: faker.firstName()
      },
      lastName: faker.lastName()
    },
    scores: randomNumber(1, 100)
  })
}

db.customers.insertMany(users)

cls

db.customers.find({ 'person.firstName.en': /^jo/i })
