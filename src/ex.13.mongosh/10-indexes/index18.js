load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany([
  {
    firstName: faker.firstName(),
    lastName: faker.lastName(),
    createdAt: new Date()
  },
  {
    firstName: faker.firstName(),
    lastName: faker.lastName(),
    createdAt: new Date()
  },
  {
    firstName: faker.firstName(),
    lastName: faker.lastName(),
    createdAt: new Date()
  }
])

cls

db.customers.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 10 }
)

const indexes = db.customers.getIndexes()
print('Indexes:', indexes)
db.customers.find({}, { _id: 0, firstName: 1, lastName: 1 })

sleep(60000)

const countAfterExpiration = db.customers.countDocuments()
print('Documents count after expiration:', countAfterExpiration)
db.customers.find({})
