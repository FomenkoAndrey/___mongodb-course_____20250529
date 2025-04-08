load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(5, 10, 4))

cls

db.customers.find(
  {},
  { _id: false, scores: true }
)

db.customers.find(
  { scores: { $gte: 7 } },
  { 'scores.$': true }
)
