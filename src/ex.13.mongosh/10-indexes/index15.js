load('../random.js')

db.customers.drop()

db.createCollection('customers')

const users = [
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { firstName: 'Jane', lastName: 'Doe', email: 'john.doe@example.com' },
  { firstName: 'Jim', lastName: 'Beam', email: 'jim.beam@example.com' }
]

cls

db.customers.createIndex(
  { email: 1 },
  { unique: true }
)

db.customers.insertMany(users)
