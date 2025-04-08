load('../random.js')

db.customers.drop()

db.createCollection('customers')

const users = []

for (let i = 0; i < 10; i++) {
  const customer = {
    person: {
      firstName: faker.firstName(),
      lastName: faker.lastName()
    }
  }

  if (randomNumber(1, 100) % 2 === 0) {
    customer.scores = randomNumber(1, 100)
  }

  users.push(customer)
}

db.customers.insertMany(users)

cls

db.customers.find({}, { _id: false })

print('=============== SCORES EXISTS ==============')
db.customers.find(
  { scores: { $exists: true } },
  { _id: false }
)
print('===========================================')

print('=============== SCORES NOT EXISTS ==============')
db.customers.find(
  { scores: { $exists: false } },
  { _id: false }
)
print('===========================================')
