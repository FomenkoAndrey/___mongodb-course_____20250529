load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(10, 10, 10))

cls

db.customers.find(
  { scores: { $all: [3, 7, 5] } },
  { _id: false, firstName: true, scores: true }
)
